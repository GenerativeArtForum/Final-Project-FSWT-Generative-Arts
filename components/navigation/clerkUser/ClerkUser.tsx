"use client";

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
    <div>
      <ClerkLoading>Loading...</ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-slate-500 border rounded-full p-1 px-3 hover:bg-blue-50 transition duration-500">
              {" "}
              Login{" "}
            </button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
}
