"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";

type FormField = {
  name: keyof NewThreadForm;
  placeholder: string;
  type: string;
};

type ThreadModalContextType = {
  isOpenModal: boolean;
  feedDisplay: number;
  newThreadFormState: NewThreadForm;
  error: string | null;
  selectedTags: TagType[] | null;
  formFields: FormField[];
  images: File[];
  content: string;
  setIsOpenModal: (isOpenModal: boolean) => void;
  setFeedDisplay: (feedDisplay: number) => void;
  setNewThreadFormState: (newThreadForm: NewThreadForm) => void;
  setThreadData: (name: keyof NewThreadForm, value: any) => void;
  validateThreadForm: () => boolean;
  setError: (error: string | null) => void;
  setSelectedTags: (tags: TagType[]) => void;
  setImages: (images: File[]) => void;
  setContent: (content: string) => void;
};

const ThreadModalContext = createContext<ThreadModalContextType>({
  isOpenModal: false,
  feedDisplay: 1,
  newThreadFormState: InitialNewThreadForm,
  error: null,
  selectedTags: null,
  formFields: [],
  images: [],
  content: "",
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
  setNewThreadFormState: () => {},
  setThreadData: () => {},
  validateThreadForm: () => false,
  setError: () => {},
  setSelectedTags: () => {},
  setImages: () => {},
  setContent: () => {},
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
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpenModal]);

  const formFields: {
    name: keyof NewThreadForm;
    placeholder: string;
    type: string;
  }[] = [
    { name: "question", placeholder: "Thread question", type: "text" },
    {
      name: "body",
      placeholder: "Thread body",
      type: "textarea",
    },
  ];

  const setThreadData = (name: keyof NewThreadForm, value: any) => {
    setError(null);
    setNewThreadFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateThreadForm = () => {
    if (
      newThreadFormState.question === "" ||
      newThreadFormState.question === ""
    ) {
      setError("Please fill out all fields");
      return false;
    } else if (newThreadFormState.question.length < 5) {
      setError("Question must be at least 5 characters");
      return false;
    } else if (newThreadFormState.body.length < 10) {
      setError("Body must be at least 10 characters");
      return false;
    } else if (newThreadFormState.question.length > 100) {
      setError("Question must be less than 100 characters");
      return false;
    } else if (newThreadFormState.body.length > 1000) {
      setError("Body must be less than 1000 characters");
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
        formFields,
        images,
        content,
        setIsOpenModal,
        setFeedDisplay,
        setNewThreadFormState,
        setThreadData,
        validateThreadForm,
        setError,
        setSelectedTags,
        setImages,
        setContent,
      }}
    >
      {children}
    </ThreadModalContext.Provider>
  );
};

const useThreadModal = () => useContext(ThreadModalContext);

export default useThreadModal;
