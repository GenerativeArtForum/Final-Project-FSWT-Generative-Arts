"use client";

import useModal from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";

import AddIcon from "../../../assets/icons/common/add.svg";
import TickIcon from "../../../assets/icons/common/tick.svg";

import { UserType } from "@/types/thread/thread";

import { CommonIcons } from "@/constants/Icons";
import Image from "next/image";
import { UserProfileWrapper } from "./userProfile.style";

const UserProfile = ({
  user,
  ownProfile,
}: {
  user: UserType;
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

  return (
    <UserProfileWrapper isFollowing={user.isFollowing}>
      <div className="user-container">
        <div className="user-image"></div>
        <div className="user-data">
          <div className="first-row">
            <a className="username">@{user.username}</a>
            {!ownProfile ? (
              <button
                className="follow-button"
                onClick={() => buttonClicked("followButton")}
              >
                <Image
                  src={user.isFollowing ? TickIcon : AddIcon}
                  alt={user.isFollowing ? "following" : "not following"}
                  width={16}
                  height={16}
                />
              </button>
            ) : (
              <button onClick={() => buttonClicked("editButton")}>
                <Image
                  src={CommonIcons["edit"]}
                  alt="Edit profile"
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
          <div className="following-container">
            <p className="following-text">{user.followers} Followers</p>
            <p className="following-text">{user.following} Following</p>
          </div>
        </div>
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfile;
