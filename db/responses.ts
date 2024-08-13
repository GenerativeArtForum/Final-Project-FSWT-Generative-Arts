import { db } from "@/db/db";

export type Response = {
  id: string;
  text: string;
  threadId: string;
  userId: string;
};

export async function getResponses(): Promise<Response[]> {
  return db.response.findMany();
}

export async function getResponse(id: string): Promise<Response | null> {
  return db.response.findUnique({
    where: { id },
  });
}

export async function createResponse(
  text: string,
  threadId: string,
  userId: string
): Promise<Response> {
  return db.response.create({
    data: {
      text,
      threadId,
      userId,
    },
  });
}

export async function updateResponse(
  id: string,
  text: string
): Promise<Response> {
  return db.response.update({
    where: { id },
    data: { text },
  });
}

export async function deleteResponse(id: string): Promise<Response> {
  return db.response.delete({
    where: { id },
  });
}
