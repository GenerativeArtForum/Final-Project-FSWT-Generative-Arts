import { useState } from "react";

const useSearch = () => {
  const [text, setText] = useState<string>("");

  const handleChangeText = (value: string) => {
    setText(value);
    console.log(value);
  };

  return {
    text,
    handleChangeText,
  };
};

export default useSearch;
