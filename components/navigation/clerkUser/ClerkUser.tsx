/* eslint-disable react-hooks/exhaustive-deps */

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
import {
  createUserAction,
  getUserByClerkIdAction,
  updateUserAction,
} from "@/actions/users";

export default function ClerkUser() {
  const { user } = useUser();

  useEffect(() => {
    getLocalUser();
  }, [user]);

  const getLocalUser = async () => {
    if (user) {
      const username = user.username ?? user.firstName ?? "";
      const email = user.emailAddresses[0]?.emailAddress ?? "";

      const existingUser = await getUserByClerkIdAction(user.id);

      if (existingUser) {
        if (
          existingUser.email !== email ||
          existingUser.username !== username
        ) {
          await updateUserAction(user.id, email, username);
        }
      } else {
        await createUserAction(user.id, email, username);
      }
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
