import { db } from "@/db/db";

export type Thread = {
  id: string;
  title: string;
  description: string;
  userId: string;
  tagIds: string[];
  image: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export async function getThreads(userId?: string) {
  const threads = await db.thread.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const populatedThreads = await Promise.all(
    threads.map(async (thread) => {
      const tags = await db.tag.findMany({
        where: {
          id: { in: thread.tagIds },
        },
      });

      // Ensure responses are filtered by threadId
      const responses = await db.response.findMany({
        where: { threadId: thread.id },
        orderBy: { createdAt: "asc" },
      });

      // Populate responses with user data
      const populatedResponses = await Promise.all(
        responses.map(async (response) => {
          const user = await db.user.findUnique({
            where: { id: response.userId },
          });
          return {
            ...response,
            user,
          };
        })
      );

      return {
        ...thread,
        tags,
        responses: populatedResponses,
      };
    })
  );

  return populatedThreads;
}

export async function getThread(id: string) {
  const thread = await db.thread.findUnique({
    where: { id },
  });

  if (!thread) return null;

  const tags = await db.tag.findMany({
    where: {
      id: { in: thread.tagIds },
    },
  });

  // Filter responses to ensure they belong to the thread
  const responses = await db.response.findMany({
    where: { threadId: thread.id },
    orderBy: { createdAt: "asc" },
  });

  // Populate responses with user data
  const populatedResponses = await Promise.all(
    responses.map(async (response) => {
      const user = await db.user.findUnique({
        where: { id: response.userId },
      });
      return {
        ...response,
        user,
      };
    })
  );

  return {
    ...thread,
    tags,
    responses: populatedResponses,
  };
}

export async function createThread(
  title: string,
  description: string,
  userId: string,
  tagIds: string[],
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" = "DRAFT",
  image: string[],
) {
  return await db.thread.create({
    data: {
      title,
      description,
      userId,
      tagIds,
      status,
      images:image,
    },
  });
}

export async function updateThread(
  id: string,
  title: string,
  description: string,
  userId: string,
  tagIds: string[],
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" = "DRAFT"
) {
  return await db.thread.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      userId,
      tagIds,
      status,
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