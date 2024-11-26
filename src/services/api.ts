import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_HOST || "https://api.aicenter.tw";

// 定義工具資料的介面
export interface Tool {
  _id: string;
  title: string;
  imageUrl: string;
  overview: string;
  content: string;
  url: string;
  categoryIds: number[];
  mainCategoryId: number;
  isAd: boolean;
  commentCount: number;
  reviewAvgRating: number;
  reviewCount: number;
  favCount: number;
  likeCount: number;
  tags: { name: string }[];
  createdAt: string;
  updatedAt: string;
}

// API 服務類
export const toolsApi = {
  // 獲取所有工具
  getAllTools: async (): Promise<Tool[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tool`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tools:", error);
      throw error;
    }
  },

  // 獲取單個工具詳情
  getToolById: async (id: string): Promise<Tool> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tool/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tool details:", error);
      throw error;
    }
  },
};
