"use client";

import useModal from "@/hooks/useModal";

import Button from "@/components/common/button/button";
import { SignInButton } from "@clerk/nextjs";

import { LoginModalWrapper } from "./loginModal.style";

const LoginModal = () => {
  const { closeModal, setActiveModal } = useModal();
  return (
    <LoginModalWrapper>
      <div className="form-container">
        <div>
          <h1>Not logged in</h1>
          <span>Please register or sign in to continue</span>
        </div>
        <div className="buttons-container">
          <SignInButton mode="modal">
            <Button
              text="Login"
              variant={1}
              onClick={(e) => {
                closeModal("close", e);
              }}
            />
          </SignInButton>
        </div>
      </div>
    </LoginModalWrapper>
  );
};

export default LoginModal;
