import Link from "next/link";
import { SearchIcon } from "../icons";
import Nav from "./nav";
import Logo from "@/components/global/logo";

export default function Menu() {
  return (
    <div className=" md:flex hidden flex-row items-center justify-between  w-full    gap-8 bg-transparent">
      <div className="flex w-1/6 justify-start items-center">
        <Logo />
      </div>

      <Nav className="flex flex-row gap-8 w-fit justify-center items-center " />
      <div className="w-1/6 justify-end items-center">
        <div className="bg-black text-background rounded-full p-[6px] hover:bg-black/80 ml-auto w-fit">
          <Link href="/workout-generator/workouts">
            <SearchIcon className="size-4 cursor-pointer " />
          </Link>
        </div>
      </div>
    </div>
  );
}
