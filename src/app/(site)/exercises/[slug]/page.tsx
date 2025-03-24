import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExercises, getExerciseBySlug } from "@/server/articles/api";
import markdownToHtml from "@/server/articles/mdtohtml";
import Link from "next/link";

import Image from "next/image";
import { Row, Section, Button, Component } from "@/components/global/ui";
import { SuggestedExercisesList } from "@/components/exercises/suggested";
export default async function exercisePage({ params }: Params) {
  const slug = (await params).slug;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    return notFound();
  }

  const content = await markdownToHtml(exercise.content);

  return (
    <>
      <Section>
        <article>
          <Row>
            <Component small>
              <h1 className="md:mt-12">{exercise.title}</h1>
              <p>{exercise.excerpt}</p>
            </Component>
            <Image
              src={exercise.image}
              alt={`${exercise.title} | Verzes Curated Health & Fitness Platform`}
              width={1000}
              height={600}
              quality={75}
              priority={true}
              className="w-full h-auto aspect-[4/3] md:aspect-[16/9] object-cover mb-4 rounded-xl md:rounded-2xl shadow-xl"
            />
            <Component>
              <div
                className="flex flex-col gap-8 exercise-content mb-8 md:mb-16 w-full max-w-3xl "
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Component>
          </Row>
        </article>

        <Row>
          <Component small centered>
            <h2>Workout Generator</h2>
            <p>
              Generate bespoke workouts tailored to your goal with a simple
              prompt. Don't like it? Regenerate it!
            </p>
            <Link
              href="/workout-generator"
              className="bg-black text-sm w-fit md:text-base text-background rounded-full px-6 py-2 hover:bg-black/80"
            >
              Try for free {"->"}
            </Link>
          </Component>
        </Row>

        <SuggestedExercisesList currentexercise={exercise} />
      </Section>
    </>
  );
}

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    return notFound();
  }

  const title = exercise.title;
  const description = exercise.excerpt;

  return {
    title: title,
    description: description,
    openGraph: {
      title,
      images: [exercise.image],
    },
  };
}

export async function generateStaticParams() {
  const exercises = getAllExercises();

  return exercises.map((exercise: ExerciseArticle) => ({
    slug: exercise.slug,
  }));
}
