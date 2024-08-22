"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { ProfilePageWrapper } from "./page.style";

const ProfilePage = () => {
  const router = useRouter();

  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  const userData = {
    id: 1,
    username: "johndoe",
    followers: 100,
    following: 200,
    bio: "Creative coder passionate about generative arts Creative coder passionate about generative arts Creative coder passionate about generative arts",
    tags: [
      { id: 1, name: "Processing" },
      { id: 2, name: "OpenFrameworks" },
    ],
  };

  return (
    <ProfilePageWrapper>
      <UserProfile user={userData} ownProfile={true} />
      <UserData />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
