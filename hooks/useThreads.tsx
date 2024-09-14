import { NewThreadForm } from "@/types/forms/newThreadForm";
import { ResponseType, TagType, ThreadType } from "@/types/thread/thread";
import { useEffect, useState } from "react";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tagParams, setTagParams] = useState<string>("");

  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.VERCEL_URL;

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/threads`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const threadsWithUserData = await Promise.all(
        data.map(async (thread: ThreadType) => {
          const threadUserId = thread.userId;
          const threadUserClerkId = await getUserById(threadUserId);
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
                  return {
                    ...response,
                    user: responseUserData,
                  };
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
      const response = await fetch(`${baseURL}/api/threads?id=${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const thread = await response.json();

      const userClerkId = await getUserById(thread.userId);
      const userData = await getClerkUserData(userClerkId);

      const responsesWithUserData = await Promise.all(
        thread.responses.map(async (response: ResponseType) => {
          const responseUserClerkId = await getUserById(response.userId);
          const responseUserData = await getClerkUserData(responseUserClerkId);
          return {
            ...response,
            user: responseUserData,
          };
        })
      );

      const threadWithUserData = {
        ...thread,
        user: userData,
        responses: responsesWithUserData,
      };

      setThread(threadWithUserData);
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
      const response = await fetch(`${baseURL}/api/tags${tagParams}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setTags(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setTagLoading(false);
    }
  };

  const createTag = async (userTag: string) => {
    const response = await fetch(`${baseURL}/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userTag }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const createThread = async (thread: NewThreadForm) => {
    const threadPayload = {
      title: thread.question,
      description: thread.body,
      tagIds: thread.tagIds.length > 0 ? thread.tagIds : [],
      userId: thread.userId,
      status: thread.status,
    };

    const response = await fetch(`${baseURL}/api/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const getUserById = async (id: number | string | undefined) => {
    try {
      const response = await fetch(`${baseURL}/api/users?id=${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const user = await response.json();
      return user.clerk_id;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getClerkUserData = async (clerkId: string) => {
    try {
      const response = await fetch(`/api/users?clerk_id=${clerkId}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching user by Clerk ID: ${response.statusText}`
        );
      }
      const user = await response.json();
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
