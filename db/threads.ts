import { db } from "@/db/db";

export type User = {
  id: string;
  clerk_id: string;
};

export async function getThreads() {
  return await db.thread.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getThread(id: string) {
  return await db.thread.findUnique({
    where: { id },
  });
}

export async function createThread(
  id: string,
  title: string,
  description: string,
  userId: string
) {
  return await db.thread.create({
    data: {
      id: id,
      title: title,
      description: description,
      userId: userId,
    },
  });
}

export async function updateThread(
  id: string,
  title: string,
  description: string,
  userId: string
) {
  return await db.thread.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      userId: userId,
    },
  });
}

export async function deleteThread(id: string) {
  return await db.thread.delete({
    where: {
      id: id,
    },
  });
}
