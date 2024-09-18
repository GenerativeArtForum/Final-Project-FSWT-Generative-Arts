"use client";

import { UserType } from "@/types/thread/thread";
import Image from "next/image";
import { UserProfileWrapper } from "./userProfile.style";

import cover1 from "../../../assets/wallpaper-images/wallpaper-1.png";
import cover2 from "../../../assets/wallpaper-images/wallpaper-2.png";
import cover3 from "../../../assets/wallpaper-images/wallpaper-3.png";
import cover4 from "../../../assets/wallpaper-images/wallpaper-4.png";
import cover5 from "../../../assets/wallpaper-images/wallpaper-5.png";
import { CommonIcons } from "@/constants/Icons";
import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

const coverPhotos = {
  ONE: cover1,
  TWO: cover2,
  THREE: cover3,
  FOUR: cover4,
  FIVE: cover5,
};

const UserProfile = ({
  user,
  bio,
  coverPhoto,
  ownProfile,
}: {
  user: UserType;
  bio: string | null;
  coverPhoto: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  ownProfile: boolean;
}) => {
  const { setIsOpenModal, setActiveModal } = useModal();
  const { isSignedIn } = useUser();

  const buttonClicked = (button: string) => {
    if (!isSignedIn) {
      setIsOpenModal(true);
      setActiveModal("login");
    }

    if (button === "followButton") {
      alert(!user.isFollowing ? "Followed" : "Unfollowed");
    } else if (button === "editButton") {
      setIsOpenModal(true);
      setActiveModal("editProfile");
    }
  };

  const backgroundImage =
    coverPhoto !== "ZERO" ? coverPhotos[coverPhoto] : null;

  return (
    <UserProfileWrapper
      isFollowing={user.isFollowing}
      backgroundImage={backgroundImage ? backgroundImage.src : null}
    >
      {backgroundImage && (
        <div className="cover-photo">
          <Image
            src={backgroundImage}
            alt="Cover photo"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      )}
      <div className="user-container">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.username || "User image"}
            className="user-image"
            width={200}
            height={200}
          />
        ) : (
          <div className="image-fallback"></div>
        )}
        <div className="user-data">
          <div className="first-row">
            <a className="username">@{user.username}</a>
            {bio && <p>{bio}</p>}
          </div>
          {ownProfile && (
            <button
              onClick={() => buttonClicked("editButton")}
              className="edit-btn"
            >
              <Image
                src={CommonIcons["edit"]}
                alt="Edit profile"
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfile;
