import { exercises } from "../exercises";

export function getMuscleGroup(exerciseId: string): string | null {
  for (const muscleGroupKey in exercises) {
    const muscleGroup = exercises[muscleGroupKey];
    if (
      muscleGroup.exercises &&
      muscleGroup.exercises.some((exercise) => exercise.id === exerciseId)
    ) {
      return muscleGroupKey;
    } else if (
      muscleGroupKey === "upperbody" ||
      muscleGroupKey === "lowerbody"
    ) {
      for (const subGroupKey in muscleGroup) {
        if (subGroupKey !== "importance" && subGroupKey !== "exercises") {
          const subGroup = muscleGroup[subGroupKey];
          if (
            subGroup &&
            typeof subGroup === "object" &&
            subGroup.exercises &&
            subGroup.exercises.some(
              (exercise: Exercise) => exercise.id === exerciseId
            )
          ) {
            return subGroupKey;
          } else if (subGroupKey === "arms" && typeof subGroup === "object") {
            for (const armSubGroupKey in subGroup) {
              if (
                armSubGroupKey !== "importance" &&
                armSubGroupKey !== "exercises"
              ) {
                const armSubGroup = subGroup[armSubGroupKey];
                if (
                  armSubGroup &&
                  typeof armSubGroup === "object" &&
                  armSubGroup.exercises &&
                  armSubGroup.exercises.some(
                    (exercise: Exercise) => exercise.id === exerciseId
                  )
                ) {
                  return armSubGroupKey;
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}
