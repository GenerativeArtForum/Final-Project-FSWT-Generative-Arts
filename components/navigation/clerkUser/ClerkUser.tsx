"use client";

import Button from "@/components/common/button/button";
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
import { createUserAction } from "@/actions/users";

export default function ClerkUser() {
  const { user } = useUser();

  useEffect(() => {
    getLocalUser();
  }, [user]);

  const getLocalUser = async () => {
    if (user && user.username) {
      await createUserAction(
        user.id,
        user.emailAddresses[0].emailAddress,
        user.username
      );
    }
  };
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
