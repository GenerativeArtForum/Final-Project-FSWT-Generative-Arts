import { db } from "@/db/db";

export type Thread = {
  id: string;
  title: string;
  description: string;
  userId: string;
  tagIds: string[];
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
  title: string,
  description: string,
  userId: string,
  tagIds: string[]
) {
  return await db.thread.create({
    data: {
      title,
      description,
      userId,
      tagIds,
    },
  });
}

export async function updateThread(
  id: string,
  title: string,
  description: string,
  userId: string,
  tagIds: string[]
) {
  return await db.thread.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      userId,
      tagIds,
    },
  });
}

export async function deleteThread(id: string) {
  return await db.thread.delete({
    where: {
      id,
    },
  });
}
