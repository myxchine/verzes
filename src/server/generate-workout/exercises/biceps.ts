
export const bicepExercises: Exercise[] = [
  {
    id: "bicep-curl",
    name: "Bicep Curl",
    description:
      "A basic dumbbell exercise where you curl the weight up towards your shoulders, targeting the biceps.",
    muscleGroups: ["biceps"],
    difficulty: "beginner",
    equipment: ["dumbbells"],
    can_train_at_home: true,
    bodyweight: false,
    compound: false,
    unilateral: true,
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    description:
      "A variation of the bicep curl where the palms face each other, targeting both the biceps and brachialis.",
    muscleGroups: ["biceps", "brachialis"],
    difficulty: "beginner",
    equipment: ["dumbbells"],
    can_train_at_home: true,
    bodyweight: false,
    compound: false,
    unilateral: true,
  },
  {
    id: "concentration-curl",
    name: "Concentration Curl",
    description:
      "A seated dumbbell curl focusing on isolating the biceps by keeping the upper arm stationary.",
    muscleGroups: ["biceps"],
    difficulty: "beginner",
    equipment: ["dumbbell"],
    can_train_at_home: true,
    bodyweight: false,
    compound: false,
    unilateral: true,
  },
  {
    id: "ez-bar-curl",
    name: "EZ Bar Curl",
    description:
      "A curl performed with an EZ curl bar, reducing wrist strain while targeting the biceps.",
    muscleGroups: ["biceps"],
    difficulty: "beginner",
    equipment: ["EZ curl bar"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: false,
  },
  {
    id: "cable-bicep-curl",
    name: "Cable Bicep Curl",
    description:
      "A controlled bicep curl using a cable machine to maintain constant tension on the muscles.",
    muscleGroups: ["biceps"],
    difficulty: "beginner",
    equipment: ["cable machine"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: false,
  },
  {
    id: "incline-dumbbell-curl",
    name: "Incline Dumbbell Curl",
    description:
      "A dumbbell curl performed while lying on an incline bench, increasing the range of motion for the biceps.",
    muscleGroups: ["biceps"],
    difficulty: "intermediate",
    equipment: ["dumbbells", "incline bench"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: true,
  },
  {
    id: "preacher-curl",
    name: "Preacher Curl",
    description:
      "A bicep curl performed with the arms resting on a preacher bench to eliminate momentum and isolate the biceps.",
    muscleGroups: ["biceps"],
    difficulty: "beginner",
    equipment: ["EZ curl bar", "preacher bench"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: false,
  },
  {
    id: "arnold-curl",
    name: "Arnold Curl",
    description:
      "A combination curl where you lift the dumbbells with a standard grip and lower them with a reverse grip, targeting both biceps and forearms.",
    muscleGroups: ["biceps", "forearms"],
    difficulty: "intermediate",
    equipment: ["dumbbells"],
    can_train_at_home: true,
    bodyweight: false,
    compound: false,
    unilateral: true,
  },
];
