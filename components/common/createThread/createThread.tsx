"use client";

import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import Input from "../form/input/input";
import SmallButton from "../smallButton/smallButton";

import { CreateThreadWrapper } from "./createThread.style";

const CreateThread = () => {
  const { newThreadFormState, setActiveModal, setIsOpenModal, setThreadData } =
    useModal();
  const { isSignedIn } = useUser();

  const buttonClicked = () => {
    if (!isSignedIn) {
      setIsOpenModal(true);
      setActiveModal("login");
    } else {
      newThreadModal();
    }
  };

  const newThreadModal = () => {
    setIsOpenModal(true);
    setActiveModal("newThread");
  };

  return (
    <CreateThreadWrapper
      onSubmit={(e: any) => {
        e.preventDefault();
        buttonClicked();
      }}
    >
      <Input
        type={"text"}
        placeholder={"Create a new thread"}
        onChange={(e) => setThreadData("question", e.target.value as any)}
        value={newThreadFormState.question}
      />
      <SmallButton variant={1} icon="plus" onClick={buttonClicked} />
    </CreateThreadWrapper>
  );
};

export default CreateThread;
