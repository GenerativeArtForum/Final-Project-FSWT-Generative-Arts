import { db } from "@/db/db";

export type User = {
  id: string;
  clerk_id: string;
  email?: string;
  username?: string;
  bio?: string;
  coverPhoto?: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  tagIds?: string[];
};

export async function getUsers() {
  return await db.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getUser(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}

export async function getUserByClerkId(clerk_id: string) {
  return await db.user.findUnique({
    where: { clerk_id },
  });
}

export async function createUser(
  clerk_id: string,
  email: string,
  username: string,
  bio?: string,
  coverPhoto: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" = "ZERO",
  tagIds: string[] = []
) {
  return await db.user.create({
    data: {
      clerk_id,
      email,
      username,
      bio,
      coverPhoto,
      tagIds,
    },
  });
}

export async function updateUser(
  clerk_id: string,
  updateFields: {
    email?: string;
    username?: string;
    bio?: string;
    coverPhoto?: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
    tagIds?: string[];
  }
) {
  const data: any = {};

  if (updateFields.email !== undefined) data.email = updateFields.email;
  if (updateFields.username !== undefined)
    data.username = updateFields.username;
  if (updateFields.bio !== undefined) data.bio = updateFields.bio;
  if (updateFields.coverPhoto !== undefined)
    data.coverPhoto = updateFields.coverPhoto;
  if (updateFields.tagIds !== undefined) data.tagIds = updateFields.tagIds;

  return await db.user.update({
    where: { clerk_id },
    data,
  });
}
