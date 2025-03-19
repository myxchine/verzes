"use client";

import ExerciseCard from "@/components/workout-generator/exercise-card";
import { useState } from "react";
import { generateUserWorkout } from "@/server/generate-workout/utils";
import { Loading } from "@/components/global/loading";
import { useRouter } from "next/navigation";
import { RegenerateIcon } from "@/components/global/icons";
import { workout } from "@/server/db/schema";
export default function WorkoutComponent({
  workoutData,
}: {
  workoutData: workout;
}) {
  const workout = workoutData.workoutJson as DatabaseStoredGeneratedWorkout;

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setMessage(null);

    try {
      const result = await generateUserWorkout({
        fitnessGoal: workout.fitnessGoal,
        fitnessLevel: workout.fitnessLevel,
        workoutLength: workout.workoutLength,
        place: workout.place,
        query: workout.query,
      });

      if (result.status === "success") {
        router.push(`/workout-generator/workouts/${result.workoutId}`);
      }
      if (result.status === "error") {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error("Client-side error:", error);
      setMessage("An unexpected error occurred. Please try again.");
      setIsRegenerating(false);
    }
  };

  if (isRegenerating) {
    return <Loading />;
  }

  const mainWokrout = sortExercises(workout.main);
  return (
    <div className=" p-6 w-full flex flex-col md:flex-row  gap-8 mb-24 md:mt-8 md:gap-12">
      <div className="flex flex-col gap-4 w-full md:w-[600px] md:sticky md:top-[calc(var(--header-height-desktop)+3.5rem)] md:h-[calc(100svh-var(--header-height-desktop)-var(--footer-height))]">
        {message && (
          <p className="text-center text-sm text-red-600">{message}</p>
        )}

        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-3xl font-bold tracking-tight">{workout.name}</h1>
          <p className="text-black/60 text-sm">{workout.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-start">
          <p className="px-3 py-1 rounded-full bg-black/5 text-xs text-black/60  w-fit">
            {workout.workoutLength === "shortlength"
              ? "20 - 30"
              : workout.workoutLength === "mediumlength"
              ? "40 - 50"
              : "60 - 70"}{" "}
            minutes
          </p>
          <p className="px-3 py-1 rounded-full bg-black/5 text-xs text-black/60  w-fit">
            <span className="capitalize">{workout.place}</span> workout
          </p>
          <p className="px-3 py-1 rounded-full bg-black/5 text-xs text-black/60  w-fit">
            Created {CalculateTimeAgo(new Date(workoutData.createdAt))}
          </p>
        </div>

        <button
          onClick={handleRegenerate}
          className="rounded-full border px-4 py-2 hover:bg-black hover:text-white w-fit text-sm mt-1 flex flex-row items-center gap-2"
        >
          <RegenerateIcon className="size-4" /> Regenerate
        </button>
      </div>
      <section className="flex flex-row w-full ">
        <div className="w-[2px] mt-5 mb-3 bg-black" />
        <div className="flex flex-col gap-12 w-full">
          {mainWokrout.map((exercise: GeneratedExercise, index: number) => {
            return <ExerciseCard exercise={exercise} key={index} />;
          })}
          <div className="flex flex-row w-full gap-2 items-end">
            <div className=" mb-3 h-[2px] w-6 bg-black" />
            <h2 className="font-semibold text-xl px-2">
              You finished your workout!{" "}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

function sortExercises(exercises: Exercise[]): Exercise[] {
  return exercises.slice().sort((a, b) => {
    // Prioritize compound exercises
    if (a.compound && !b.compound) return -1;
    if (!a.compound && b.compound) return 1;

    // If both are compound or both are not, sort by importance (higher importance first)
    return (b.importance || 1) - (a.importance || 1);
  });
}

function CalculateTimeAgo(date: Date): string {
  const today = new Date();
  const seconds = Math.floor((today.getTime() - date.getTime()) / 1000);
  if (seconds < 29) {
    return `Now`;
  }
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
