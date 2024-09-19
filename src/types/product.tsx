export interface Product {
  id: string;
  images: string;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  tags: string[];
  isFavorite: boolean;
}

export interface GetProductResult {
  list: Product[];
  totalCount: number;
}

export interface Comment {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

export interface CommentsListProps {
  items: Comment[];
}
