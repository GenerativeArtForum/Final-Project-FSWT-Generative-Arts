import { TagType } from "./newThreadForm";

export type EditProfileForm = {
  _id: string;
  bio: string;
  tags: TagType[] | [];
};

export type ImageType = {
  _id: string;
  url: string;
};
