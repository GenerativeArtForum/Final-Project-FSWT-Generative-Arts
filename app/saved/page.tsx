"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { SavedPageWrapper } from "./page.style";

const SavedPage = () => {
  const router = useRouter();

  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  return (
    <SavedPageWrapper>
      <span>SAVED PAGE</span>
    </SavedPageWrapper>
  );
};

export default SavedPage;
