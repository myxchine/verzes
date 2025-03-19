"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckIfSignedIn() {
  const session = useSession();
  if (session.status === "authenticated") {
    return redirect("/account");
  }
  return null;
}
