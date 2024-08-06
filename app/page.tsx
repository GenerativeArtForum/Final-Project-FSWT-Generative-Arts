"use client";

import useThreadModal from "@/hooks/useThreadModal";

import CreateThread from "@/components/common/createThread/createThread";
import TabsSwitcher from "@/components/common/tabsSwitcher/tabsSwitcher";

import { HomePageWrapper } from "./home.style";

export default function Home() {
  const { feedDisplay } = useThreadModal();

  return (
    <HomePageWrapper>
      <TabsSwitcher />
      <CreateThread />
      {feedDisplay === 0 ? (
        <div className="container">
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
          <span>Displaying reccomended stuff</span>
        </div>
      ) : (
        <div className="container">
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
          <span>Displaying stuff from your following</span>
        </div>
      )}
    </HomePageWrapper>
  );
}
