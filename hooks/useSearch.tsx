import { useEffect, useState } from "react";

const useSearch = () => {
  const [text, setText] = useState<string>("");

  const handleChangeText = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return {
    text,
    handleChangeText,
  };
};

export default useSearch;
