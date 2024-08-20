type Tag = {
  id: number;
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
  tags?: Tag[];
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
  question: string;
  user: UserType;
  date: string;
  tags: Tag[];
  body: string;
  responses: number | ResponseType[];
  views: number;
};
