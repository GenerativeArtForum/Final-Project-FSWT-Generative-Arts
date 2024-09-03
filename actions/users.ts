"use server";

import { getUserByClerkId, createUser, getUser, getUsers } from "@/db/users";

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
  username: string
) {
  const user = await createUser(clerk_id, email, username);
  return user;
}
