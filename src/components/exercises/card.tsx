import Image from "next/image";
import Link from "next/link";

export default function ExerciseCard({
  exercise,
  lineclamp,
  h3,
}: {
  exercise: ExerciseArticle;
  lineclamp?: boolean;
  h3?: boolean;
}) {
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="relative  rounded-xl md:rounded-2xl shadow-xl overflow-hidden  cursor-pointer "
      key={exercise.slug}
    >
      <Image
        src={exercise.image}
        alt={exercise.title}
        width={500}
        priority
        height={300}
        className=" w-full object-cover aspect-[4/3] md:aspect-[13/9]"
      />
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <div className="p-4 pt-6 md:p-6 md:pt-8  relative z-10">
          {h3 ? (
            <h3 className="line-clamp-2 ">{exercise.title}</h3>
          ) : (
            <h2 className="line-clamp-2">{exercise.title}</h2>
          )}
          <p className={"line-clamp-1 text-sm md:text-base"}>
            {exercise.excerpt}
          </p>
        </div>
        <div className="exercise-card-gradient h-full absolute left-0 bottom-0 w-full " />
      </div>
    </Link>
  );
}
