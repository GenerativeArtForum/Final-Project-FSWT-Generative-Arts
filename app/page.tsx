"use client";

import { useEffect } from "react";
import useThreads from "@/hooks/useThreads";

import CreateThread from "@/components/common/createThread/createThread";
import TabsSwitcher from "@/components/common/tabsSwitcher/tabsSwitcher";
import Thread from "@/components/thread/threadComponent/threadComponent";

import { HomePageWrapper } from "./home.style";

const Home = () => {
  const { threads, loading, fetchThreads } = useThreads();

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <HomePageWrapper>
      <TabsSwitcher />
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
