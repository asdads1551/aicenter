export interface Category {
  _id: string;
  name: string;
  ranking: number;
  parentCategoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tool {
  _id: string;
  title: string;
  imageUrl: string;
  overview: string;
  content: string;
  url: string;
  categoryIds: string[];
  mainCategoryId: string;
  isAd: boolean;
  commentCount: number;
  reviewAvgRating: number;
  reviewCount: number;
  saveCount: number;
  likeCount: number;
  tags: { name: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTree extends Category {
  subCategories?: CategoryTree[];
}

export interface ToolSave {
  _id: string;
  userId: string;
  toolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  nickname: string;
  email: string;
  avatarUrl: string;
}

export interface UserBasicInfo {
  _id: string;
  nickname: string;
  avatarUrl: string;
}
