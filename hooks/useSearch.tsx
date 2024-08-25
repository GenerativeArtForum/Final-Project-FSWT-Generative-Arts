import { useState } from "react";

const useSearch = () => {
  const [text, setText] = useState<string>("");

  const handleChangeText = (value: string) => {
    setText(value);
  };

  return {
    text,
    setText,
    handleChangeText,
  };
};

export default useSearch;
