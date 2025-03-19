import { getworkoutById } from "@/server/db/utils";
import { notFound } from "next/navigation";
import WorkoutComponent from "./workout-component";
import { Loading } from "@/components/global/loading";
import { Suspense } from "react";

export default function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Workout params={params} />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const workoutId = (await params).workoutId;
  const workoutData = await getworkoutById(workoutId);
  if (!workoutData) {
    return notFound();
  }
  return {
    title: workoutData.workoutJson.name,
    description: workoutData.workoutJson.description,
  };
}

async function Workout({ params }: { params: Promise<{ workoutId: string }> }) {
  const workoutId = (await params).workoutId;
  const workoutData = await getworkoutById(workoutId);
  if (!workoutData) {
    return notFound();
  }
  return <WorkoutComponent workoutData={workoutData} />;
}
