export const calfExercises: Exercise[] = [
  {
    id: "calf-raise",
    name: "Calf Raise",
    description:
      "An isolation movement where you raise your heels off the ground to target the calf muscles.",
    muscleGroups: ["calves"],
    difficulty: "beginner",
    equipment: ["bodyweight", "dumbbells", "machine"],
    can_train_at_home: true,
    bodyweight: true,
    compound: false,
    unilateral: false,
    image: "calves.jpg",
  },
  {
    id: "step-up",
    name: "Step-Up",
    description:
      "A unilateral movement where you step onto an elevated surface to engage the legs and glutes.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "beginner",
    equipment: ["dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: true,
    image: "calves.jpg",
  },
];
