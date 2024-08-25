import { db } from "@/db/db";

export type Tag = {
  id: string;
  name: string;
};

export async function getTags({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const skip = (page - 1) * limit;

  return await db.tag.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
    skip: skip,
    take: limit,
  });
}

export async function getTag(id: string) {
  return await db.tag.findUnique({
    where: { id },
  });
}

export async function createTag(name: string) {
  return await db.tag.create({
    data: {
      name,
    },
  });
}

export async function updateTag(id: string, name: string) {
  return await db.tag.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
}

export async function deleteTag(id: string) {
  return await db.tag.delete({
    where: {
      id,
    },
  });
}
