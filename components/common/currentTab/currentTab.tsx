"use client";

import { CurrentTabWrapper } from "./currentTab.style";

const CurrentTab = ({
  title,
  isActive,
  index,
  setFeedDisplay,
}: {
  title: string;
  isActive: boolean;
  index: number;
  setFeedDisplay: (feedDisplay: number) => void;
}) => {
  return (
    <CurrentTabWrapper
      isActive={isActive}
      onClick={() => setFeedDisplay(index)}
    >
      <span>{title}</span>
    </CurrentTabWrapper>
  );
};

export default CurrentTab;
