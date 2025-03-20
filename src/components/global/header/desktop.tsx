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
      <div className="w-1/6 flex flex-col justify-center items-end ">
        <Link href="/workout-generator/workouts" >
          <SearchIcon className="size-5 cursor-pointer " />
        </Link>
      </div>
    </div>
  );
}
