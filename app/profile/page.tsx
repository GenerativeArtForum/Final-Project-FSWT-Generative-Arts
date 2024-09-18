"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import UserProfile from "@/components/profile/userProfile/userProfile";
import { getUserByClerkIdAction } from "@/actions/users";
import Thread from "@/components/thread/threadComponent/threadComponent";
import { useEffect, useState } from "react";
import useProfile from "@/hooks/useProfile";
import { ProfilePageWrapper } from "@/app/profile/page.style";

const ProfilePage = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const [bio, setBio] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<
    "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"
  >("ZERO");
  const [userThreads, setUserThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
            setBio(userData.bio);
            setCoverPhoto(userData.coverPhoto);
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

    if (clerkId) {
      fetchUserData();
    }
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

  const { updateProfile } = useProfile(userId);

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     router.push("/");
  //   }
  // }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <ProfilePageWrapper>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <UserProfile
            user={user}
            bio={bio}
            coverPhoto={coverPhoto}
            ownProfile={true}
          />
          {userThreads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))}
        </>
      )}
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
