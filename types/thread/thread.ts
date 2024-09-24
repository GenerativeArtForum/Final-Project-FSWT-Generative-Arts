export type TagType = {
  id: string;
  name: string;
};

export type UserType = {
  id?: number | string;
  username: string | null;
  imageUrl?: string;
  isFollowing?: boolean;
  followers?: number;
  following?: number;
  bio?: string;
  tags?: TagType[];
  clerkId?: string;
  coverPhoto?: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE",
};

export type ResponseType = {
  id: number;
  text: string;
  user: UserType;
  userId: number | string | undefined;
  threadId: number;
  createdAt: string;
  updatedAt: string;
};

export type ThreadType = {
  id: number;
  title: string;
  user: UserType;
  userId: number | undefined;
  date: string;
  tags: TagType[];
  description: string;
  responses: number | ResponseType[];
  views: number;
  createdAt: string;
  updatedAt: string;
};
