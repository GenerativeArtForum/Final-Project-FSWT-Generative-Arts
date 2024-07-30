import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const ClerkUser = () => {
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
};

export default ClerkUser;
