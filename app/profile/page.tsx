"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { ProfilePageWrapper } from "./page.style";

const ProfilePage = () => {
  const router = useRouter();

  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  return (
    <ProfilePageWrapper>
      <UserProfile user={user} ownProfile={true} />
      <UserData user={user} ownProfile={true} />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
