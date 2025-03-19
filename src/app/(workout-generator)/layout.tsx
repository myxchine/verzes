import { Metadata, Viewport } from "next";
import Header from "@/components/workout-generator/global/header";
import { SessionProvider } from "@/components/workout-generator/global/session-provider";
import Nav from "@/components/workout-generator/global/header/nav";

export const metadata: Metadata = {
  title: {
    default: "Workout Generator",
    template: "%s - Workout Generator",
  },
  description: "Generate bespoke workouts with a simple prompt.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Header />
      <div className="w-full hidden md:hidden p-4 pt-2" id="mobile-nav">
        <Nav className="flex flex-col gap-4 p-8 py-6 items-center justify-center px-4  mx-auto   w-full" />
      </div>
      <main
        className="flex flex-col w-full max-w-[var(--site-width)] mx-auto"
        id="site-main"
      >
        {children}
      </main>

    </SessionProvider>
  );
}
