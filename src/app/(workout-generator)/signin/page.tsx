import GoogleButton from "./googlebutton";
import CheckIfSignedIn from "./check-if-signed-in";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 my-24 p-8">
        <div className="flex flex-col items-center gap-2 text-center max-w-md">
          <h1 className="heading1">Sign In</h1>
          <p>
            Sign in or create a new account to get more personalised workouts
            and like your favourites to save them for later!
          </p>
        </div>
        <GoogleButton />
      </div>
      <CheckIfSignedIn />
    </>
  );
}
