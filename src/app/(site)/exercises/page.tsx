import { Metadata } from "next";
import { getAllExercises } from "@/server/articles/api";
import { Section, Row, Component } from "@/components/global/ui";
import ExerciseList from "@/components/exercises/list";

export const metadata: Metadata = {
  title: "Exercises",
  description:
    "Learn about exercises, what they are useful for, how to perform them correctly and more.",
};

export default function ExercisesPage() {
  const exercises = getAllExercises();
  return (
    <>
      <Section>
        <Row centered>
          <Component centered padding small>
            <h1>Exercises</h1>
            <p>
              Learn about exercises, what they are useful for, how to perform
              them correctly and more.
            </p>
          </Component>

          <ExerciseList exercises={exercises}  />
        </Row>
      </Section>
    </>
  );
}
