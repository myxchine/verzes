import Image from "next/image";
import { Section, Row, Component } from "@/components/global/ui";
import Link from "next/link";
import ExerciseList from "@/components/exercises/list";
import { getAllExercises } from "@/server/articles/api";

export default function Home() {
  const exercises = getAllExercises();
  return (
    <>
      <Section
        full
        className="relative -mt-[var(--header-height-mobile)] md:-mt-[var(--header-height-desktop)] mb-6  overflow-hidden"
      >
        <Image
          src="/manthing.png"
          alt="Verzes Manthing"
          width={1200}
          height={600}
          priority
          className="w-full object-cover -mt-6 md:mt-0  mx-auto aspect-[4/5] md:aspect-[16/9] xl:aspect-[27/9] mix-blend-multiply greyscale-0 saturate-0 opacity-90 blur-[5px]"
        />
        <div className="w-full absolute bottom-0 left-0 z-10 h-full flex flex-col  items-center justify-center top-to-bottom-gradient">
          <Row>
            <Component centered small padding>
              <h1>Curated Health & Fitness Platform</h1>
              <p className="max-w-md">
                A hand-picked directory of health & fitness resources and custom
                tools.
              </p>
              <div className="flex flex-row gap-2 items-center justify-center">
                <Link
                  href="/workout-generator"
                  className="bg-black text-white text-sm md:text-base  rounded-full px-6 py-2 hover:bg-black/80"
                >
                  Workout Generator {"->"}
                </Link>
              </div>
            </Component>
          </Row>
        </div>
      </Section>
      <Section>
        <Row>
          <Component small>
            <h2>Exercises</h2>
            <p>
              Learn about exercises, what they are useful for, how to perform
              them correctly and more.
            </p>
          </Component>
          <ExerciseList exercises={exercises} h3 />
        </Row>
        <Row>
          <Component small>
            <h2>Health & Fitness Articles</h2>
            <p>
              Curated content covering important topics related to exercise and
              diet for overall health and fitness.
            </p>
            <p className="px-6 py-2 bg-black/5 rounded-full w-fit">
              Coming soon...
            </p>
          </Component>
        </Row>
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
      </Section>
    </>
  );
}
