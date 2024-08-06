"use client";

import { UserProfileWrapper } from "./userProfile.style";

export const userData = {
  name: "johndoe",
  followers: 100,
  following: 200,
  bio: "Creative coder passionate about generative arts Creative coder passionate about generative arts Creative coder passionate about generative arts",
  tags: {
    1: "Processing",
    2: "OpenFrameworks",
  },
};

const UserProfile = () => {
  return (
    <UserProfileWrapper>
      <div className="user-container">
        <div className="user-image"></div>
        <div className="user-data">
          <a className="username">@{userData.name}</a>
          <div className="following-container">
            <p className="following-text">{userData.followers} Followers</p>
            <p className="following-text">{userData.following} Following</p>
          </div>
        </div>
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfile;
