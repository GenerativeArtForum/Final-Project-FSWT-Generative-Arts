export type TagType = {
  id: string;
  name: string;
};

export type UserType = {
  id?: number;
  username: string;
  image?: string;
  isFollowing?: boolean;
  followers?: number;
  following?: number;
  bio?: string;
  tags?: TagType[];
};

export type ResponseType = {
  id: number;
  text: string;
  user: UserType;
  votes: number;
  personalVote: string | undefined;
  date: string;
};

export type ThreadType = {
  id: number;
  title: string;
  user: UserType;
  date: string;
  tags: TagType[];
  description: string;
  responses: number | ResponseType[];
  views: number;
};
