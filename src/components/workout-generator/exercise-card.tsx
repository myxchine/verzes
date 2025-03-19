import Image from "next/image";
import { getMuscleGroup } from "@/server/generate-workout/utils/helpers";

export default function ExerciseCard({
  exercise,
}: {
  exercise: GeneratedExercise;
}) {
  const muscleGroup = getMuscleGroup(exercise.id);
  return (
    <div className="flex flex-row w-full gap-2">
      <div className=" mt-5 h-[2px] w-6 bg-black" />

      <div className=" flex flex-col gap-2 w-full">
        <div className="flex flex-col w-full p-2 gap-3 ">
          <h2 className="font-semibold text-xl">{exercise.name}</h2>
          <ExerciseMuscleGroups muscleGroups={exercise.muscleGroups} />
          <p className="text-black/60 text-sm">{exercise.description}</p>
          <p className="text-lg font-semibold">
            3 sets of{" "}
            {exercise.hasDuration
              ? "5 minutes (or to failure)"
              : exercise.compound
              ? "8 - 12 reps"
              : "10 - 14 reps"}
          </p>
          <p className="text-xs">rest for atleast 2 minutes between sets</p>
        </div>

        <div className="w-full flex flex-col items-start justify-start ">
          {muscleGroup !== "cardio" && (
            <Image
              src={`/images/${exercise.image || muscleGroup + ".jpg"}`}
              alt={exercise.name}
              width={200}
              height={200}
              priority
              className=""
            />
          )}
        </div>
        {!exercise.bodyweight && (
          <p className="text-xs w-full text-center max-w-[200px]">
            Pick a weight that takes you to failure on each set
          </p>
        )}

        <RequiredEquipment requiredEquipment={exercise.equipment} />
      </div>
    </div>
  );
}

function RequiredEquipment({
  requiredEquipment,
}: {
  requiredEquipment: string[];
}) {
  if (requiredEquipment.length === 0) {
    return <div className="text-xs  text-black/60 px-2">No equipment required.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2  px-2 mt-4">
      <h3 className="!text-lg !font-base">Equipment Required</h3>
      <div className="flex flex-wrap gap-2">
        {requiredEquipment.map((equipment) => (
          <p
            key={equipment}
            className="px-3  capitalize py-1 rounded-full bg-black/5 text-xs text-black/60  w-fit"
          >
            {equipment}
          </p>
        ))}
      </div>
    </div>
  );
}

function ExerciseMuscleGroups({ muscleGroups }: { muscleGroups: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {muscleGroups.map((muscleGroup) => (
        <p
          key={muscleGroup}
          className="px-3  capitalize py-1 rounded-full bg-black/5 text-xs text-black/60  w-fit"
        >
          {muscleGroup}
        </p>
      ))}
    </div>
  );
}
