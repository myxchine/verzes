import { exercises, workouts } from "./exercises";

export function meetsUserCriteria(
  exercise: Exercise,
  userPreferences: UserPreferences
): boolean {
  if (!exercise.can_train_at_home && userPreferences.place === "home") {
    return false;
  }
  return true;
}

export function generateWorkout(
  userPreferences: UserPreferences
): GeneratedWorkout {
  const workoutLength = workouts[userPreferences.workoutLength];
  const targetExerciseCount: number = workoutLength.mainWorkout.totalexercises;

  // Get exercises for each focus area with their importance
  const focusAreaExercises: FocusAreaExercises[] =
    userPreferences.focusAreas.map((focusArea) =>
      findExercisesByFocusArea(focusArea, exercises)
    );

  // Filter exercises in each focus area based on user criteria
  const filteredFocusAreaExercises = focusAreaExercises.map((area) => ({
    ...area,
    exercises: area.exercises.filter((exercise) =>
      meetsUserCriteria(exercise, userPreferences)
    ),
  }));

  // Remove any focus areas with no valid exercises
  const validFocusAreas = filteredFocusAreaExercises.filter(
    (area) => area.exercises.length > 0
  );

  if (validFocusAreas.length === 0) {
    return { main: [] }; // Return empty workout if no valid exercises found
  }

  // Calculate total importance across all focus areas
  const totalImportance = validFocusAreas.reduce(
    (sum, area) => sum + area.importance,
    0
  );

  // Calculate how many exercises to allocate to each focus area based on importance
  const exerciseAllocations = validFocusAreas.map((area) => {
    const relativeImportance = area.importance / totalImportance;
    // Calculate number of exercises (minimum 1 if possible)
    let count = Math.round(targetExerciseCount * relativeImportance);
    return {
      ...area,
      allocatedCount: Math.max(1, count),
    };
  });

  // Adjust allocations to match target total (might need to add or remove some)
  let totalAllocated = exerciseAllocations.reduce(
    (sum, area) => sum + area.allocatedCount,
    0
  );

  // Adjust if we've allocated too many or too few exercises
  while (totalAllocated !== targetExerciseCount) {
    if (totalAllocated > targetExerciseCount) {
      // Remove from area with most allocation and highest number of exercises
      const sortedByAllocation = [...exerciseAllocations].sort(
        (a, b) =>
          b.allocatedCount - a.allocatedCount ||
          b.exercises.length - a.exercises.length
      );

      if (sortedByAllocation[0].allocatedCount > 1) {
        sortedByAllocation[0].allocatedCount--;
        totalAllocated--;
      } else {
        break; // Can't reduce further
      }
    } else {
      // Add to area with least allocation and most exercises
      const sortedByAllocation = [...exerciseAllocations].sort(
        (a, b) =>
          a.allocatedCount - b.allocatedCount ||
          b.exercises.length - a.exercises.length
      );

      sortedByAllocation[0].allocatedCount++;
      totalAllocated++;
    }
  }

  // Select exercises from each focus area, using weighted selection based on exercise importance
  const selectedExercises: Exercise[] = [];

  exerciseAllocations.forEach((area) => {
    // Create a weighted selection based on exercise importance
    const exercises = selectWeightedExercises(
      area.exercises,
      area.allocatedCount
    );

    selectedExercises.push(...exercises);
  });

  return { main: selectedExercises };
}

function selectWeightedExercises(
  exercises: Exercise[],
  count: number
): Exercise[] {
  // Calculate total weight
  const totalWeight = exercises.reduce(
    (sum, exercise) => sum + (exercise.importance || 1),
    0
  );

  const selected: Set<Exercise> = new Set();
  const availableExercises = [...exercises];

  // Continue selecting until we have enough or run out of options
  while (selected.size < count && availableExercises.length > 0) {
    // Generate random value based on total weight
    const randomValue = Math.random() * totalWeight;

    // Find the exercise that corresponds to this random value
    let cumulativeWeight = 0;
    let selectedIndex = -1;

    for (let i = 0; i < availableExercises.length; i++) {
      cumulativeWeight += availableExercises[i].importance || 1;
      if (randomValue <= cumulativeWeight) {
        selectedIndex = i;
        break;
      }
    }

    if (selectedIndex !== -1) {
      // Add the selected exercise to our set
      selected.add(availableExercises[selectedIndex]);
      // Remove it from available exercises to avoid duplicates
      availableExercises.splice(selectedIndex, 1);
    }
  }

  return Array.from(selected);
}

export function findExercisesByFocusArea(
  focusArea: string,
  exercisesDatabase: ExercisesDatabase
): FocusAreaExercises {
  let foundExercises: FocusAreaExercises = {
    focusArea: focusArea,
    exercises: [],
    importance: 0,
  };

  // Helper function to search for a specific focus area with its parent importance
  function findSpecificFocusArea(
    db: any,
    key: string,
    parentImportance: number = 1
  ): { exercises: Exercise[]; importance: number } | null {
    // If this is our target focus area
    if (key === focusArea) {
      // If it has direct exercises, return them with the importance
      if (db.exercises && Array.isArray(db.exercises)) {
        return {
          exercises: db.exercises,
          importance: db.importance * parentImportance,
        };
      }

      // If it doesn't have direct exercises but is a category
      // We need to collect exercises from all its subcategories
      if (typeof db === "object" && db !== null) {
        const result = {
          exercises: [] as Exercise[],
          importance: db.importance * parentImportance,
        };

        // Process all subcategories
        for (const subKey in db) {
          if (subKey === "exercises" || subKey === "importance") continue;

          if (typeof db[subKey] === "object" && db[subKey] !== null) {
            const subCategory = db[subKey];
            const subImportance = db.importance * parentImportance;

            if (subCategory.exercises && Array.isArray(subCategory.exercises)) {
              // Apply subCategory's relative importance to its exercises
              result.exercises.push(
                ...subCategory.exercises.map((exercise: Exercise) => ({
                  ...exercise,
                  importance:
                    (exercise.importance || 1) * subCategory.importance,
                }))
              );
            }

            // Recursively collect from deeper subcategories
            const deeperExercises = collectExercisesFromCategory(
              subCategory,
              subImportance * subCategory.importance
            );

            result.exercises.push(...deeperExercises);
          }
        }

        return result;
      }
    }

    // Recursively search in subcategories if this isn't our target
    if (typeof db === "object" && db !== null) {
      for (const subKey in db) {
        if (subKey === "exercises" || subKey === "importance") continue;

        if (typeof db[subKey] === "object" && db[subKey] !== null) {
          const newImportance =
            db.importance !== undefined
              ? parentImportance * db.importance
              : parentImportance;

          const result = findSpecificFocusArea(
            db[subKey],
            subKey,
            newImportance
          );
          if (result) return result;
        }
      }
    }

    return null;
  }

  // Helper function to collect all exercises from a category and its subcategories
  function collectExercisesFromCategory(
    category: any,
    parentImportance: number = 1
  ): Exercise[] {
    const exercises: Exercise[] = [];

    // If this category has direct exercises, add them
    if (category.exercises && Array.isArray(category.exercises)) {
      exercises.push(
        ...category.exercises.map((exercise: Exercise) => ({
          ...exercise,
          importance: (exercise.importance || 1) * parentImportance,
        }))
      );
    }

    // Process subcategories
    for (const key in category) {
      if (key === "exercises" || key === "importance") continue;

      if (typeof category[key] === "object" && category[key] !== null) {
        const subCategory = category[key];
        const subImportance =
          subCategory.importance !== undefined
            ? parentImportance * subCategory.importance
            : parentImportance;

        if (subCategory.exercises && Array.isArray(subCategory.exercises)) {
          exercises.push(
            ...subCategory.exercises.map((exercise: Exercise) => ({
              ...exercise,
              importance: (exercise.importance || 1) * subImportance,
            }))
          );
        }

        // Recursively collect from deeper subcategories
        const deeperExercises = collectExercisesFromCategory(
          subCategory,
          subImportance
        );
        exercises.push(...deeperExercises);
      }
    }

    return exercises;
  }

  // Start by searching for the exact focus area
  for (const key in exercisesDatabase) {
    const db = exercisesDatabase[key];

    // First check if the top-level key is our focus area
    if (key === focusArea) {
      if (db.exercises && Array.isArray(db.exercises)) {
        foundExercises.exercises = db.exercises;
        foundExercises.importance = db.importance;
      } else {
        // If it's a category without direct exercises, collect from subcategories
        foundExercises.exercises = collectExercisesFromCategory(
          db,
          db.importance
        );
        foundExercises.importance = db.importance;
      }
      return foundExercises;
    }

    // Then search recursively in this branch
    const result = findSpecificFocusArea(db, key);
    if (result) {
      foundExercises.exercises = result.exercises;
      foundExercises.importance = result.importance;
      return foundExercises;
    }
  }

  return foundExercises;
}
