export interface Item {
  id: number;
  images: string;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  tags: string[];
}

export interface GetItemsResult {
  list: Item[];
  totalCount: number;
}
