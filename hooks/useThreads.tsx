import { getUserByClerkIdAction } from "@/actions/users";
import { NewThreadForm } from "@/types/forms/newThreadForm";
import { ResponseType, TagType, ThreadType } from "@/types/thread/thread";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import useModal from "./useModal";

const useThreads = () => {
  const { newThreadFormState, setNewThreadFormState } = useModal();
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tagParams, setTagParams] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    console.log("user id of clerk:", clerkId);
  }, [clerkId]);

  const userCache: Record<number | string, string> = {};
  const clerkCache: Record<string, any> = {};

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/threads`
      );
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();

      const threadsWithUserData = await Promise.all(
        data.map(async (thread: ThreadType) => {
          const threadUserClerkId = await getUserById(thread.userId);
          const threadUserData = await getClerkUserData(threadUserClerkId);

          const responsesWithUserData = Array.isArray(thread.responses)
            ? await Promise.all(
                thread.responses.map(async (response: ResponseType) => {
                  const responseUserClerkId = await getUserById(
                    response.userId
                  );
                  const responseUserData = await getClerkUserData(
                    responseUserClerkId
                  );
                  return { ...response, user: responseUserData };
                })
              )
            : [];

          return {
            ...thread,
            user: threadUserData,
            responses: responsesWithUserData,
          };
        })
      );

      setThreads(threadsWithUserData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleThread = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/threads?id=${id}`
      );
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const thread = await response.json();

      const userClerkId = await getUserById(thread.userId);
      const userData = await getClerkUserData(userClerkId);

      const responsesWithUserData = await Promise.all(
        thread.responses.map(async (response: ResponseType) => {
          const responseUserClerkId = await getUserById(response.userId);
          const responseUserData = await getClerkUserData(responseUserClerkId);
          return { ...response, user: responseUserData };
        })
      );

      setThread({
        ...thread,
        user: userData,
        responses: responsesWithUserData,
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    setTagLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tags${tagParams}`
      );
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setTags(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setTagLoading(false);
    }
  };

  const createTag = async (userTag: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tags`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userTag }),
      }
    );

    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    return await response.json();
  };

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        if (clerkId) {
          const userData = await getUserByClerkIdAction(clerkId);
          if (userData) {
            setUserId(userData.id);
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

  const createThread = async (thread: NewThreadForm) => {
    const threadPayload = {
      title: thread.question,
      description: thread.body,
      tagIds: thread.tagIds.length > 0 ? thread.tagIds : [],
      userId: userId,
      status: thread.status,
    };

    console.log("Thread payload:", threadPayload);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/threads`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(threadPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const getUserById = async (id: number | string | undefined) => {
    if (id === undefined) throw new Error("User ID is undefined");

    if (userCache[id]) return userCache[id];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${id}`
      );
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const user = await response.json();
      userCache[id] = user.clerk_id;
      return user.clerk_id;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getClerkUserData = async (clerkId: string) => {
    if (clerkCache[clerkId]) return clerkCache[clerkId];

    try {
      const response = await fetch(`/api/users?clerk_id=${clerkId}`);
      if (!response.ok)
        throw new Error(
          `Error fetching user by Clerk ID: ${response.statusText}`
        );
      const user = await response.json();
      clerkCache[clerkId] = user;
      return user;
    } catch (error) {
      console.error("Failed to fetch user by Clerk ID:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [tagParams]);

  return {
    threads,
    thread,
    tags,
    loading,
    tagLoading,
    error,
    tagParams,
    setTagParams,
    fetchThreads,
    createThread,
    fetchSingleThread,
    fetchTags,
    createTag,
    getUserById,
    getClerkUserData,
  };
};

export default useThreads;
