import { db } from "@/db/db";

export type Response = {
  id: string;
  text: string;
  threadId: string;
  userId: string;
};

export async function getResponses() {
  return db.response.findMany();
}

export async function getResponse(id: string) {
  return db.response.findUnique({
    where: { id },
  });
}

export async function createResponse(
  text: string,
  threadId: string,
  userId: string
) {
  return db.response.create({
    data: {
      text,
      threadId,
      userId,
    },
  });
}

export async function updateResponse(id: string, text: string) {
  return db.response.update({
    where: { id },
    data: { text },
  });
}

export async function deleteResponse(id: string) {
  return db.response.delete({
    where: { id },
  });
}
