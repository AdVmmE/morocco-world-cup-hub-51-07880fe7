
import { NewsItem } from '../types/news';
import { apiClient } from '../client';

/**
 * News API
 */
export const NewsAPI = {
  // Get all news
  getAll: async (): Promise<NewsItem[]> => {
    return apiClient.get<NewsItem[]>('/news');
  },

  // Get news by ID
  getById: async (id: string): Promise<NewsItem | undefined> => {
    try {
      return await apiClient.get<NewsItem>(`/news/${id}`);
    } catch (error) {
      return undefined;
    }
  },

  // Get news by category
  getByCategory: async (category: string): Promise<NewsItem[]> => {
    return apiClient.get<NewsItem[]>(`/news/category/${encodeURIComponent(category)}`);
  },

  // Search news
  search: async (query: string): Promise<NewsItem[]> => {
    return apiClient.get<NewsItem[]>(`/news/search?q=${encodeURIComponent(query)}`);
  }
};
