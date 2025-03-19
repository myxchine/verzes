import Image from "next/image";
import { Section, Row, Component } from "@/components/global/ui";
import Link from "next/link";

export default function Home() {
  return (
    <Section>
      <div className="w-full md:mt-24 md:mb-48 max-w-6xl mx-auto p-4 md:p-8">
        <Component centeredmobile small padding>
          <h1>Curated Health & Fitness Platform</h1>
          <p className="max-w-md">
            A hand-picked directory of health & fitness resources and custom
            tools.
          </p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Link
              href="/workout-generator"
              className="bg-black/5 text-sm md:text-base  rounded-full px-6 py-2 hover:bg-black/10"
            >
              Workout Generator {"->"}
            </Link>
          </div>
        </Component>
      </div>

      <Image
        src="/manthing.jpg"
        alt="Verzes Manthing"
        width={1200}
        height={400}
        priority
        className="md:absolute w-full md:top-0 md:-z-10 md:right-0 max-w-7xl  object-cover -mt-6 md:mt-0  mx-auto aspect-[4/3] md:aspect-[16/9] mix-blend-luminosity brightness-105 greyscale-0 opacity-100 md:-scale-x-100"
      />
      <Row>
        <Component centered>
          <h2>Health & Fitness Articles</h2>

          <p className="px-6 py-2 bg-black/5 rounded-full w-fit mx-auto">
            Coming soon...
          </p>
        </Component>
        <Component small centered>
          <h2>Workout Generator</h2>

          <p>Generate bespoke workouts with a simple prompt.</p>
          <Link
            href="/workout-generator"
            className="bg-black text-sm w-fit md:text-base text-background rounded-full px-6 py-2 hover:bg-black/80"
          >
            Try for free {"->"}
          </Link>
        </Component>
      </Row>
    </Section>
  );
}
