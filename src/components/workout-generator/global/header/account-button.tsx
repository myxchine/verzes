"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { AccountIcon, SpinnerIcon } from "@/components/global/icons";

export default function AccountButton() {
  const session = useSession();
  if (session.status === "loading") {
    return (
      <Link href="/account" className="w-full  flex items-center justify-end">
        <SpinnerIcon className="size-5 md:size-6 animate-spin" />
      </Link>
    );
  }
  if (session && session.status === "authenticated") {
    return (
      <Link href="/account" className="w-full  flex items-center justify-end">
        <AccountIcon className="size-5 md:size-6 cursor-pointer " />
      </Link>
    );
  }
  return (
    <Link
      href="/signin"
      className="text-xs rounded-full px-3   h-[28px] md:h-[28px] flex items-center justify-center  bg-black text-background hover:bg-black/80 "
    >
      Sign Up
    </Link>
  );
}
