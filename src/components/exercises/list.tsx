import ExerciseCard from "./card";

export default function ExerciseList({
  exercises,
  cols,
  h3,
  lineclamp,
}: {
  exercises: ExerciseArticle[];
  cols?: string;
  h3?: boolean;
  lineclamp?: boolean;
}) {
  const orderedexercises = exercises.sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );

  return (
    <div
      className={`grid text-left w-full gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 `}
    >
      {orderedexercises.map((exercise) => (
        <ExerciseCard
          exercise={exercise}
          lineclamp={lineclamp}
          h3={h3}
          key={exercise.slug}
        />
      ))}
    </div>
  );
}
