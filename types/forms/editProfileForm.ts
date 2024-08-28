import { TagType } from "./newThreadForm";

export type EditProfileForm = {
  _id: string;
  username: string;
  bio: string;
  image: ImageType | undefined;
  tags: TagType[] | [];
};

export type ImageType = {
  _id: string;
  url: string;
};
