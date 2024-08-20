"use client";

import useModal from "@/hooks/useModal";

import Button from "@/components/common/button/button";
import Input from "@/components/common/form/input/input";
import MultiSelect from "@/components/common/form/select/multiselect";
import ImageUpload from "@/components/common/imageUpload/imageUpload";

import { EditProfileModalWrapper } from "./editProfileModal.style";

const EditProfileModal = () => {
  const {
    editProfileFormState,
    selectedTags,
    editProfileFields,
    content,
    setProfileData,
    setSelectedTags,
    closeModal,
    cancelThread,
  } = useModal();

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

  return (
    <EditProfileModalWrapper>
      <div className="form-container">
        <h1>Edit your profile</h1>
        <div className="form">
          {editProfileFields.map((field, index) => {
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
                    setProfileData(field.name, e.target.value as any)
                  }
                  content={field.type === "textarea" ? content : ""}
                  value={editProfileFormState[field.name] as string}
                />
              </div>
            );
          })}
          <div className="input-container">
            <label className="input-label">Images</label>
            <ImageUpload maxImages={1} />
          </div>
          <div className="input-container">
            <label className="input-label">Tags</label>
            <MultiSelect
              tagsList={tagsList}
              placeholder="Add tags"
              selectedTags={selectedTags}
              maxTags={2}
              setThreadData={setProfileData}
              setSelectedTags={setSelectedTags}
            />
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
          text="Save"
          variant={1}
          onClick={(e) => {
            closeModal("submit", e);
          }}
        />
      </div>
    </EditProfileModalWrapper>
  );
};

export default EditProfileModal;
