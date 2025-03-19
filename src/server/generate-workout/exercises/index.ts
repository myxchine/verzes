import { backExercises } from "./back";
import { bicepExercises } from "./biceps";
import { chestExercises } from "./chest";
import { tricepsExercises } from "./triceps";
import { forearmExercises } from "./forearms";
import { shoulderExercises } from "./shoulders";
import { quadricepExercises } from "./quadriceps";
import { gluteExercises } from "./glutes";
import { calfExercises } from "./calves";
import { hamstringExercises } from "./hamstrings";
import { absExercises } from "./abs";
import { cardioExercises } from "./cardio";

export const exercises: ExercisesDatabase = {
  cardio: { importance: 0.1, exercises: cardioExercises },
  upperbody: {
    importance: 1,
    back: { importance: 1, exercises: backExercises },
    chest: { importance: 1, exercises: chestExercises },
    arms: {
      importance: 0.5,
      triceps: { importance: 1, exercises: tricepsExercises },
      biceps: { importance: 1, exercises: bicepExercises },
      forearms: { importance: 0.1, exercises: forearmExercises },
    },
    shoulders: { importance: 0.5, exercises: shoulderExercises },
  },
  lowerbody: {
    importance: 1,
    quadriceps: { importance: 1, exercises: quadricepExercises },
    hamstrings: { importance: 0.5, exercises: hamstringExercises },
    glutes: { importance: 0.75, exercises: gluteExercises },
    calves: { importance: 0.1, exercises: calfExercises },
  },
  abs: { importance: 0.1, exercises: absExercises },
};

export const workouts: Workouts = {
  shortlength: {
    mainWorkout: {
      totalexercises: 3,
      compoundexercises: 3,
      totalreps: 90,
      totalsets: 9,
      duration: 25,
    },
  },
  mediumlength: {
    mainWorkout: {
      totalexercises: 4,
      compoundexercises: 3,
      totalreps: 160,
      totalsets: 16,
      duration: 45,
    },
  },
  longlength: {
    mainWorkout: {
      totalexercises: 6,
      compoundexercises: 3,
      totalreps: 240,
      totalsets: 24,
      duration: 65,
    },
  },
};
