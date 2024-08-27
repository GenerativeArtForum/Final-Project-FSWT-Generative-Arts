"use client";

import Button from "@/components/common/button/button";
import { checkUser } from "@/db/checkUser";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function ClerkUser() {
  const { user } = useUser();

  useEffect(() => {
    if (user && user.id) {
      const verifyUser = async () => {
        await checkUser(user.id);
      };

      verifyUser().catch((error) => {
        console.error("Error checking user:", error);
      });
    }
  }, [user]);
  return (
    <>
      <ClerkLoading>
        {" "}
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />{" "}
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button text="Login" variant={3} onClick={() => {}} />
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
