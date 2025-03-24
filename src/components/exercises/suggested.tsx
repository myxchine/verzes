import { Section, Row, Component } from "@/components/global/ui";
import ExerciseList from "./list";
import { getAllExercises } from "@/server/articles/api";

export function SuggestedExercisesList({
  currentexercise,
}: {
  currentexercise?: ExerciseArticle;
}) {
  const exercises = getAllExercises();
  const otherexercises = exercises.filter(
    (exercise) => exercise.slug !== currentexercise?.slug
  );

  return (
    <Row>
      <Component small>
        <h2>Other Exercises</h2>
      </Component>
      <ExerciseList exercises={otherexercises} h3 />
    </Row>
  );
}
