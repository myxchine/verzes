import Nav from "./nav";
import Logo from "@/components/workout-generator/global/logo";
import AccountButton from "./account-button";

export default function Menu() {
  return (
    <div className=" md:flex hidden flex-row items-center justify-between  w-full    gap-8 bg-transparent">
      <div className="flex w-1/6 justify-start items-center">
        <Logo />
      </div>

      <div className="flex w-4/6 justify-center items-center">
        <Nav className="flex flex-row gap-8 w-fit justify-center items-center " />
      </div>

      <div className="flex w-1/6 justify-end items-center">
        <AccountButton />
      </div>
    </div>
  );
}
