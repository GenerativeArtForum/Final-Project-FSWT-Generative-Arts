"use client";

import { useEffect } from "react";

import useModal from "@/hooks/useModal";
import useThreads from "@/hooks/useThreads";

import CreateThread from "@/components/common/createThread/createThread";
import TabsSwitcher from "@/components/common/tabsSwitcher/tabsSwitcher";
import Thread from "@/components/thread/threadComponent/threadComponent";

import { HomePageWrapper } from "./home.style";

const Home = () => {
  const { feedDisplay } = useModal();
  const { threads, loading, error, fetchThreads } = useThreads();

  useEffect(() => {
    fetchThreads();
  }, []);

  // const followedThreads = threadsData
  //   .filter((thread) => thread.user.isFollowing)
  //   .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  // const notFollowedThreads = threadsData
  //   .filter((thread) => !thread.user.isFollowing)
  //   .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return (
    <HomePageWrapper>
      <TabsSwitcher />
      <CreateThread />
      <div className="container">
        {/* {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>Server error, please try again.</span>
        ) : feedDisplay === 0 ? (
          followedThreads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))
        ) : (
          notFollowedThreads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))
        )} */}
        {loading ? (
          <span>Loading...</span>
        ) : (
          threads.map((thread, index) => <Thread key={index} thread={thread} />)
        )}
      </div>
    </HomePageWrapper>
  );
};

export default Home;
