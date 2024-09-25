import {
  getResponses,
  getResponse,
  createResponse,
  updateResponse,
  deleteResponse,
} from "@/db/responses";

export async function getResponsesAction() {
  return await getResponses();
}

export async function getResponseAction(id: string) {
  return await getResponse(id);
}

export async function createResponseAction(
  text: string,
  threadId: string,
  userId: string
) {
  return await createResponse(text, threadId, userId);
}

export async function updateResponseAction(id: string, text: string) {
  return await updateResponse(id, text);
}

export async function deleteResponseAction(id: string) {
  return await deleteResponse(id);
}

