export const hamstringExercises: Exercise[] = [
  {
    id: "squat",
    name: "Squat",
    description:
      "A compound movement where you lower your hips from a standing position and then return to standing.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes", "calves"],
    difficulty: "beginner",
    equipment: ["barbell", "dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },

  {
    id: "deadlift",
    name: "Deadlift",
    description:
      "A compound lift where you pick a barbell off the ground to a standing position, engaging multiple muscle groups.",
    muscleGroups: ["hamstrings", "glutes", "lower back", "quadriceps"],
    difficulty: "intermediate",
    equipment: ["barbell", "dumbbells"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },

  {
    id: "hamstring-curl",
    name: "Hamstring Curl",
    description:
      "A machine-based movement where you curl your legs towards your body to target the hamstrings.",
    muscleGroups: ["hamstrings"],
    difficulty: "beginner",
    equipment: ["leg curl machine"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: false,
    image : "hamstrings.jpg",
  },

  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    description:
      "A challenging unilateral exercise where you squat with one foot elevated behind you.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "intermediate",
    equipment: ["dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: true,
  },
];
