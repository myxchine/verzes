import Image from "next/image";
import { Section, Row, Component } from "@/components/global/ui";
import Link from "next/link";

export default function Home() {
  return (
    <Section>
      <Row>
        <Component centered small padding>
          <h1>Curated Health & Fitness Platform</h1>
          <p>
            A hand-picked directory of health & fitness resources and custom
            tools.
          </p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Link
              href="/workout-generator"
              className="bg-black text-sm md:text-base text-background rounded-full px-6 py-2 hover:bg-black/80"
            >
              Workout Generator {"->"}
            </Link>
          </div>
        </Component>
      </Row>
      <Image
        src="/manthing.jpg"
        alt="Verzes Manthing"
        width={1200}
        height={400}
        priority
        className="w-full object-cover -mt-18 md:-mt-12 max-w-7xl mx-auto aspect-[4/3] md:aspect-auto mix-blend-luminosity brightness-105 greyscale-0"
      />
      <Row>
        <Component centered>
          <h2>Health & Fitness Articles</h2>

          <p>Coming soon...</p>
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
