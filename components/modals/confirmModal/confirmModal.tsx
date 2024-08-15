"use client";

import useModal from "@/hooks/useModal";

import Button from "@/components/common/button/button";

import { ConfirmModalWrapper } from "./confirmModal.style";

const ConfirmModal = () => {
  const { activeModal, prevActiveModal, closeModal, setActiveModal } =
    useModal();

  return (
    <ConfirmModalWrapper>
      <div className="form-container">
        <div>
          <h1>
            Do you want to cancel the{" "}
            {prevActiveModal === "newThread" ? "thread" : "response"}?
          </h1>
          <span>This action cannot be undone</span>
        </div>
        <div className="buttons-container">
          <Button
            text="Back to editing"
            variant={2}
            onClick={(e) => {
              setActiveModal(prevActiveModal);
            }}
          />
          <Button
            text={`Cancel the ${
              prevActiveModal === "newThread" ? "thread" : "response"
            }`}
            variant={1}
            onClick={(e) => {
              closeModal("close", e);
            }}
          />
        </div>
      </div>
    </ConfirmModalWrapper>
  );
};

export default ConfirmModal;
