"use server";

import {
  createThread,
  deleteThread,
  getThread,
  getThreads,
  updateThread,
} from "@/db/threads";

export async function actionGetThreads() {
  const threads = await getThreads();
  return threads;
}

export async function actionGetThread(id: string) {
  const thread = await getThread(id);
  return thread;
}

export async function actionCreateThread(
  id: string,
  title: string,
  description: string,
  userId: string
) {
  const thread = await createThread(id, title, description, userId);
  return thread;
}

export async function actionUpdateThread(
  id: string,
  title: string,
  description: string,
  userId: string
) {
  const thread = await updateThread(id, title, description, userId);
  return thread;
}

export async function actionDeleteThread(id: string) {
  const thread = await deleteThread(id);
  return thread;
}
