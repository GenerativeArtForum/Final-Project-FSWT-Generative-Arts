"use client";

import useThreadModal from "@/hooks/useThreadModal";

import Input from "@/components/common/form/input/input";
import MultiSelect from "@/components/common/form/select/multiselect";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/common/button/button";

import { NewThreadForm } from "@/types/forms/newThreadForm";

import { InitialNewThreadForm } from "@/data/forms/InitialNewThreadForm";

import { NewThreadModalWrapper } from "./newThreadModal.style";

const NewThreadModal = () => {
  const {
    isOpenModal,
    newThreadFormState,
    error,
    selectedTags,
    setIsOpenModal,
    setThreadData,
    setNewThreadFormState,
    validateThreadForm,
    setError,
    setSelectedTags,
  } = useThreadModal();
  const { toast } = useToast();

  const closeModal = (action: string, e: any) => {
    e.preventDefault();
    if (action === "submit") {
      const canContinue = validateThreadForm();
      if (canContinue) {
        setIsOpenModal(false);
        setError(null);
        setNewThreadFormState(InitialNewThreadForm);
        setSelectedTags([]);
        setToast();
      }
    } else {
      setIsOpenModal(false);
      setError(null);
      setNewThreadFormState(InitialNewThreadForm);
      setSelectedTags([]);
    }
  };

  const setToast = () => {
    toast({
      title: "Thread created successfully",
      duration: 5000,
    });
  };

  const formFields: {
    name: keyof NewThreadForm;
    placeholder: string;
    type: string;
  }[] = [
    { name: "title", placeholder: "Thread title", type: "text" },
    {
      name: "description",
      placeholder: "Thread description",
      type: "textarea",
    },
  ];

  const tagsList = [
    "Processing",
    "p5.js",
    "OpenFrameworks",
    "Cinder",
    "Max/MSP",
    "TouchDesigner",
    "Shader Programming",
    "Algorithmic Art",
  ];

  return (
    <NewThreadModalWrapper isOpenModal={isOpenModal}>
      <div
        className="background"
        onClick={(e) => {
          closeModal("close", e);
        }}
      ></div>
      <div className="modal">
        <h1>Create a new thread</h1>
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
                  value={newThreadFormState[field.name] as string}
                />
              </div>
            );
          })}
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
        <div className="buttons-container">
          <Button
            text="Cancel"
            variant={2}
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
