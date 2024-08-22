import { db } from "@/db/db";

export type Tag = {
  id: string;
  name: string;
};

export async function getTags() {
  return await db.tag.findMany({
    orderBy: { id: "asc" },
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
