"use client";

import Input from "@/components/common/form/input/input";
import { useToast } from "@/components/ui/use-toast";
import useThreadModal from "@/hooks/useThreadModal";
import { NewThreadModalWrapper } from "./newThreadModal.style";

const NewThreadModal = () => {
  const { isOpenModal, setIsOpenModal } = useThreadModal();
  const { toast } = useToast();

  const closeModal = (e: any) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  const setToast = () => {
    toast({
      title: "Thread created successfully",
      duration: 5000,
    });
  };

  return (
    <NewThreadModalWrapper isOpenModal={isOpenModal}>
      <div className="background" onClick={closeModal}></div>
      <div className="content">
        <h1>Create a new thread</h1>
        <Input type="text" placeholder="Thread title" />
        <Input type="text" placeholder="Thread text" />
        <button
          onClick={(e) => {
            e.preventDefault();
            closeModal(e);
            setToast();
          }}
        >
          Create thread
        </button>
      </div>
    </NewThreadModalWrapper>
  );
};

export default NewThreadModal;
