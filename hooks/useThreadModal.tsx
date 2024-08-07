"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";

type ThreadModalContextType = {
  isOpenModal: boolean;
  feedDisplay: number;
  newThreadFormState: NewThreadForm;
  error: string | null;
  selectedTags: TagType[] | null;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setFeedDisplay: (feedDisplay: number) => void;
  setNewThreadFormState: (newThreadForm: NewThreadForm) => void;
  setThreadData: (name: keyof NewThreadForm, value: TagType[]) => void;
  validateThreadForm: () => boolean;
  setError: (error: string | null) => void;
  setSelectedTags: (tags: TagType[]) => void;
};

const ThreadModalContext = createContext<ThreadModalContextType>({
  isOpenModal: false,
  feedDisplay: 1,
  newThreadFormState: InitialNewThreadForm,
  error: null,
  selectedTags: null,
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
  setNewThreadFormState: () => {},
  setThreadData: () => {},
  validateThreadForm: () => false,
  setError: () => {},
  setSelectedTags: () => {},
});

export const ThreadModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [feedDisplay, setFeedDisplay] = useState<number>(0);
  const [newThreadFormState, setNewThreadFormState] =
    useState<NewThreadForm>(InitialNewThreadForm);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    newThreadFormState.tags || []
  );

  const setThreadData = (name: keyof NewThreadForm, value: TagType[]) => {
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
        selectedTags,
        setIsOpenModal,
        setFeedDisplay,
        setNewThreadFormState,
        setThreadData,
        validateThreadForm,
        setError,
        setSelectedTags,
      }}
    >
      {children}
    </ThreadModalContext.Provider>
  );
};

const useThreadModal = () => useContext(ThreadModalContext);

export default useThreadModal;
