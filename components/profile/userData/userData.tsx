import Tag from "@/components/common/tag/tag";

import { UserDataWrapper } from "./userData.style";

export const userData = {
  name: "johndoe",
  followers: 100,
  following: 200,
  bio: "Creative coder passionate about generative arts",
  tags: {
    1: "Processing",
    2: "OpenFrameworks",
  },
};

const UserData = () => {
  const tagsArray = Object.values(userData.tags);

  return (
    <UserDataWrapper>
      {userData.bio && userData.bio !== "" && (
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
    </UserDataWrapper>
  );
};

export default UserData;
