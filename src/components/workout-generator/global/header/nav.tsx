"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Workout Generator", href: "/workout-generator" },
  { name: "Explore Workouts", href: "/workout-generator/workouts" },
];

export default function Nav({
  className,
  first,
  second,
}: {
  className?: string;
  first?: boolean;
  second?: boolean;
}) {
  const pathname = usePathname();

  let finalnavigation = navigation;

  if (second === true) {
    finalnavigation = navigation.slice(
      navigation.length - navigation.length / 2,
      navigation.length
    );
  }

  if (first === true) {
    finalnavigation = navigation.slice(
      0,
      navigation.length - navigation.length / 2
    );
  }

  return (
    <nav className={className}>
      {finalnavigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          scroll={false}
          className={` rounded-lg  text-base md:text-sm hover:text-black  w-fit items-center text-center ${
            pathname === item.href ? "text-black" : "text-black/50"
          }
          
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
