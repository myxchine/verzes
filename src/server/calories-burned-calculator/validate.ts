import { exercises } from "./exercises";
export const data = {
  genders: getGenders(),
  ages: getAges(),
  exerciseDurations: getExerciseDurations(),
  bodyWeights: getBodyWeights(),
};

const { exerciseDurations, bodyWeights, ages, genders } = data;

const expectedOrder = ["exercise", "time", "weight", "age", "gender"];

// Helper to extract numeric value from strings like "30-mins", "80-kg", "40-years-old"
const extractNumericValue = (param: string): number | null => {
  const numMatch = param.match(/^(\d+)/);
  if (numMatch) {
    return parseInt(numMatch[1], 10);
  }
  return null;
};

export function validateParams(params: string[]) {
  const { exerciseDurations, bodyWeights, ages, genders } = data;

  // Check if params exist and don't exceed max length
  if (!params || params.length > 5) {
    return { error: true, result: null, message: "Invalid parameters" };
  }

  const result: {
    exercise: string | null;
    time: number | null;
    weight: number | null;
    age: number | null;
    gender: string | null;
  } = {
    exercise: null,
    time: null,
    weight: null,
    age: null,
    gender: null,
  };

  const paramOrder: string[] = [];

  // Process each parameter
  for (const param of params) {
    if (isExercise(param)) {
      result.exercise = getExerciseValue(param);
      paramOrder.push("exercise");
    } else if (isTime(param)) {
      result.time = extractNumericValue(param);
      paramOrder.push("time");
    } else if (isWeight(param)) {
      result.weight = extractNumericValue(param);
      paramOrder.push("weight");
    } else if (isAge(param)) {
      result.age = extractNumericValue(param);
      paramOrder.push("age");
    } else if (isGender(param)) {
      result.gender = getGenderValue(param);
      paramOrder.push("gender");
    } else {
      return {
        error: true,
        result: null,
        message: `Unrecognized parameter: ${param}`,
      };
    }
  }

  // Verification of the parameter order (ONLY if parameters were provided)
  if (paramOrder.length > 0) {
    // Check if any params were actually parsed
    let expectedOrderSubset = expectedOrder.filter((key) =>
      paramOrder.includes(key)
    );

    if (
      paramOrder.length !== expectedOrderSubset.length ||
      !paramOrder.every((val, index) => val === expectedOrderSubset[index])
    ) {
      return {
        error: true,
        result: null,
        message: `Parameters are not in the expected order.  Expected (subset): ${expectedOrderSubset.join(
          ", "
        )}, but got: ${paramOrder.join(", ")}`,
      };
    }
  }

  return { error: false, result };

  // Category-specific validation functions

  function getExerciseValue(param: string): string {
    const exercise = exercises.find(
      (ex) => ex.value.toLowerCase() === param.toLowerCase()
    );
    return exercise ? exercise.value : param.toLowerCase();
  }

  function getGenderValue(param: string): string {
    const gender = genders.find(
      (g) => g.value.toLowerCase() === param.toLowerCase()
    );
    return gender ? gender.value : param.toLowerCase();
  }
}

export function isExercise(param: string): boolean {
  return exercises.some((ex) => ex.value.toLowerCase() === param.toLowerCase());
}

export function isTime(param: string): boolean {
  const numValue = extractNumericValue(param);
  return (
    numValue !== null &&
    exerciseDurations.includes(numValue) &&
    param.includes("-mins")
  );
}

export function isWeight(param: string): boolean {
  const numValue = extractNumericValue(param);
  return (
    numValue !== null && bodyWeights.includes(numValue) && param.includes("-kg")
  );
}

export function isAge(param: string): boolean {
  const numValue = extractNumericValue(param);
  return (
    numValue !== null && ages.includes(numValue) && param.includes("-years-old")
  );
}

export function isGender(param: string): boolean {
  return genders.some((g) => g.value.toLowerCase() === param.toLowerCase());
}

export function getGenders() {
  return [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
}

export function getAges() {
  const min = 1;
  const max = 150;
  const ages: number[] = [];
  for (let i = min; i <= max; i += 1) {
    ages.push(i);
  }
  return ages;
}

export function getExerciseDurations() {
  const min = 1;
  const max = 1000;
  const durations: number[] = [];
  for (let i = min; i <= max; i += 1) {
    durations.push(i);
  }
  return durations;
}

export function getBodyWeights() {
  const min = 1;
  const max = 400;
  const weights: number[] = [];
  for (let i = min; i <= max; i++) {
    weights.push(i);
  }
  return weights;
}
