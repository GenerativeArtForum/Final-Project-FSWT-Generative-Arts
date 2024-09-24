"use server";

import {
  getUserByClerkId,
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "@/db/users";

export async function getUsersAction() {
  const users = await getUsers();
  return users;
}

export async function getUserAction(id: string) {
  const user = await getUser(id);
  return user;
}

export async function getUserByClerkIdAction(clerk_id: string) {
  const user = await getUserByClerkId(clerk_id);
  return user;
}

export async function createUserAction(
  clerk_id: string,
  email: string,
  username: string,
  bio?: string,
  coverPhoto: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" = "ZERO",
  tagIds: string[] = []
) {
  const user = await createUser(
    clerk_id,
    email,
    username,
    bio,
    coverPhoto,
    tagIds
  );
  return user;
}

export async function updateUserAction(
  clerk_id: string,
  updateFields: {
    email?: string;
    username?: string;
    bio?: string;
    coverPhoto?: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
    tagIds?: string[];
  }
) {
  const user = await updateUser(clerk_id, updateFields);
  return user;
}
