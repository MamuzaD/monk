"use client";
import Link from "next/link";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const { isLoaded, signIn } = useSignIn();
  const clerk = useClerk();

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      const signInResponse = await signIn.create({
        strategy: "password",
        identifier: "demouser@demouser.com",
        password: "demouser",
      });

      if (signInResponse.createdSessionId) {
        clerk.setActive({ session: signInResponse.createdSessionId });
        console.log("Sign-in successful");
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 shadow-md rounded-md flex flex-col p-6 w-96 items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Sign In as Demo User</h1>
      <span className="text-center text-lg">
        Reminder: Changes made using the demo user will be
        <strong> visible to all other users.</strong> This means that any
        modifications made by one person using the demo user will be seen by
        others as well.
      </span>
      <Button
        onClick={handleSignIn}
        variant="default"
        className="mt-4 text-lg px-10"
        size="lg"
      >
        Continue
      </Button>
      <span>or</span>
      <div className="space-x-4 w-auto h-auto flex justify-between">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button size={"sm"} variant={"outline"} asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
