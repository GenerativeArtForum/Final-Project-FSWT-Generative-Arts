"use client";

import cover1 from "../../../assets/wallpaper-images/wallpaper-1.png";
import cover2 from "../../../assets/wallpaper-images/wallpaper-2.png";
import cover3 from "../../../assets/wallpaper-images/wallpaper-3.png";
import cover4 from "../../../assets/wallpaper-images/wallpaper-4.png";
import cover5 from "../../../assets/wallpaper-images/wallpaper-5.png";

import useModal from "@/hooks/useModal";

import Button from "@/components/common/button/button";
import Input from "@/components/common/form/input/input";

import Image from "next/image";
import { EditProfileModalWrapper } from "./editProfileModal.style";

const coverPhotos = {
  ONE: cover1,
  TWO: cover2,
  THREE: cover3,
  FOUR: cover4,
  FIVE: cover5,
};

const EditProfileModal = () => {
  const {
    editProfileFormState,
    editProfileFields,
    content,
    setProfileData,
    closeModal,
    cancelThread,
  } = useModal();

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData("coverPhoto", e.target.value);
  };

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
            <label className="input-label">Cover photo</label>
            <div className="cover-photo-options">
              <div className="cover-photo-container">
                {Object.keys(coverPhotos).map((tag) => {
                  return (
                    <div key={tag} className="cover-photo-container">
                      <input
                        type="radio"
                        id={tag}
                        name="coverPhoto"
                        value={tag}
                        onChange={handleCoverPhotoChange}
                        checked={editProfileFormState.coverPhoto === tag}
                      />
                      <label htmlFor={tag}>
                        <Image
                          src={coverPhotos[tag as keyof typeof coverPhotos]}
                          alt={`cover-photo-${tag}`}
                          width={100}
                          height={100}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="cover-photo-container">
                <input
                  type="radio"
                  id="ZERO"
                  name="coverPhoto"
                  value="ZERO"
                  onChange={handleCoverPhotoChange}
                  checked={editProfileFormState.coverPhoto === "ZERO"}
                />
                <label htmlFor="ZERO" className="no-bg-label">
                  No Background Image
                </label>
              </div>
            </div>
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
