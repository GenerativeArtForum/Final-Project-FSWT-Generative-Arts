import { db } from "@/db/db";

export type Vote = {
  id: string;
  responseId: string;
  userId: string;
  value: "UP" | "DOWN";
};

export async function getVotes() {
  return db.vote.findMany();
}

export async function getVote(id: string) {
  return db.vote.findUnique({
    where: { id },
  });
}

export async function createVote(
  responseId: string,
  userId: string,
  value: "UP" | "DOWN"
) {
  return db.vote.create({
    data: {
      responseId,
      userId,
      value,
    },
  });
}

export async function updateVote(id: string, value: "UP" | "DOWN") {
  return db.vote.update({
    where: { id },
    data: { value },
  });
}

export async function deleteVote(id: string) {
  return db.vote.delete({
    where: { id },
  });
}
