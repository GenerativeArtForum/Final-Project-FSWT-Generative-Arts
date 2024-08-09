"use client";

import { useRef } from "react";

import useThreadModal from "@/hooks/useThreadModal";

import Button from "@/components/common/button/button";
import Input from "@/components/common/form/input/input";
import MultiSelect from "@/components/common/form/select/multiselect";
import ImageUpload from "@/components/common/imageUpload/imageUpload";
import { useToast } from "@/components/ui/use-toast";

import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";

import { NewThreadModalWrapper } from "./newThreadModal.style";

const NewThreadModal = () => {
  const {
    isOpenModal,
    newThreadFormState,
    error,
    selectedTags,
    formFields,
    content,
    setIsOpenModal,
    setThreadData,
    setNewThreadFormState,
    validateThreadForm,
    setError,
    setSelectedTags,
    setImages,
    setContent,
  } = useThreadModal();
  const { toast } = useToast();

  const closeModal = (action: string, e: any) => {
    e.preventDefault();

    if (action === "submit") {
      const canContinue = validateThreadForm();
      if (canContinue) {
        setToast();
      } else {
        return;
      }
    }
    setIsOpenModal(false);
    setError(null);
    setContent("");
    setNewThreadFormState(InitialNewThreadForm);
    setSelectedTags([]);
    setImages([]);
  };

  const setToast = () => {
    toast({
      title: "Thread created successfully",
      duration: 5000,
    });
  };

  const tagsList = [
    "Processing",
    "p5.js",
    "OpenFrameworks",
    "Cinder",
    "Max/MSP",
    "TouchDesigner",
    "Shader Programming",
    "Algorithmic Art",
    "Generative Art",
    "Creative Coding",
    "Digital Art",
    "Interactive Art",
    "Data Visualization",
    "Audiovisual Art",
    "Computer Graphics",
    "Virtual Reality",
    "Augmented Reality",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  const handleEditorChange = (content: string | any) => {
    setContent(content);
    setThreadData("body", content);
  };

  return (
    <NewThreadModalWrapper isOpenModal={isOpenModal}>
      <div
        className="background"
        onClick={(e) => {
          closeModal("close", e);
        }}
      ></div>
      <div className="modal">
        <div className="form-container">
          <h1>Create a new thread</h1>
          <h2>
            Please explain your question in detail and include relevant tags for
            clarity
          </h2>
          <div className="form">
            {formFields.map((field, index) => {
              const fieldLabel =
                field.name[0].toUpperCase() + field.name.slice(1);
              return (
                <div key={index} className="input-container">
                  <label className="input-label">{fieldLabel}</label>
                  <Input
                    variant={2}
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setThreadData(field.name, e.target.value as any)
                    }
                    content={field.type === "textarea" ? content : ""}
                    value={newThreadFormState[field.name] as string}
                    handleEditorChange={handleEditorChange}
                  />
                </div>
              );
            })}
            <div className="input-container">
              <label className="input-label">Images</label>
              <ImageUpload />
            </div>
            <div className="input-container">
              <label className="input-label">Tags</label>
              <MultiSelect
                tagsList={tagsList}
                placeholder="Add tags"
                selectedTags={selectedTags}
                setThreadData={setThreadData}
                setSelectedTags={setSelectedTags}
              />
            </div>
          </div>
          <p className="error-message">{error}</p>
        </div>
        <div className="buttons-container">
          <Button
            text="Cancel"
            variant={2}
            onClick={(e) => {
              closeModal("close", e);
            }}
          />
          <Button
            text="Save as draft"
            variant={3}
            onClick={(e) => {
              closeModal("close", e);
            }}
          />
          <Button
            text="Create thread"
            variant={1}
            onClick={(e) => {
              closeModal("submit", e);
            }}
          />
        </div>
      </div>
    </NewThreadModalWrapper>
  );
};

export default NewThreadModal;
