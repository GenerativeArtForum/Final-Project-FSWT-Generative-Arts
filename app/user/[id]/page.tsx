"use client";

import { useParams } from "next/navigation";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { ProfilePageWrapper } from "@/app/profile/page.style";

const UserPage = () => {
  const params = useParams();
  const userId = params.id;

  const userData = {
    id: 1,
    username: "johndoe",
    isFollowing: false,
    followers: 100,
    following: 200,
    bio: "Creative coder passionate about generative arts Creative coder passionate about generative arts Creative coder passionate about generative arts",
    // tags: [
    //   { id: 1, name: "Processing" },
    //   { id: 2, name: "OpenFrameworks" },
    // ],
  };

  return (
    <ProfilePageWrapper>
      <UserProfile user={userData} ownProfile={false} />
      <UserData ownProfile={false} user={userData} />
      <span>User ID: {userId}</span>
    </ProfilePageWrapper>
  );
};

export default UserPage;
