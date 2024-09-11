"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useToast } from "@/components/ui/use-toast";

import { EditProfileForm } from "@/types/forms/editProfileForm";
import { NewResponseForm } from "@/types/forms/newResponseForm";
import { NewThreadForm, TagType } from "@/types/forms/newThreadForm";

import { getUserByClerkIdAction } from "@/actions/users";
import { InitialEditProfileForm } from "@/data/forms/InitialEditProfileForm";
import { InitialNewResponseForm } from "@/data/forms/InitialNewResponseForm";
import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";
import { useUser } from "@clerk/nextjs";
import useResponses from "./useResponses";
import useThreads from "./useThreads";

type FormField = {
  name: keyof NewThreadForm;
  placeholder: string;
  type: string;
};

type ResponseField = {
  name: keyof NewResponseForm;
  placeholder: string;
  type: string;
};

type ProfileField = {
  name: keyof EditProfileForm;
  placeholder: string;
  type: string;
};

type ThreadModalContextType = {
  isOpenModal: boolean | undefined;
  feedDisplay: number;
  newThreadFormState: NewThreadForm;
  newResponseFormState: NewResponseForm;
  editProfileFormState: EditProfileForm;
  error: string | null;
  selectedTags: TagType[];
  formFields: FormField[];
  responseFields: ResponseField[];
  editProfileFields: ProfileField[];
  images: File[];
  content: string;
  activeModal: string;
  prevActiveModal: string;
  shareLink: string;
  setProfileData: (name: keyof EditProfileForm, value: any) => void;
  setResponseData: (name: keyof NewResponseForm, value: any) => void;
  setIsOpenModal: (isOpenModal: boolean | undefined) => void;
  setFeedDisplay: (feedDisplay: number) => void;
  setNewThreadFormState: React.Dispatch<React.SetStateAction<NewThreadForm>>;
  setNewResponseFormState: React.Dispatch<React.SetStateAction<NewResponseForm>>;
  setEditProfileFormState: (editProfileForm: EditProfileForm) => void;
  setThreadData: (name: keyof NewThreadForm, value: any) => void;
  validateThreadForm: () => { isValid: boolean; successMessage: string };
  setError: (error: string) => void;
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  setImages: (updater: (prevImages: File[]) => File[]) => void;
  setActiveModal: (activeModal: string) => void;
  setPrevActiveModal: (prevActiveModal: string) => void;
  setContent: (content: string) => void;
  closeModal: (
    action: string,
    e: any,
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  ) => void;
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
  editProfileFormState: InitialEditProfileForm,
  error: null,
  selectedTags: [],
  formFields: [
    { name: "question", placeholder: "Thread question", type: "text" },
    { name: "body", placeholder: "Thread body", type: "textarea" },
  ],
  responseFields: [
    { name: "text", placeholder: "Response body", type: "textarea" },
  ],
  editProfileFields: [{ name: "bio", placeholder: "Bio", type: "text" }],
  images: [],
  content: "",
  activeModal: "",
  prevActiveModal: "",
  shareLink: "",
  setProfileData: () => {},
  setResponseData: () => {},
  setIsOpenModal: () => {},
  setFeedDisplay: () => {},
  setNewThreadFormState: () => {},
  setNewResponseFormState: () => {},
  setEditProfileFormState: () => {},
  setThreadData: () => {},
  validateThreadForm: () => ({ isValid: false, successMessage: "" }),
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
  const { user } = useUser();
  const { createThread } = useThreads();
  const { createResponse } = useResponses();

  const [isOpenModal, setIsOpenModal] = useState<boolean | undefined>(false);
  const [activeModal, setActiveModal] = useState<string>("");
  const [prevActiveModal, setPrevActiveModal] = useState<string>("");
  const [feedDisplay, setFeedDisplay] = useState<number>(1);
  const [newThreadFormState, setNewThreadFormState] =
    useState<NewThreadForm>(InitialNewThreadForm);
  const [newResponseFormState, setNewResponseFormState] =
    useState<NewResponseForm>(InitialNewResponseForm);
  const [editProfileFormState, setEditProfileFormState] =
    useState<EditProfileForm>(InitialEditProfileForm);
  const [error, setError] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");
  const [successText, setSuccessText] = useState<string>("");

  const responseFields: {
    name: keyof NewResponseForm;
    placeholder: string;
    type: string;
  }[] = [
    {
      name: "text",
      placeholder: "Response body",
      type: "textarea",
    },
  ];

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

  const editProfileFields: {
    name: keyof EditProfileForm;
    placeholder: string;
    type: string;
  }[] = [
    {
      name: "bio",
      placeholder: "Bio",
      type: "text",
    },
  ];

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

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpenModal]);

  const setThreadData = (name: keyof NewThreadForm, value: any) => {
    setError("");
    setNewThreadFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setResponseData = (name: keyof NewResponseForm, value: any) => {
    setError("");
    setNewResponseFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setProfileData = (name: keyof EditProfileForm, value: any) => {
    setError("");
    setEditProfileFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateThreadForm = () => {
    let errorMessage = "";
    let successMessage = "";

    if (activeModal === "newThread") {
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
        return { isValid: false, successMessage: "" };
      } else {
        successMessage = "Thread created successfully";
        setError("");
        setToast("", "", "");
      }
    } else if (activeModal === "newResponse") {
      if (!newResponseFormState.text) {
        errorMessage = "Please fill the response body";
      } else if (newResponseFormState.text.length > 1000) {
        errorMessage = "Response must be less than 1000 characters";
      }

      if (errorMessage) {
        setError(errorMessage);
        setToast("error", undefined, errorMessage);
        return { isValid: false, successMessage: "" };
      } else {
        successMessage = "Response submitted successfully";
        setError("");
        setToast("", "", "");
      }
      successMessage = "Response submitted successfully";
    } else if (activeModal === "editProfile") {
      if (errorMessage) {
        setError(errorMessage);
        setToast("error", undefined, errorMessage);
        return { isValid: false, successMessage: "" };
      } else {
        successMessage = "Profile info updated successfully";
        setError("");
        setToast("", "", "");
      }
    }

    return { isValid: true, successMessage };
  };

  const handleSuccessMessage = (message: string) => {
    toast({
      toastName: "success",
      description: message,
    });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        try {
          const fetchedUser = await getUserByClerkIdAction(user.id);
          if (fetchedUser) {
            setNewThreadFormState((prevState) => ({
              ...prevState,
              userId: fetchedUser.id,
            }));
            setNewResponseFormState((prevState) => ({
              ...prevState,
              userId: fetchedUser.id,
            }));
          }
        } catch (error) {
          console.error("Error fetching user by Clerk ID:", error);
        }
      }
    };

    fetchUserId();
  }, [user, newThreadFormState.userId]);

  const closeModal = async (action: string, e: any) => {
    e.preventDefault();

    if (action === "submit") {
      const { isValid, successMessage } = validateThreadForm();
      if (isValid) {
        if (activeModal === "newThread") {
          await createThread(newThreadFormState);
          handleSuccessMessage(successMessage);
        } else if (activeModal === "newResponse") {
          await createResponse(newResponseFormState);
          handleSuccessMessage(successMessage);
        }
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
    setNewResponseFormState(InitialNewResponseForm);
    setEditProfileFormState(InitialEditProfileForm);
    setSelectedTags([]);
    setImages([]);
  };

  const cancelThread = (e: any) => {
    e.preventDefault();
    setPrevActiveModal(activeModal);
    setActiveModal("confirm");
  };

  return (
    <ThreadModalContext.Provider
      value={{
        isOpenModal,
        feedDisplay,
        newThreadFormState,
        newResponseFormState,
        editProfileFormState,
        error,
        selectedTags,
        formFields,
        responseFields,
        editProfileFields,
        images,
        content,
        activeModal,
        prevActiveModal,
        shareLink,
        setProfileData,
        setResponseData,
        setIsOpenModal,
        setFeedDisplay,
        setNewThreadFormState,
        setNewResponseFormState,
        setEditProfileFormState,
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
