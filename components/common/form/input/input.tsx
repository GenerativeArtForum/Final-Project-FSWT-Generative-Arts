"use client";

import { InputWrapper } from "./input.style";

const Input = ({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) => {
  return <InputWrapper type={type} placeholder={placeholder} />;
};

export default Input;
