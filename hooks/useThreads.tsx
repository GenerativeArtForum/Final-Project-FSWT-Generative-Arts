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
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null);

  const { user } = useUser();
  const clerkId = user?.id;

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

  const fetchLoggedUserData = async () => {
    if (clerkId) {
      try {
        const userData = await getUserByClerkIdAction(clerkId);
        if (!userData) throw new Error("User data is missing");
        setLoggedUserId(userData.id);
        setNewThreadFormState((prevState) => ({
          ...prevState,
          userId: userData.id,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.error("Clerk ID is missing");
    }
  };

  const createThread = async (thread: NewThreadForm) => {
    const finalUserId = newThreadFormState.userId || loggedUserId;

    if (!finalUserId) {
      throw new Error("User ID is not available");
    }

    const threadPayload = {
      title: thread.question,
      description: thread.body,
      tagIds: thread.tagIds.length > 0 ? thread.tagIds : [],
      userId: finalUserId,
      status: thread.status,
    };

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
    loggedUserId,
    setTagParams,
    fetchThreads,
    createThread,
    fetchSingleThread,
    fetchTags,
    createTag,
    getUserById,
    getClerkUserData,
    fetchLoggedUserData,
  };
};

export default useThreads;
