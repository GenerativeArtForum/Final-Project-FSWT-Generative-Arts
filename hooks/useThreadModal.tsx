"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { NewThreadForm } from "@/types/forms/newThreadForm";

import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";
import { set } from "mongoose";

type ThreadModalContextType = {
  isOpenModal: boolean;
  feedDisplay: number;
  newThreadFormState: NewThreadForm;
  error: string | null;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setFeedDisplay: (feedDisplay: number) => void;
  setNewThreadFormState: (newThreadForm: NewThreadForm) => void;
  setThreadData: (name: keyof NewThreadForm, value: string) => void;
  validateThreadForm: () => boolean;
};

const ThreadModalContext = createContext<ThreadModalContextType>({
  isOpenModal: false,
  feedDisplay: 1,
  newThreadFormState: InitialNewThreadForm,
  error: null,
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
  setNewThreadFormState: () => {},
  setThreadData: () => {},
  validateThreadForm: () => false,
});

export const ThreadModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedDisplay, setFeedDisplay] = useState<number>(0);
  const [newThreadFormState, setNewThreadFormState] =
    useState<NewThreadForm>(InitialNewThreadForm);
  const [error, setError] = useState<string | null>(null);

  const setThreadData = (name: keyof NewThreadForm, value: string) => {
    setError(null);
    setNewThreadFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateThreadForm = () => {
    if (newThreadFormState.title === "" || newThreadFormState.title === "") {
      setError("Please fill out all fields");
      return false;
    } else if (newThreadFormState.title.length < 5) {
      setError("Title must be at least 5 characters");
      return false;
    } else if (newThreadFormState.description.length < 10) {
      setError("Description must be at least 10 characters");
      return false;
    } else if (newThreadFormState.title.length > 100) {
      setError("Title must be less than 100 characters");
      return false;
    } else if (newThreadFormState.description.length > 500) {
      setError("Description must be less than 500 characters");
      return false;
    }
    return true;
  };

  return (
    <ThreadModalContext.Provider
      value={{
        isOpenModal,
        feedDisplay,
        newThreadFormState,
        error,
        setIsOpenModal,
        setFeedDisplay,
        setNewThreadFormState,
        setThreadData,
        validateThreadForm,
      }}
    >
      {children}
    </ThreadModalContext.Provider>
  );
};

const useThreadModal = () => useContext(ThreadModalContext);

export default useThreadModal;
