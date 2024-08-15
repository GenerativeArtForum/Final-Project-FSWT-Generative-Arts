import { createUser, getUser, getUserByClerkId, getUsers } from "@/lib/users";

export async function actionGetUsers() {
  const users = await getUsers();
  return users;
}

export async function actionGetOneUser(id: string) {
  const user = await getUser(id);
  return user;
}

export async function actionGetUserByClerkId(clerk_id: string) {
  const user = await getUserByClerkId(clerk_id);
  return user;
}

export async function actionCreateUser(clerk_id: string) {
  const user = await createUser(clerk_id);
  return user;
}
