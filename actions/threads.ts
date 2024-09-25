"use server";

import {
  createThread,
  deleteThread,
  getThread,
  getThreads,
  updateThread,
} from "@/db/threads";

export async function actionGetThreads(userId?: string | undefined) {
  const threads = await getThreads(userId);
  return threads;
}

export async function actionGetThread(id: string) {
  const thread = await getThread(id);
  return thread;
}

export async function actionCreateThread(
  title: string,
  description: string,
  userId: string,
  tagIds: string[],
  images: string[],
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" = "DRAFT"
) {
  console.log(title, description, userId, tagIds, status, images);
  const thread = await createThread(title, description, userId, tagIds, status, images);
  return thread;
}

export async function actionUpdateThread(
  id: string,
  title: string,
  description: string,
  userId: string,
  tagIds: string[],
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" = "DRAFT"
) {
  const thread = await updateThread(id, title, description, userId, tagIds, status);
  return thread;
}

export async function actionDeleteThread(id: string) {
  const thread = await deleteThread(id);
  return thread;
}