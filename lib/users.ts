import { prisma } from "@/db/db";

export type User = {
  id: string;
  clerk_id: string;
};

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserByClerkId(clerk_id: string) {
  return await prisma.user.findUnique({
    where: { clerk_id },
  });
}

export async function createUser(clerk_id: string) {
  return await prisma.user.create({
    data: {
      clerk_id,
    },
  });
}
