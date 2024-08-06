"use client";

import { ReactNode, useContext, useState, createContext } from "react";

type ThreadModalContextType = {
  isOpenModal: boolean;
  feedDisplay: number;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setFeedDisplay: (feedDisplay: number) => void;
};

const ThreadModalContext = createContext<ThreadModalContextType>({
  isOpenModal: false,
  feedDisplay: 1,
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
});

export const ThreadModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedDisplay, setFeedDisplay] = useState<number>(0);

  return (
    <ThreadModalContext.Provider
      value={{ isOpenModal, feedDisplay, setIsOpenModal, setFeedDisplay }}
    >
      {children}
    </ThreadModalContext.Provider>
  );
};

const useThreadModal = () => useContext(ThreadModalContext);

export default useThreadModal;
