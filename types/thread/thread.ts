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

export type ThreadType = {
  id: number;
  question: string;
  user: User;
  date: string;
  tags: Tag[];
  body: string;
  responses: number;
  views: number;
};
