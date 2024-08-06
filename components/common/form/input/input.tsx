"use client";

import { InputWrapper, InputWrapperArea } from "./input.style";

const Input = ({
  type,
  placeholder,
  value,
  variant,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  variant?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return type === "textarea" ? (
    <InputWrapperArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant={variant}
    />
  ) : (
    <InputWrapper
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant={variant}
    />
  );
};

export default Input;
