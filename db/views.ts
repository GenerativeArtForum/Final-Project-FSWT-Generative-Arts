import { db } from "@/db/db";

export type View = {
  id: string;
  threadId: string;
};

export async function getViews() {
  return db.view.findMany();
}

export async function getView(id: string) {
  return db.view.findUnique({
    where: { id },
  });
}

export async function createView(threadId: string) {
  return db.view.create({
    data: {
      threadId,
    },
  });
}

export async function deleteView(id: string) {
  return db.view.delete({
    where: { id },
  });
}
