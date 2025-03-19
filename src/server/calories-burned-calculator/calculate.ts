import { exercises } from "@/server/calories-burned-calculator/exercises";

const defaultgender = "male";
const defaultage = 30;
const defaultweight = 70;
const defaultmet = 8;
const defaultduration = 60;

export function calculateCaloriesBurned(params: CalculatorParams): number {
  let metValue;
  if (
    !params.gender &&
    !params.age &&
    !params.weight &&
    !params.time &&
    !params.exercise
  ) {
    throw new Error("Please provide atleaset one parameter");
  }

  if (!params.weight) {
    params.weight = defaultweight;
  }
  if (!params.age) {
    params.age = defaultage;
  }
  if (!params.gender) {
    params.gender = defaultgender;
  }
  if (!params.time) {
    params.time = defaultduration;
  }
  if (!params.exercise) {
    metValue = defaultmet;
  }

  metValue = exercises.find((ex) => ex.value === params.exercise)?.METS;
  if (!metValue) {
    metValue = defaultmet;
  }
  // Standard METs formula
  let caloriesBurned = ((metValue * 3.5 * params.weight) / 200) * params.time;

  // Adjust for gender (Men burn ~10% more)
  const genderMultiplier = params.gender === "male" ? 1.1 : 1.0;
  caloriesBurned *= genderMultiplier;

  // Adjust for age (reduce by 0.5% per year after 30)
  const agePenalty = params.age > 30 ? 1 - (params.age - 30) * 0.005 : 1;
  caloriesBurned *= agePenalty;

  const caloriesburnedrounded = Math.round(caloriesBurned);

  return caloriesburnedrounded;
}
