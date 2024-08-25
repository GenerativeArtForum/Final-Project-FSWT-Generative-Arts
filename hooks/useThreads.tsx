import { useEffect, useState } from "react";

import { TagType, ThreadType } from "@/types/thread/thread";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tagParams, setTagParams] = useState<string>("");
  const [userTag, setUserTag] = useState<string>("");

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
    fetchSingleThread,
    fetchTags,
    createTag,
  };
};

export default useThreads;
