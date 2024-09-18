import Tag from "@/components/common/tag/tag";

import { CommonIcons } from "@/constants/Icons";
import useModal from "@/hooks/useModal";
import { UserType } from "@/types/thread/thread";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { UserDataWrapper } from "./userData.style";

export const userData = {
  name: "johndoe",
  // followers: 100,
  // following: 200,
  bio: "Creative coder passionate about generative arts",
  tags: {
    1: "Processing",
    2: "OpenFrameworks",
  },
};

const UserData = ({
  ownProfile,
  user,
}: {
  ownProfile: boolean;
  user: UserType;
}) => {
  const { setIsOpenModal, setActiveModal } = useModal();
  const { isSignedIn } = useUser();

  // const tagsArray = Object.values(userData.tags);

  // const buttonClicked = (button: string) => {
  //   if (!isSignedIn) {
  //     setIsOpenModal(true);
  //     setActiveModal("login");
  //   }

  //   if (button === "followButton") {
  //     alert(!user.isFollowing ? "Followed" : "Unfollowed");
  //   } else if (button === "editButton") {
  //     setIsOpenModal(true);
  //     setActiveModal("editProfile");
  //   }
  // };

  return (
    <UserDataWrapper>
      {/* {userData.bio && userData.bio !== "" && (
        <p className="bio-text">{userData.bio}</p>
      )}
      <div className="about">
        <p className="about-text">Talks about</p>
        <div className="tags">
          {tagsArray.map((tag, index) => (
            <Tag text={tag} key={index} />
          ))}
        </div>
      </div>
      {ownProfile && (
        <button onClick={() => buttonClicked("editButton")}>
          <Image
            src={CommonIcons["edit"]}
            alt="Edit profile"
            width={20}
            height={20}
          />
        </button>
      )} */}
    </UserDataWrapper>
  );
};

export default UserData;
