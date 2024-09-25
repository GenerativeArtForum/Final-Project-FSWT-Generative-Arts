import { getUserByClerkIdAction } from "@/actions/users";
import { NewResponseForm } from "@/types/forms/newResponseForm";
import { ResponseType } from "@/types/thread/thread";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useResponses = () => {
  const [responses, setResponses] = useState<ResponseType[]>([]);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
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
      }
    };

    console.log("user id", userId);

    if (clerkId) {
      fetchUserData();
    }
  }, [clerkId]);

  const fetchResponses = async () => {
    setResponseLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/responses`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const responsesWithUserData = await Promise.all(
        data.map(async (response: ResponseType) => {
          const clerkId = await getUserById(response.userId);
          const userData = await getClerkUserData(clerkId);
          return {
            ...response,
            user: userData,
          };
        })
      );

      setResponses(responsesWithUserData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setResponseLoading(false);
    }
  };

  const fetchSingleResponse = async (id: string) => {
    setResponseLoading(true);
    setError(null);
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/responses?id=${id}`);
      if (!data.ok) {
        throw new Error(`Error: ${data.status} ${data.statusText}`);
      }
      const response = await data.json();

      const userClerkId = await getUserById(response.userId);
      const userData = await getClerkUserData(userClerkId);

      const responseWithUserData = {
        ...response,
        user: userData,
      };

      setResponse(responseWithUserData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setResponseLoading(false);
    }
  };

  const createResponse = async (response: NewResponseForm) => {
    const responsePayload = {
      text: response.text,
      userId: userId,
      threadId: response.threadId,
    };

    console.log("responsePayload", responsePayload);

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responsePayload),
    });

    if (!data.ok) {
      const errorData = await data.json();
      console.error("Error details:", errorData);
      throw new Error(`Error: ${data.status} ${data.statusText}`);
    }

    return await data.json();
  };

  const getUserById = async (id: number | string | undefined) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const user = await response.json();
      return user.clerk_id;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getClerkUserData = async (clerkId: string | undefined) => {
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

  const refetchResponses = async (threadId: string) => {
    setResponseLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/responses?threadId=${threadId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const responsesWithUserData = await Promise.all(
        data.map(async (response: ResponseType) => {
          const clerkId = await getUserById(response.userId);
          const userData = await getClerkUserData(clerkId);
          return {
            ...response,
            user: userData,
          };
        })
      );

      setResponses(responsesWithUserData);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setResponseLoading(false);
    }
  };

  return {
    responses,
    response,
    responseLoading,
    error,
    fetchResponses,
    createResponse,
    fetchSingleResponse,
    getUserById,
    getClerkUserData,
    refetchResponses,
  };
};

export default useResponses;