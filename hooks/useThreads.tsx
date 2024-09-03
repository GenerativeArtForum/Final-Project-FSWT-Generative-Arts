import { useEffect, useState } from "react";

import { TagType, ThreadType } from "@/types/thread/thread";
import { NewThreadForm } from "@/types/forms/newThreadForm";
import { clerkClient } from "@clerk/nextjs/server";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tagParams, setTagParams] = useState<string>("");

  const fetchThreads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/threads`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setThreads(data);
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
        `${process.env.NEXT_PUBLIC_API_URL}/threads?id=${id}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setThread(data);
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
        `${process.env.NEXT_PUBLIC_API_URL}/tags${tagParams}`
      );
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
    console.log(userTag);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
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
    };

    console.log(threadPayload);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadPayload),
    });

    console.log(JSON.stringify(threadPayload));

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error details:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const getUserById = async (id: number | undefined) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?id=${id}`
      );
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
