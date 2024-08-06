"use client";

import CheckmarkIcon from "@/assets/icons/common/checkmark";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  CustomToast,
  CustomToastClose,
  CustomToastTitle,
  CustomToastViewport
} from "@/styles/toast.style";

export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <CustomToast key={id} {...props}>
            <div>
              {title && (
                <CustomToastTitle
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {title}
                  <CheckmarkIcon />
                </CustomToastTitle>
              )}
            </div>
            {action}
            <CustomToastClose />
          </CustomToast>
        );
      })}
      <CustomToastViewport />
    </ToastProvider>
  );
};

export default Toaster;
