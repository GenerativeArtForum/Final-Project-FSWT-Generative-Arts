"use client";

import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import CurrentTab from "../currentTab/currentTab";

import { homeTabs } from "@/constants/TabsSwitchers";

import { TabsSwitcherWrapper } from "./tabsSwitcher.style";

const TabsSwitcher = () => {
  const { feedDisplay, setIsOpenModal, setFeedDisplay, setActiveModal } =
    useModal();
  const { isSignedIn } = useUser();

  const tabSwitcherClicked = (index: number) => {
    if (isSignedIn) {
      setFeedDisplay(index);
    } else if (index === 1) {
      setFeedDisplay(index);
    } else {
      setIsOpenModal(true);
      setActiveModal("login");
    }
  };

  return (
    <TabsSwitcherWrapper>
      {homeTabs.map((tab, index) => (
        <CurrentTab
          key={tab.id}
          title={tab.label}
          isActive={feedDisplay === index}
          index={index}
          setFeedDisplay={() => tabSwitcherClicked(index)}
        />
      ))}
    </TabsSwitcherWrapper>
  );
};

export default TabsSwitcher;
