"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Workout Generator", href: "/workout-generator" },
  { name: "Exercises", href: "/exercises" },
];

export default function Nav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {navigation.map((item) => (
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
