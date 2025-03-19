"use client";

import { Loading } from "@/components/global/loading";
import { generateUserWorkout } from "@/server/generate-workout/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MarqueePrompts from "./marquee";
import { toast } from "sonner";

const fitnessGoalOptions: FitnessGoal[] = [
  `Improve General Fitness & Health`,
  `Build Strength & Muscle`,
  `Lose Weight & Tone Body`,
  `Improve Energy Levels & Feel Better`,
];

const fitnessLevelOptions: FitnessLevel[] = [
  "I'm completely new",
  "I kinda know what I'm doing",
  "I know what's up",
];

const workoutLengthOptions: WorkoutLength[] = [
  "shortlength",
  "mediumlength",
  "longlength",
];
const placeOptions: Place[] = ["gym", "home"];

export default function PersonalWorkoutRoutineForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    fitnessGoal: fitnessGoalOptions[1] as FitnessGoal,
    fitnessLevel: fitnessLevelOptions[1] as FitnessLevel,
    workoutLength: workoutLengthOptions[1] as WorkoutLength,
    place: placeOptions[0] as Place,
    query: "" as string,
  });

  const router = useRouter();

  const handleSubmitSuggested = async (query: string) => {
    setIsPending(true);
    setMessage(null);

    if (
      !formData.fitnessGoal ||
      !formData.fitnessLevel ||
      !formData.workoutLength ||
      !formData.place
    ) {
      setMessage("An unexpected error occurred. Please try again.");
      setIsPending(false);
      throw new Error(
        "Failed to create your workout routine, please try again"
      );
    }

    try {
      const result = await generateUserWorkout({
        fitnessGoal: formData.fitnessGoal,
        fitnessLevel: formData.fitnessLevel,
        workoutLength: formData.workoutLength,
        place: formData.place,
        query,
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
      setIsPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.query) {
      toast.error("Please enter a query");
      return;
    }

    if (
      !formData.fitnessGoal ||
      !formData.fitnessLevel ||
      !formData.workoutLength ||
      !formData.place
    ) {
      toast.error("Failed to create your workout routine, please try again");
      return;
    }

    setIsPending(true);
    setMessage(null);

    toast("Generating your workout...");

    try {
      const result = await generateUserWorkout({
        fitnessGoal: formData.fitnessGoal,
        fitnessLevel: formData.fitnessLevel,
        workoutLength: formData.workoutLength,
        place: formData.place,
        query: formData.query,
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
      setIsPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto  w-full flex flex-col items-center justify-start gap-6 h-[calc(100svh-var(--header-height)-var(--footer-height))] md:h-[calc(100svh-var(--header-height-desktop)-var(--footer-height))]">
      {!isPending && !message && (
        <div className="flex flex-col gap-4 md:gap-6 w-full h-full items-center justify-center text-center  overflow-hidden max-w-xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Workout Generator
          </h1>
          <p className=" text-sm pb-4 md:text-base">
            Simply enter what you're thinking and receive your custom workout!
            <strong> Don't like it? Regenerate it! </strong>
          </p>

          <MarqueePrompts
            prompts={[
              "I want to train my legs",
              "I'm looking to burn fat",
              "I want to grow my arms",
              "I want to train upperbody",
              "I want to build overall strength",
            ]}
            speed={40}
            handleSubmitSuggested={handleSubmitSuggested}
          />
          <MarqueePrompts
            prompts={[
              "Something to burn calories",
              "I want to do a full body workout",
              "Back and Biceps",
              "I want to target my triceps",
              "I want to feel stronger",
            ]}
            speed={70}
            direction="right"
            handleSubmitSuggested={handleSubmitSuggested}
          />
        </div>
      )}
      {(isPending || message) && (
        <div className="flex flex-col gap-3 w-full  items-center justify-center text-center max-w-xl mx-auto">
          {isPending && <Loading />}
          {message && <p className="w-full text-center text-sm">{message}</p>}
        </div>
      )}
      {!isPending && (
        <div className="personal-workout-routine-form flex flex-col gap-2 md:gap-3 items-center justify-center w-full p-4 md:p-8 ">
          <form
            onSubmit={handleSubmit}
            className="  w-full md:text-lg h-fit max-h-fit min-h-fit p-4   rounded-3xl bg-black/5  placeholder:text-black/50 flex flex-col  focus:ring-2 focus:ring-black focus:outline-none"
          >
            <textarea
              name="query"
              id="query"
              placeholder="What do you want to focus on today?"
              className=" h-[60px] min-h-[60px] max-h-[60px] focus:outline-none my-1 resize-none"
              value={formData.query}
              onChange={handleChange}
            />

            <div className="flex flex-row gap-2  w-full items-center justify-start overflow-hidden">
              <select
                name="fitnessGoal"
                id="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="max-w-full  !text-center md:w-fit md:max-w-fit hidden"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {fitnessGoalOptions.map((fitnessGoal) => (
                  <option key={fitnessGoal} value={fitnessGoal}>
                    {fitnessGoal}
                  </option>
                ))}
              </select>

              <select
                name="fitnessLevel"
                id="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="!hidden"
              >
                {fitnessLevelOptions.map((fitnessLevel) => (
                  <option key={fitnessLevel} value={fitnessLevel}>
                    {fitnessLevel}
                  </option>
                ))}
              </select>

              <select
                name="workoutLength"
                id="workoutLength"
                value={formData.workoutLength}
                onChange={handleChange}
                className="w-fit max-w-fit "
              >
                {workoutLengthOptions.map((workoutLength) => (
                  <option key={workoutLength} value={workoutLength}>
                    {workoutLength === "shortlength"
                      ? "20 - 30"
                      : workoutLength === "mediumlength"
                      ? "40 - 50"
                      : "60 - 70"}{" "}
                    min
                  </option>
                ))}
              </select>

              <select
                name="place"
                id="place"
                value={formData.place}
                onChange={handleChange}
                className=" w-fit max-w-fit "
              >
                {placeOptions.map((place) => (
                  <option
                    key={place}
                    value={place}
                    className="flex flex-row gap-8 justify-between items-center "
                  >
                    At {place}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className={
                  isPending || formData.query === ""
                    ? "rounded-full bg-black text-background   hover:bg-black/70 !cursor-not-allowed md:text-lg ml-auto"
                    : "rounded-full bg-black text-background  hover:bg-black/70  md:text-lg ml-auto"
                }
              >
                <ArrowIcon className="size-8 md:size-10 p-1 " />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ArrowIcon(props: any) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
