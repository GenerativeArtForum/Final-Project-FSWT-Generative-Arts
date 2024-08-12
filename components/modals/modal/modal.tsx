"use client";

import useModal from "@/hooks/useModal";
import ConfirmModal from "../confirmModal/confirmModal";
import NewThreadModal from "../newThreadModal/newThreadModal";
import { ModalWrapper } from "./modal.style";

const Modal = () => {
  const {
    activeModal,
    isOpenModal,
    cancelThread,
    closeModal,
  } = useModal();

  return (
    <ModalWrapper isOpenModal={isOpenModal}>
      <div
        className="background"
        onClick={(e) => {
          if (activeModal === "newThread") {
            cancelThread(e);
          } else {
            closeModal("close", e);
          }
        }}
      ></div>
      <div className="modal">
        {activeModal === 'newThread' && <NewThreadModal />}
        {activeModal === 'confirm' && <ConfirmModal />}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
