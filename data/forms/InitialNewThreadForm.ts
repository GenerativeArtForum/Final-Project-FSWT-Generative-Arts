import { NewThreadForm } from "@/types/forms/newThreadForm";

export const InitialNewThreadForm: NewThreadForm = {
  _id: "",
  question: "",
  userId: "",
  body: "",
  tagIds: [],
  images: [],
  status: "DRAFT",
};
