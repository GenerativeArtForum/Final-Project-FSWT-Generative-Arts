import { db } from "@/db/db";

export type View = {
  id: string;
  threadId: string;
};

export async function getViews(): Promise<View[]> {
  return db.view.findMany();
}

export async function getView(id: string): Promise<View | null> {
  return db.view.findUnique({
    where: { id },
  });
}

export async function createView(threadId: string): Promise<View> {
  return db.view.create({
    data: {
      threadId,
    },
  });
}

export async function deleteView(id: string): Promise<View> {
  return db.view.delete({
    where: { id },
  });
}
