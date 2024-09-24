"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import UserProfile from "@/components/profile/userProfile/userProfile";

import { getUserByClerkIdAction } from "@/actions/users";
import { ProfilePageWrapper } from "@/app/profile/page.style";
import Thread from "@/components/thread/threadComponent/threadComponent";
import useResponses from "@/hooks/useResponses";

const UserPage = () => {
  const params = useParams();
  const userId = params?.id ?? "";

  const { getUserById, getClerkUserData } = useResponses();
  const [bio, setBio] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<
    "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"
  >("ZERO");
  const [userData, setUserData] = useState(null);
  const [userThreads, setUserThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const clerkId = await getUserById(
          Array.isArray(userId) ? userId[0] : userId
        );
        const userData = await getClerkUserData(clerkId);
        console.log("userData", userData);
        setUserData(userData);

        if (userData) {
          const userBioCoverPhoto = await getUserByClerkIdAction(
            userData.id?.toString() || ""
          );
          if (!userBioCoverPhoto) throw new Error("User data is missing");
          setBio(userBioCoverPhoto.bio);
          setCoverPhoto(userBioCoverPhoto.coverPhoto);
        }

        const threadsResponse = await fetch(`/api/threads?user=${userId}`);
        if (threadsResponse.ok) {
          const threadsData = await threadsResponse.json();
          setUserThreads(threadsData);
        } else {
          throw new Error("Error fetching user threads");
        }
      } catch (e: any) {
        console.error("Error fetching user data:", e);
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
          <UserProfile user={userData} bio={bio} coverPhoto={coverPhoto} ownProfile={false}/>
          {/* <UserData user={userData} ownProfile={false} /> */}
          {userThreads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))}
        </>
      )}
    </ProfilePageWrapper>
  );
};

export default UserPage;
