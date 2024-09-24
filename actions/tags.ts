"use server";

import { createTag, deleteTag, getTag, getTags, updateTag } from "@/db/tags";

export async function actionGetTags({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const tags = await getTags({ page, limit, search });
  return tags;
}

export async function actionGetTag(id: string) {
  const tag = await getTag(id);
  return tag;
}

export async function actionCreateTag(name: string) {
  const tag = await createTag(name);
  return tag;
}

export async function actionUpdateTag(id: string, name: string) {
  const tag = await updateTag(id, name);
  return tag;
}

export async function actionDeleteTag(id: string) {
  const tag = await deleteTag(id);
  return tag;
}
