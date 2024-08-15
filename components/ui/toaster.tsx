"use client";

import CheckmarkIcon from "@/assets/icons/common/checkmark";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  ErrorToast,
  ErrorToastClose,
  ErrorToastDescription,
  ErrorToastTitle,
  ErrorToastViewport,
  SuccessToast,
  SuccessToastClose,
  SuccessToastDescription,
  SuccessToastTitle,
} from "@/styles/toast.style";

export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <ErrorToastViewport />
      {toasts.length > 0 &&
        toasts.map(
          ({ id, title, description, action, toastName, ...props }) => {
            if (toastName === "success") {
              return (
                <SuccessToast key={id} {...props}>
                  <div>
                    {title && (
                      <SuccessToastTitle
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        {title}
                        <CheckmarkIcon />
                      </SuccessToastTitle>
                    )}
                    {description && (
                      <SuccessToastDescription
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        {description}
                        <CheckmarkIcon />
                      </SuccessToastDescription>
                    )}
                  </div>
                  {action}
                  <SuccessToastClose />
                </SuccessToast>
              );
            } else if (toastName === "error") {
              return (
                <ErrorToast key={id} {...props}>
                  <div>
                    {title && <ErrorToastTitle>{title}</ErrorToastTitle>}
                    {description && ( // Check if description exists
                      <ErrorToastDescription>
                        {description}
                      </ErrorToastDescription>
                    )}
                  </div>
                  {action}
                  <ErrorToastClose />
                </ErrorToast>
              );
            }
            return null;
          }
        )}
    </ToastProvider>
  );
};

export default Toaster;
