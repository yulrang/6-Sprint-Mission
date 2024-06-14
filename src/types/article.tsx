export interface Article {
  createdAt: Date;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

export interface GetArticlesResult {
  list: Article[];
}
