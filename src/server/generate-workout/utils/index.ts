"use server";

import { generateUserPreferences } from "./ai";
import { newworkout } from "@/server/db/utils";
import { generateWorkout } from "..";

interface PromiseResult {
  workoutId: string | null;
  status: "success" | "error";
  message: string;
}

export async function generateUserWorkout({
  fitnessGoal,
  fitnessLevel,
  workoutLength,
  place,
  query,
}: {
  fitnessGoal: FitnessGoal;
  fitnessLevel: FitnessLevel;
  workoutLength: WorkoutLength;
  place: Place;
  query: string;
}): Promise<PromiseResult> {
  if (!fitnessGoal || !fitnessLevel || !workoutLength || !place || !query) {
    throw new Error("Failed to create your workout routine, please try again");
  }
  const routineOptions = {
    fitnessGoal,
    fitnessLevel,
    workoutLength,
    place,
    query,
  };
  try {
    const aiRes = await generateUserPreferences(query);

    console.log(aiRes);

    const UserPreferences: UserPreferences = {
      workoutLength,
      goals: fitnessGoal,
      place: place,
      focusAreas: aiRes.focusAreas,
    };

    const workout = generateWorkout(UserPreferences);
    const databaseStoredGeneratedWorkout: DatabaseStoredGeneratedWorkout = {
      name: aiRes.name,
      description: aiRes.description,
      ...workout,
      ...routineOptions,
      focusAreas: aiRes.focusAreas,
      createdAt: new Date(),
    };

    const returningWorkoutDatabaseEntry = await newworkout({
      workoutJson: databaseStoredGeneratedWorkout,
    });

    if (
      returningWorkoutDatabaseEntry.status.status === "error" ||
      !returningWorkoutDatabaseEntry.workout
    ) {
      throw new Error("Failed to create workout");
    }

    return {
      workoutId: returningWorkoutDatabaseEntry.workout.id,
      status: "success",
      message: "Your workout routine has been generated!",
    };
  } catch (error) {
    console.log(error);
    return {
      workoutId: null,
      status: "error",
      message: "Failed to generate your workout routine, please try again",
    };
  }
}
