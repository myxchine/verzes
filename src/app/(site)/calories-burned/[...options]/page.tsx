import { validateParams } from "@/server/calories-burned-calculator/validate";
import { notFound } from "next/navigation";
import HealthForm from "@/components/calories-burned-calculator/form";
import { exercises } from "@/server/calories-burned-calculator/exercises";
import { calculateCaloriesBurned } from "@/server/calories-burned-calculator/calculate";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ options: string[] }>;
}) {
  const { options } = await params;
  const validate = validateParams(options);
  if (validate.error === true) {
    return notFound();
  }
  const validatedoptions = validate.result;
  if (validatedoptions === null) {
    return notFound();
  }
  const exerciseLabel = exercises.find(
    (ex) => ex.value === validatedoptions.exercise
  )?.label;
  const calories = calculateCaloriesBurned({ ...validatedoptions });

  let exercisesWithoutCurrentExercise = exercises;

  if (validatedoptions.exercise) {
    exercisesWithoutCurrentExercise = exercises.filter(
      (ex) => ex.value !== validatedoptions.exercise
    );
  }
  return (
    <div className="flex flex-col w-full max-w-6xl  mx-auto p-4 md:p-6 gap-8 ">
      <Main
        validatedoptions={validatedoptions}
        exerciseLabel={exerciseLabel}
        calories={calories}
      />
      <div className="max-w-xl w-full mx-auto p-6 mt-4 bg-white rounded-2xl shadow-md flex flex-col gap-8">
        <div className="component text-center center">
          <h2>caloriesBurnedCalculator</h2>
          <p>calculateCalories</p>
        </div>
        <HealthForm options={validatedoptions} />
      </div>
      <TableOfExercises
        exercises={exercisesWithoutCurrentExercise}
        validatedoptions={validatedoptions}
      />
    </div>
  );
}

function TableOfExercises({
  exercises,
  validatedoptions,
}: {
  exercises: CaloriesBurnedExercise[];
  validatedoptions: CalculatorParams;
}) {
  return (
    <table className="table-auto w-full rounded-2xl shadow-md overflow-hidden mt-4 max-w-xl mx-auto">
      <thead>
        <tr className="bg-white">
          <th className="text-left py-4 px-4 font-semibold">exercises</th>
          <th className="text-left py-2 px-4 font-semibold">
            caloriesBurnedKcal
          </th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, index) => (
          <tr
            key={exercise.value}
            className={index % 2 === 0 ? "bg-white/50" : " bg-white"}
          >
            <td className="text-left py-2 px-4">{exercise.label}</td>
            <td className="text-left py-2 px-4">
              {calculateCaloriesBurned({
                ...validatedoptions,
                exercise: exercise.value,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Main({
  validatedoptions,
  exerciseLabel,
  calories,
}: {
  validatedoptions: CalculatorParams;
  exerciseLabel: string | undefined;
  calories: number;
}) {
  return (
    <div className="component w-fit flex flex-col gap-8 max-w-xl mx-auto mt-4">
      <h1 className="max-w-4xl">
        Calories burned {exerciseLabel ? exerciseLabel : "exercising"}
        {validatedoptions.time && ` for ${validatedoptions.time} minutes`}
        {validatedoptions.weight && ` at ${validatedoptions.weight} kg`}
        {validatedoptions.age || validatedoptions.gender ? " as a" : null}
        {validatedoptions.age && ` ${validatedoptions.age}-year-old`}
        {validatedoptions.gender && ` ${validatedoptions.gender}`}
      </h1>
      <p className="text-lg md:text-xl max-w-2xl">
        On average, <strong>{calories} kcal burned</strong>
        {exerciseLabel ? ` ${exerciseLabel}` : " exercising"}
        {validatedoptions.time && ` for ${validatedoptions.time} minutes`}
        {validatedoptions.weight && ` at ${validatedoptions.weight} kg`}
        {validatedoptions.age || validatedoptions.gender ? " as a" : null}
        {validatedoptions.age && ` ${validatedoptions.age}-year-old`}
        {validatedoptions.gender && ` ${validatedoptions.gender}`}. These
        calculations assume
        {exerciseLabel ? ` ${exerciseLabel}` : " moderate-intensity exercise"}
        {validatedoptions.time ? "" : " for 60 minutes"}
        {!validatedoptions.weight ||
        !validatedoptions.age ||
        !validatedoptions.gender
          ? " for an average"
          : null}
        {validatedoptions.weight ? "" : " 70 kg"}
        {validatedoptions.age ? "" : " 30-year-old"}
        {validatedoptions.gender ? "" : " male"}.
      </p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ options: string[] }>;
}): Promise<Metadata> {
  const { options } = await params;
  const validate = validateParams(options);
  if (validate.error === true) {
    return notFound();
  }
  const validatedoptions = validate.result;
  if (validatedoptions === null) {
    return notFound();
  }
  const exerciseLabel = exercises.find(
    (ex) => ex.value === validatedoptions.exercise
  )?.label;

  const calories = calculateCaloriesBurned({ ...validatedoptions });
  return {
    title: `Calories burned ${exerciseLabel ? exerciseLabel : "exercising"} ${
      validatedoptions.time ? `for ${validatedoptions.time} minutes` : ""
    } ${validatedoptions.weight ? `at ${validatedoptions.weight} kg` : ""} ${
      validatedoptions.age ? `as a ${validatedoptions.age}-year-old` : ""
    } ${validatedoptions.gender ? validatedoptions.gender : ""}`,
    description: `On average, ${calories} kcal burned ${
      exerciseLabel ? exerciseLabel : "exercising"
    } ${validatedoptions.time ? `for ${validatedoptions.time} minutes` : ""} ${
      validatedoptions.weight ? `at ${validatedoptions.weight} kg` : ""
    } ${validatedoptions.age ? `as a ${validatedoptions.age}-year-old` : ""} ${
      validatedoptions.gender ? validatedoptions.gender : ""
    }.`,
  };
}
