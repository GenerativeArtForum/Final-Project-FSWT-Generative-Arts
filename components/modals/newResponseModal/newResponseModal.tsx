"use client";

import useModal from "@/hooks/useModal";

import Button from "@/components/common/button/button";
import Input from "@/components/common/form/input/input";
import ImageUpload from "@/components/common/imageUpload/imageUpload";

import { NewResponseModalWrapper } from "./newResponseModal.style";

const NewResponsetModal = () => {
  const {
    newResponseFormState,
    responseFields,
    content,
    setResponseData,
    setContent,
    closeModal,
    cancelThread,
  } = useModal();

  const handleEditorChange = (content: string | any) => {
    setContent(content);
    setResponseData("body", content);
  };

  return (
    <NewResponseModalWrapper>
      <div className="form-container">
        <h1>Add a response</h1>
        <div className="form">
          {responseFields.map((field, index) => {
            const fieldLabel =
              field.name[0].toUpperCase() + field.name.slice(1);
            return (
              <div key={index} className="input-container">
                <Input
                  variant={2}
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    setResponseData(field.name, e.target.value as any)
                  }
                  content={field.type === "textarea" ? content : ""}
                  value={newResponseFormState[field.name] as string}
                  handleEditorChange={handleEditorChange}
                />
              </div>
            );
          })}
          <div className="input-container">
            <label className="input-label">Images</label>
            <ImageUpload maxImages={2}/>
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <Button
          text="Cancel"
          variant={2}
          onClick={(e) => {
            cancelThread(e);
          }}
        />
        <Button
          text="Add response"
          variant={1}
          onClick={(e) => {
            closeModal("submit", e);
          }}
        />
      </div>
    </NewResponseModalWrapper>
  );
};

export default NewResponsetModal;
