"use client";

import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
  } from "@clerk/nextjs";
  
  export const Header = () => {
    return (
      <header className="h-16 w-full border">
        <div className="mx-12 flex items-center justify-between h-full">
          <div className="py-8 pl-4 flex items-center gap-x-3">
            <h1 className="text-slate-500 text-xl tracking-wide">
              Generative Arts
            </h1>
          </div>
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
      </header>
    );
  };