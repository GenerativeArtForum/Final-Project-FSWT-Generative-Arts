"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useToast } from "@/components/ui/use-toast";

import { NewResponseForm } from "@/types/forms/newResponseForm";
import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

import { InitialNewResponseForm } from "@/data/forms/InitialNewResponseForm";
import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";

type FormField = {
  name: keyof NewThreadForm;
  placeholder: string;
  type: string;
};

type ThreadModalContextType = {
  isOpenModal: boolean | undefined;
  feedDisplay: number;
  newThreadFormState: NewThreadForm;
  newResponseFormState: NewResponseForm;
  error: string | null;
  selectedTags: TagType[] | null;
  formFields: FormField[];
  responseFields: FormField[];
  images: File[];
  content: string;
  activeModal: string;
  prevActiveModal: string;
  shareLink: string;
  setIsOpenModal: (isOpenModal: boolean | undefined) => void;
  setFeedDisplay: (feedDisplay: number) => void;
  setNewThreadFormState: (newThreadForm: NewThreadForm) => void;
  setNewResponseFormState: (newResponseForm: NewResponseForm) => void;
  setThreadData: (name: keyof NewThreadForm, value: any) => void;
  validateThreadForm: () => boolean;
  setError: (error: string) => void;
  setSelectedTags: (tags: TagType[]) => void;
  setImages: (images: File[]) => void;
  setActiveModal: (activeModal: string) => void;
  setPrevActiveModal: (prevActiveModal: string) => void;
  setContent: (content: string) => void;
  closeModal: (action: string, e: any) => void;
  setToast: (
    toastName: string,
    title?: string,
    description?: string,
    duration?: number
  ) => void;
  cancelThread: (e: any) => void;
  setShareLink: (link: string) => void;
};

const ThreadModalContext = createContext<ThreadModalContextType>({
  isOpenModal: false,
  feedDisplay: 1,
  newThreadFormState: InitialNewThreadForm,
  newResponseFormState: InitialNewResponseForm,
  error: null,
  selectedTags: null,
  formFields: [],
  responseFields: [],
  images: [],
  content: "",
  activeModal: "",
  prevActiveModal: "",
  shareLink: "",
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
  setNewThreadFormState: () => {},
  setNewResponseFormState: () => {},
  setThreadData: () => {},
  validateThreadForm: () => false,
  setError: () => {},
  setSelectedTags: () => {},
  setImages: () => {},
  setContent: () => {},
  setActiveModal: () => {},
  setPrevActiveModal: () => {},
  closeModal: () => {},
  setToast: () => {},
  cancelThread: () => {},
  setShareLink: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean | undefined>(false);
  const [activeModal, setActiveModal] = useState<string>("");
  const [prevActiveModal, setPrevActiveModal] = useState<string>("");
  const [feedDisplay, setFeedDisplay] = useState<number>(1);
  const [newThreadFormState, setNewThreadFormState] =
    useState<NewThreadForm>(InitialNewThreadForm);
  const [newResponseFormState, setNewResponseFormState] =
    useState<NewResponseForm>(InitialNewResponseForm);
  const [error, setError] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>(
    newThreadFormState.tags || []
  );
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const { toast } = useToast();

  const setToast = (
    toastName: string,
    title?: string,
    description?: string,
    duration?: number
  ) => {
    toast({
      title,
      toastName,
      description,
      duration,
    });
  };

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

  const responseFields: {
    name: keyof NewResponseForm;
    placeholder: string;
    type: string;
  }[] = [
    {
      name: "body",
      placeholder: "Response body",
      type: "textarea",
    },
  ];

  const setThreadData = (name: keyof NewThreadForm, value: any) => {
    setError("");
    setNewThreadFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateThreadForm = () => {
    let errorMessage = "";
    if (!newThreadFormState.question || !newThreadFormState.body) {
      errorMessage = "Please fill out all fields";
    } else if (newThreadFormState.question.length < 5) {
      errorMessage = "Question must be at least 5 characters";
    } else if (newThreadFormState.body.length < 10) {
      errorMessage = "Body must be at least 10 characters";
    } else if (newThreadFormState.question.length > 100) {
      errorMessage = "Question must be less than 100 characters";
    } else if (newThreadFormState.body.length > 1000) {
      errorMessage = "Body must be less than 1000 characters";
    }

    if (errorMessage) {
      setError(errorMessage);
      setToast("error", undefined, errorMessage);
      return false;
    } else {
      setError("");
      setToast("", "", "");
    }

    return true;
  };

  const closeModal = (action: string, e: any) => {
    e.preventDefault();

    if (action === "submit") {
      const canContinue = validateThreadForm();
      if (canContinue) {
        toast({
          toastName: "success",
          description: "Thread created successfully",
        });
      } else {
        return;
      }
    }
    setIsOpenModal(false);
    setPrevActiveModal("");
    setActiveModal("");
    setError("");
    setContent("");
    setNewThreadFormState(InitialNewThreadForm);
    setSelectedTags([]);
    setImages([]);
  };

  const cancelThread = (e: any) => {
    e.preventDefault();
    setPrevActiveModal(activeModal);
    setActiveModal("confirm");
  };

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpenModal]);

  return (
    <ThreadModalContext.Provider
      value={{
        isOpenModal,
        feedDisplay,
        newThreadFormState,
        newResponseFormState,
        error,
        selectedTags,
        formFields,
        responseFields,
        images,
        content,
        activeModal,
        prevActiveModal,
        shareLink,
        setIsOpenModal,
        setFeedDisplay,
        setNewThreadFormState,
        setNewResponseFormState,
        setThreadData,
        validateThreadForm,
        setError,
        setSelectedTags,
        setImages,
        setContent,
        setActiveModal,
        setPrevActiveModal,
        closeModal,
        setToast,
        cancelThread,
        setShareLink,
      }}
    >
      {children}
    </ThreadModalContext.Provider>
  );
};

const useModal = () => useContext(ThreadModalContext);

export default useModal;
