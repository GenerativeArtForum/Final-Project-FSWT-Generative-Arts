"use client";

import TinyMCEEditor from "../../editor/editor";

import { InputWrapper, InputWrapperArea } from "./input.style";

const Input = ({
  type,
  placeholder,
  value,
  variant,
  content,
  onChange,
  handleEditorChange = () => {},
}: {
  type: string;
  placeholder: string;
  value: string;
  variant?: number;
  content?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleEditorChange?: (content: string) => void | undefined;
}) => {
  
  return type === "textarea" ? (
    <InputWrapperArea variant={variant}>
      <TinyMCEEditor handleEditorChange={handleEditorChange} content={content} />
      {content && (
        <div>
          <span>Preview your question body</span>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          />
        </div>
      )}
    </InputWrapperArea>
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
