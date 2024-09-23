import { EditProfileForm } from "@/types/forms/editProfileForm";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const useProfile = (userId?: string | null) => {
  const { user } = useUser();

  const clerkId = user?.id;

  useEffect(() => {
    console.log("User id:", userId);
  }, [userId]);

  const updateProfile = async (payload: EditProfileForm) => {
    console.log("payload", payload);
    const responsePayload = {
      clerk_id: clerkId,
      ...payload,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsePayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return {
    updateProfile,
  };
};

export default useProfile;
