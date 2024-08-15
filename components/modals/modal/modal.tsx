"use client";

import useModal from "@/hooks/useModal";

import ConfirmModal from "../confirmModal/confirmModal";
import LoginModal from "../loginModal/loginModal";
import NewResponseModal from "../newResponseModal/newResponseModal";
import NewThreadModal from "../newThreadModal/newThreadModal";
import ShareModal from "../shareModal/shareModal";

import { ModalWrapper } from "./modal.style";

const Modal = () => {
  const { activeModal, isOpenModal, shareLink, cancelThread, closeModal } = useModal();

  return (
    <ModalWrapper isOpenModal={isOpenModal}>
      <div
        className="background"
        onClick={(e) => {
          if (activeModal === "newThread" || activeModal === "newResponse") {
            cancelThread(e);
          } else {
            closeModal("close", e);
          }
        }}
      ></div>
      <div className="modal">
        {activeModal === "newThread" && <NewThreadModal />}
        {activeModal === "newResponse" && <NewResponseModal />}
        {activeModal === "confirm" && <ConfirmModal />}
        {activeModal === "login" && <LoginModal />}
        {activeModal === "share" && <ShareModal link={shareLink} />}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
