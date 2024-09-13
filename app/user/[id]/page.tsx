"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import UserData from "@/components/profile/userData/userData";
import UserProfile from "@/components/profile/userProfile/userProfile";

import { ProfilePageWrapper } from "@/app/profile/page.style";
import useResponses from "@/hooks/useResponses";
import Thread from "@/components/thread/threadComponent/threadComponent";

const UserPage = () => {
  const params = useParams();
  const userId = params?.id ?? "";

  const { getUserById, getClerkUserData } = useResponses();
  const [userData, setUserData] = useState(null);
  const [userThreads, setUserThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const clerkId = await getUserById(Array.isArray(userId) ? userId[0] : userId);
        const userData = await getClerkUserData(clerkId);
        setUserData(userData);

        const threadsResponse = await fetch(`/api/threads?user=${userId}`);
        if (threadsResponse.ok) {
          const threadsData = await threadsResponse.json();
          setUserThreads(threadsData);
        } else {
          throw new Error('Error fetching user threads');
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <ProfilePageWrapper>
      {loading || !userData ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <UserProfile user={userData} ownProfile={false} />
          <UserData user={userData} ownProfile={false} />
          {userThreads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))}
        </>
      )}
    </ProfilePageWrapper>
  );
};

export default UserPage;
