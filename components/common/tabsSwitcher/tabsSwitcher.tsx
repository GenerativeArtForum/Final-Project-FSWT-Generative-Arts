"use client";

import CurrentTab from "../currentTab/currentTab";

import { homeTabs } from "@/constants/TabsSwitchers";

import useModal from "@/hooks/useModal";
import { TabsSwitcherWrapper } from "./tabsSwitcher.style";

const TabsSwitcher = () => {
  const { feedDisplay, setFeedDisplay } = useModal();

  return (
    <TabsSwitcherWrapper>
      {homeTabs.map((tab, index) => (
        <CurrentTab
          key={tab.id}
          title={tab.label}
          isActive={feedDisplay === index}
          index={index}
          setFeedDisplay={setFeedDisplay}
        />
      ))}
    </TabsSwitcherWrapper>
  );
};

export default TabsSwitcher;
