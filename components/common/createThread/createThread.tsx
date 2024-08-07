"use client";

import useThreadModal from "@/hooks/useThreadModal";

import Input from "../form/input/input";
import SmallButton from "../smallButton/smallButton";

import { CreateThreadWrapper } from "./createThread.style";

const CreateThread = () => {
  const { newThreadFormState, setIsOpenModal, setThreadData } =
    useThreadModal();

  const newThreadModal = () => {
    setIsOpenModal(true);
  };

  return (
    <CreateThreadWrapper
      onSubmit={(e: any) => {
        e.preventDefault();
        newThreadModal();
      }}
    >
      <Input
        type={"text"}
        placeholder={"Create a new thread"}
        onChange={(e) => setThreadData("title", e.target.value as any)}
        value={newThreadFormState.title}
      />
      <SmallButton variant={1} icon="plus" onClick={newThreadModal} />
    </CreateThreadWrapper>
  );
};

export default CreateThread;
