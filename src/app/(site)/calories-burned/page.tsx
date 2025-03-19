import HealthForm from "@/components/calories-burned-calculator/form";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Calories Burned Calculator",
    description:
      "Calculate how many calories you'll burn based on any exercise, exercise duration, your body weight, age or gender (or any combination between them).",
  };
}

export default async function CaloriesBurnedPage() {
  return (
    <div className="component max-w-5xl my-6 md:my-12 mx-auto p-4 md:p-6 center !gap-12 ">
      <div className="component text-center center max-w-3xl mx-auto">
        <h1>Calories Burned Calculator</h1>
        <p>
          Calculate how many calories you'll burn based on any exercise,
          exercise duration, your body weight, age or gender (or any combination
          between them).
        </p>
      </div>
      <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-8">
        <HealthForm />
      </div>
    </div>
  );
}
