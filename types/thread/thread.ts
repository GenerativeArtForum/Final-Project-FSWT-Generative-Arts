type Tag = {
  id: number;
  name: string;
};

type User = {
  id: number;
  username: string;
  image: string;
  isFollowing: boolean;
};

export type ResponseType = {
  id: number;
  text: string;
  user: User;
  votes: number;
  date: string;
};

export type ThreadType = {
  id: number;
  question: string;
  user: User;
  date: string;
  tags: Tag[];
  body: string;
  responses: number | ResponseType[];
  views: number;
};
