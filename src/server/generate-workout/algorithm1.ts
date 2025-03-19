import { exercises, workouts } from "./exercises";

// Helper function to get exercises from a muscle group
export function getExercisesFromMuscleGroup(
  muscleGroup: MuscleGroup
): Exercise[] {
  const allExercises: Exercise[] = [];

  if (muscleGroup?.exercises && Array.isArray(muscleGroup.exercises)) {
    const exercisesWithImportanceWeighting = muscleGroup.exercises.map(
      (exercise) => {
        return {
          ...exercise,
          importance: muscleGroup.importance * (exercise.importance || 1),
        };
      }
    );
    allExercises.push(...exercisesWithImportanceWeighting);
  }

  for (const key in muscleGroup) {
    if (
      key !== "importance" &&
      key !== "exercises" &&
      typeof muscleGroup[key] === "object"
    ) {
      const nestedGroup = muscleGroup[key] as MuscleGroup; // Type assertion

      if (nestedGroup) {
        if (nestedGroup.exercises && Array.isArray(nestedGroup.exercises)) {
          const exercisesWithImportanceWeighting = nestedGroup.exercises.map(
            (exercise) => {
              return {
                ...exercise,
                importance:
                  nestedGroup.importance *
                  muscleGroup.importance *
                  (exercise.importance || 1),
              };
            }
          );
          allExercises.push(...exercisesWithImportanceWeighting);
        }

        for (const nestedKey in nestedGroup) {
          if (
            nestedKey !== "importance" &&
            nestedKey !== "exercises" &&
            typeof nestedGroup[nestedKey] === "object"
          ) {
            const deepNestedGroup = nestedGroup[nestedKey] as MuscleGroup; // Type assertion

            if (
              deepNestedGroup?.exercises &&
              Array.isArray(deepNestedGroup.exercises)
            ) {
              const exercisesWithImportanceWeighting =
                deepNestedGroup.exercises.map((exercise) => {
                  return {
                    ...exercise,
                    importance:
                      deepNestedGroup.importance *
                      nestedGroup.importance *
                      muscleGroup.importance *
                      (exercise.importance || 1),
                  };
                });
              allExercises.push(...exercisesWithImportanceWeighting);
            }
          }
        }
      }
    }
  }

  return allExercises;
}

// Check if an exercise meets user criteria
export function meetsUserCriteria(
  exercise: Exercise,
  userPreferences: UserPreferences
): boolean {
  if (!exercise.can_train_at_home && userPreferences.place === "home") {
    return false;
  }
  return true;
}

// Generate a workout based on user preferences
export function generateWorkout(
  userPreferences: UserPreferences
): GeneratedWorkout {
  const workoutLength = workouts[userPreferences.workoutLength];

  const allMatchingExercises: Exercise[] = [];

  for (const focusArea of userPreferences.focusAreas) {
    const foundExercises = findExercisesByFocusArea(focusArea, exercises);
    allMatchingExercises.push(...foundExercises);
  }

  const availableExercises: Exercise[] = allMatchingExercises.filter(
    (exercise) => meetsUserCriteria(exercise, userPreferences)
  );

  if (availableExercises.length === 0) {
    return { main: [] }; // Return empty workout if no valid exercises found
  }

  const targetExerciseCount: number = workoutLength.mainWorkout.totalexercises;

  // Compute total importance weight
  const totalWeight: number = availableExercises.reduce(
    (sum, exercise) => sum + (exercise.importance || 1),
    0
  );

  if (totalWeight <= 0) {
    throw new Error("All exercises have zero or negative importance weights.");
  }

  const selectedExercises: Set<Exercise> = new Set();

  while (
    selectedExercises.size < targetExerciseCount &&
    availableExercises.length > 0
  ) {
    let randomValue: number = Math.random() * totalWeight;
    let cumulativeWeight: number = 0;

    for (const exercise of availableExercises) {
      cumulativeWeight += exercise.importance || 1;
      if (randomValue < cumulativeWeight) {
        selectedExercises.add(exercise);
        break;
      }
    }
  }

  return { main: Array.from(selectedExercises) };
}

export function findExercisesByFocusArea(
  focusArea: string,
  exercisesDatabase: ExercisesDatabase
): Exercise[] {
  let foundExercises: Exercise[] = [];

  for (const categoryKey in exercisesDatabase) {
    if (categoryKey === focusArea) {
      const muscleGroupData = exercisesDatabase[categoryKey];
      if (muscleGroupData) {
        foundExercises.push(...getExercisesFromMuscleGroup(muscleGroupData));
      }
    } else if (typeof exercisesDatabase[categoryKey] === "object") {
      const category = exercisesDatabase[categoryKey] as MuscleGroup; // Type assertion
      for (const subCategoryKey in category) {
        if (subCategoryKey === focusArea) {
          const subCategory = category[subCategoryKey] as MuscleGroup; // Type assertion
          if (subCategory) {
            foundExercises.push(...getExercisesFromMuscleGroup(subCategory));
          }
        } else if (typeof category[subCategoryKey] === "object") {
          const subCategory = category[subCategoryKey] as MuscleGroup; // Type assertion
          if (subCategory) {
            foundExercises.push(
              ...findExercisesByFocusArea(focusArea, {
                [subCategoryKey]: subCategory,
              })
            );
          }
        }
      }
    }
  }

  return foundExercises;
}
