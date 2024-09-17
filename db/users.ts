import { db } from "@/db/db";

export type User = {
  id: string;
  clerk_id: string;
  email?: string;
  username?: string;
  bio?: string;
  coverPhoto?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
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
  coverPhoto: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" = "ONE"
) {
  return await db.user.create({
    data: {
      clerk_id,
      email,
      username,
      bio,
      coverPhoto,
    },
  });
}

export async function updateUser(
  clerk_id: string,
  email?: string,
  username?: string,
  bio?: string,
  coverPhoto?: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE"
) {
  return await db.user.update({
    where: { clerk_id },
    data: {
      email,
      username,
      bio,
      coverPhoto,
    },
  });
}
