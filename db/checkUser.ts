import { createUserAction, getUserByClerkIdAction } from "@/actions/users";

export async function checkUser(id: string) {
  const user = await getUserByClerkIdAction(id);
  if (user === null) {
    createUserAction(id);
  }
}
