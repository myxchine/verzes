// 45 min workout: warmup, main, cooldown
// main: 3 sets compound exercises (15min), 3 sets accessory exercises (15min)
// compound sets: 8-12 reps of a weight that takes you to failure, atleast 2 min rest between sets
// accessory sets: 10-16 reps of a weight that takes you to failure, atleast 2 min rest between sets

interface RoutineFormOptions {
  fitnessGoal: FitnessGoal;
  workoutLength: WorkoutLength;
  place: Place;
  query: string; // custom query by user which contains more info specidifically about what they want to train
}
type FitnessGoal =
  | `Improve General Fitness & Health`
  | `Build Strength & Muscle`
  | `Lose Weight & Tone Body`
  | `Improve Energy Levels & Feel Better`;
type WorkoutLength = "shortlength" | "mediumlength" | "longlength";
type FitnessLevel =
  | "I'm completely new"
  | "I kinda know what I'm doing"
  | "I know what's up";

type Place = "home" | "gym";

interface MuscleGroup {
  importance: number;
  exercises?: Exercise[];
  [key: string]: any;
}

interface MuscleGroupCategory {
  importance: number;
  [muscleGroupName: string]: MuscleGroup | number | Exercise[];
}

interface ExercisesDatabase {
  [key: string]: MuscleGroup;
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  difficulty: "beginner" | "intermediate";
  equipment: string[];
  can_train_at_home: boolean;
  bodyweight: boolean;
  compound: boolean;
  unilateral: boolean;
  hasDuration?: boolean;
  image?: string;
  importance?: number;
}

interface Workouts {
  shortlength: {
    mainWorkout: Workout;
  };
  mediumlength: {
    mainWorkout: Workout;
  };
  longlength: {
    mainWorkout: Workout;
  };
}

interface Workout {
  totalexercises: number;
  compoundexercises: number;
  totalreps: number;
  totalsets: number;
  duration: number;
}

// Utility type to recursively extract keys
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? K | `${K}.${DeepKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

// Extract all possible focus areas
type FocusArea = DeepKeys<ExercisesDatabase>;

interface UserPreferences {
  workoutLength: WorkoutLength;
  goals: FitnessGoal;
  place: "home" | "gym";
  focusAreas: FocusArea[];
}

interface GeneratedWorkout {
  main: GeneratedExercise[];
}

interface DatabaseStoredGeneratedWorkout extends GeneratedWorkout {
  name: string;
  description: string;
  query: string;
  focusAreas: FocusArea[];
  fitnessGoal: FitnessGoal;
  fitnessLevel: FitnessLevel;
  workoutLength: WorkoutLength;
  place: Place;
  createdAt: Date;
}

interface GeneratedExercise extends Exercise {
  sets?: number;
  reps?: number;
  duration?: number;
  rest?: number;
}


interface FocusAreaExercises {
  focusArea: string;
  exercises: Exercise[];
  importance: number;
}

interface CalculatorParams {
  exercise: string | null;
  weight: number | null;
  age: number | null;
  gender: string | null;
  time: number | null;
}
interface CaloriesBurnedExercise {
  label: string;
  value: string;
  METS: number;
}
