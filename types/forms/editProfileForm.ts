import { TagType } from "./newThreadForm";

export type EditProfileForm = {
  _id: string;
  bio: string;
  coverPhoto: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  tags?: TagType[] | [];
};

export type ImageType = {
  _id: string;
  url: string;
};
