"use client";

import CreateThread from "@/components/common/createThread/createThread";
import Thread from "@/components/thread/threadComponent/threadComponent";
import useThreads from "@/hooks/useThreads";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { HomePageWrapper } from "./home.style";

const Home = () => {
  const { threads, loading, fetchThreads, fetchLoggedUserData, loggedUserId } =
    useThreads();
  const { user } = useUser();
  const clerkId = user?.id;

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    if (clerkId) {
      fetchLoggedUserData();
    }
  }, [clerkId]);

  // Optional: Add a condition to ensure threads and userId are available
  useEffect(() => {
    if (loggedUserId) {
      console.log("User ID is set:", loggedUserId);
    } else {
      console.log("User ID is not set yet.");
    }
  }, [loggedUserId]);

  return (
    <HomePageWrapper>
      {/* <TabsSwitcher /> */}
      <CreateThread />
      <div className="container">
        {loading || !threads ? (
          <div className="container">
            <div className="loading" style={{ height: "225px" }}></div>
            <div className="loading" style={{ height: "225px" }}></div>
            <div className="loading" style={{ height: "225px" }}></div>
            <div className="loading" style={{ height: "225px" }}></div>
          </div>
        ) : (
          threads.map((thread, index) => <Thread key={index} thread={thread} />)
        )}
      </div>
    </HomePageWrapper>
  );
};

export default Home;
