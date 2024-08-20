import { useState } from "react";

import { ThreadType } from "@/types/thread/thread";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    threads,
    loading,
    error,
    fetchThreads,
  };
};

export default useThreads;
