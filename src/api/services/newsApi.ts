
import { NewsItem } from '../types/news';
import { mockNews } from '../mockData/news';

/**
 * News API
 */
export const NewsAPI = {
  // Get all news
  getAll: async (): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews;
  },

  // Get news by ID
  getById: async (id: string): Promise<NewsItem | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.find((news) => news.id === id);
  },

  // Get news by category
  getByCategory: async (category: string): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.filter((news) => news.category === category);
  },

  // Search news
  search: async (query: string): Promise<NewsItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockNews.filter((news) => {
      return news.title.toLowerCase().includes(query.toLowerCase()) || 
             news.summary.toLowerCase().includes(query.toLowerCase()) ||
             news.content.toLowerCase().includes(query.toLowerCase());
    });
  }
};
