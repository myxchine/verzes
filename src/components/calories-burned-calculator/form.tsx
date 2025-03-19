"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface CustomFormData {
  time: number | "";
  weight: number | "";
  gender: string | "";
  age: number | "";
  exercise: string;
}
import { exercises } from "@/server/calories-burned-calculator/exercises";
export default function HealthForm({
  options,
}: {
  options?: CalculatorParams;
}) {
  const [formData, setFormData] = useState<CustomFormData>({
    time: options && options.time ? options.time : "",
    weight: options && options.weight ? options.weight : "",
    gender: options && options.gender ? options.gender : "",
    age: options && options.age ? options.age : "",
    exercise: options && options.exercise ? options.exercise : "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/calories-burned/${formData.exercise || ""}${
        formData.exercise ? "/" : ""
      }${formData.time || ""}${formData.time ? "-mins/" : ""}${
        formData.weight || ""
      }${formData.weight ? "-kgs/" : ""}${formData.age || ""}${
        formData.age ? "-years-old/" : ""
      }${formData.gender || ""}${formData.gender ? "/" : ""}`
    );
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="exercise" className="text-sm font-medium text-gray-700">
          activity
        </label>
        <select
          id="exercise"
          name="exercise"
          onChange={handleChange}
          value={formData.exercise}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors appearance-none bg-white"
        >
          <option value="">selectExercise</option>
          {exercises.map((exercise) => (
            <option
              key={exercise.value}
              value={exercise.value}
              className="capitalize"
            >
              {exercise.label[0].toUpperCase() + exercise.label.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="time" className="text-sm font-medium text-gray-700">
          durationActive{" "}
          <span className="text-black/60 font-light">optional</span>
        </label>
        <input
          id="time"
          name="time"
          type="number"
          value={formData.time}
          placeholder="timeMinutes"
          onChange={handleChange}
          min={1}
          max={1000}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="weight" className="text-sm font-medium text-gray-700">
          weightKg <span className="text-black/60 font-light">optional</span>
        </label>
        <input
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          placeholder="weightKg"
          onChange={handleChange}
          max={400}
          min={5}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="age" className="text-sm font-medium text-gray-700">
          ageYears <span className="text-black/60 font-light">optional</span>
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          placeholder="age"
          onChange={handleChange}
          max={150}
          min={1}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="gender" className="text-sm font-medium text-gray-700">
          gender <span className="text-black/60 font-light">optional</span>
        </label>
        <select
          id="gender"
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors appearance-none bg-white"
        >
          <option value="">selectGender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-2 semibold bg-black text-white font-medium py-2 rounded-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
      >
        calculate
      </button>
    </form>
  );
}
