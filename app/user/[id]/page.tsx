"use client";

import { useParams } from "next/navigation";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { ProfilePageWrapper } from "@/app/profile/page.style";

const UserPage = () => {
  const params = useParams();
  const userId = params.id;

  return (
    <ProfilePageWrapper>
      <UserProfile />
      <UserData />
      <span>User ID: {userId}</span>
    </ProfilePageWrapper>
  );
};

export default UserPage;
