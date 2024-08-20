import { getViews, getView, createView, deleteView } from "@/db/views";

export async function getViewsAction() {
  return await getViews();
}

export async function getViewAction(id: string) {
  return await getView(id);
}

export async function createViewAction(threadId: string) {
  return await createView(threadId);
}

export async function deleteViewAction(id: string) {
  return await deleteView(id);
}
