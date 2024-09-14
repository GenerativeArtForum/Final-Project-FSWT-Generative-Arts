"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { getUserByClerkIdAction } from "@/actions/users";
import Thread from "@/components/thread/threadComponent/threadComponent";
import { useEffect, useState } from "react";
import { ProfilePageWrapper } from "./page.style";

const ProfilePage = () => {
  const router = useRouter();

  const { isSignedIn, user } = useUser();

  const [userThreads, setUserThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);

  const clerkId = user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (clerkId) {
          const userData = await getUserByClerkIdAction(clerkId);
          if (userData) {
            setUserId(userData.id);
          } else {
            throw new Error("User data is null");
          }
        } else {
          throw new Error("Clerk ID is missing");
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [clerkId]);

  useEffect(() => {
    const fetchUserThreads = async () => {
      try {
        setLoading(true);
        setError(null);

        if (userId) {
          const threadsResponse = await fetch(`/api/threads?user=${userId}`);
          if (threadsResponse.ok) {
            const threadsData = await threadsResponse.json();
            setUserThreads(threadsData);
          } else {
            throw new Error("Error fetching user threads");
          }
        } else {
          throw new Error("User ID is missing");
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserThreads();
    }
  }, [userId]);

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProfilePageWrapper>
      <UserProfile user={user} ownProfile={true} />
      <UserData user={user} ownProfile={true} />
      {userThreads.map((thread, index) => (
        <Thread key={index} thread={thread} />
      ))}
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
