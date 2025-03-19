import type { workoutWithuserName, workout } from "@/server/db/schema";
import Link from "next/link";
export default async function WorkoutList({
  workouts,
  h3,
}: {
  workouts: workoutWithuserName[] | workout[];
  h3?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:my-4 md:gap-12">
      {workouts.map((workout) => (
        <Link
          href={`/workout-generator/workouts/${workout.id}`}
          key={workout.id}
          className="flex flex-col gap-2 w-full"
        >
          {!h3 ? (
            <h2 className="text-lg font-semibold tracking-tight">
              {workout.workoutJson.name}
            </h2>
          ) : (
            <h3 className="text-lg font-semibold tracking-tight">
              {workout.workoutJson.name}
            </h3>
          )}

          <p>{CalculateTimeAgo(new Date(workout.createdAt))}</p>
          <p className="text-black/60 text-sm line-clamp-2">
            {workout.workoutJson.description}
          </p>
          <span className="px-4 py-2 rounded-full text-sm mt-2 w-fit hover:bg-black hover:text-white border">
            View workout
          </span>
        </Link>
      ))}
    </div>
  );
}

export function WorkoutListSkeleton({
  numberOfWorkouts,
}: {
  numberOfWorkouts: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:my-4 md:gap-12">
      {[...Array(numberOfWorkouts)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-semibold tracking-tight h-[28px] w-[200px] animate-pulse bg-black/10 rounded-full" />
          <p className="h-[24px] w-[100px] animate-pulse bg-black/10 rounded-full" />
          <p className="text-black/60 text-sm line-clamp-2 w-[80%] h-[40px] animate-pulse bg-black/10 rounded-full" />
          <span className="px-4 py-2 rounded-full text-sm mt-2 w-fit border border-black/20 bg-black/10 animate-pulse text-black/20">
            View workout
          </span>
        </div>
      ))}
    </div>
  );
}

function CalculateTimeAgo(date: Date): string {
  const today = new Date();
  const seconds = Math.floor((today.getTime() - date.getTime()) / 1000);

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
