import axios from 'axios';

const WORDPRESS_API_BASE = 'https://lunaro.sofia-today.org/wp-json/wp/v2';

class WordPressAPI {
  constructor() {
    this.api = axios?.create({
      baseURL: WORDPRESS_API_BASE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Request interceptor for logging
    this.api?.interceptors?.request?.use(
      (config) => {
        if (import.meta.env?.MODE === 'development') {
          console.log('WordPress API Request:', config?.url, config?.params);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api?.interceptors?.response?.use(
      (response) => response,
      (error) => {
        console.error('WordPress API Error:', error?.response?.data || error?.message);
        return Promise.reject(error);
      }
    );
  }

  // Get all posts with optional filters
  async getPosts(params = {}) {
    try {
      const defaultParams = {
        per_page: 10,
        page: 1,
        _embed: true, // Include featured images and author info
        orderby: 'date',
        order: 'desc'
      };

      const response = await this.api?.get('/posts', {
        params: { ...defaultParams, ...params }
      });

      return {
        posts: this.transformPosts(response?.data),
        totalPages: parseInt(response?.headers?.['x-wp-totalpages']) || 1,
        totalPosts: parseInt(response?.headers?.['x-wp-total']) || 0,
      };
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

  // Get a single post by ID or slug
  async getPost(identifier, bySlug = false) {
    try {
      const endpoint = bySlug ? `/posts?slug=${identifier}&_embed=true` : `/posts/${identifier}?_embed=true`;
      const response = await this.api?.get(endpoint);
      
      const post = bySlug ? response?.data?.[0] : response?.data;
      if (!post) {
        throw new Error('Post not found');
      }

      return this.transformPost(post);
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  // Search posts
  async searchPosts(query, params = {}) {
    try {
      const searchParams = {
        search: query,
        per_page: 10,
        page: 1,
        _embed: true,
        orderby: 'relevance',
        ...params
      };

      const response = await this.api?.get('/posts', {
        params: searchParams
      });

      return {
        posts: this.transformPosts(response?.data),
        totalPages: parseInt(response?.headers?.['x-wp-totalpages']) || 1,
        totalPosts: parseInt(response?.headers?.['x-wp-total']) || 0,
        query
      };
    } catch (error) {
      throw new Error(`Failed to search posts: ${error.message}`);
    }
  }

  // Get posts by category
  async getPostsByCategory(categoryId, params = {}) {
    return this.getPosts({
      categories: categoryId,
      ...params
    });
  }

  // Get categories
  async getCategories() {
    try {
      const response = await this.api?.get('/categories', {
        params: { per_page: 100 }
      });
      
      return response?.data?.map(category => ({
        id: category?.id,
        name: category?.name,
        slug: category?.slug,
        count: category?.count,
        description: category?.description
      }));
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  // Get tags
  async getTags() {
    try {
      const response = await this.api?.get('/tags', {
        params: { per_page: 100 }
      });
      
      return response?.data?.map(tag => ({
        id: tag?.id,
        name: tag?.name,
        slug: tag?.slug,
        count: tag?.count
      }));
    } catch (error) {
      throw new Error(`Failed to fetch tags: ${error.message}`);
    }
  }

  // Transform WordPress post to our format
  transformPost(wpPost) {
    const featuredImage = wpPost?._embedded?.['wp:featuredmedia']?.[0];
    const author = wpPost?._embedded?.author?.[0];
    const categories = wpPost?._embedded?.['wp:term']?.[0] || [];
    const tags = wpPost?._embedded?.['wp:term']?.[1] || [];

    return {
      id: wpPost?.id,
      title: this.decodeHtml(wpPost?.title?.rendered),
      slug: wpPost?.slug,
      excerpt: this.decodeHtml(this.stripHtml(wpPost?.excerpt?.rendered)),
      content: wpPost?.content?.rendered,
      publishedAt: wpPost?.date,
      modifiedAt: wpPost?.modified,
      status: wpPost?.status,
      image: featuredImage?.media_details?.sizes?.large?.source_url || 
             featuredImage?.source_url || 
             'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: {
        id: author?.id || 1,
        name: author?.name || 'Милен Станчев',
        avatar: author?.avatar_urls?.['96'] || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&face&facepad=3',
        bio: author?.description || 'Експерт по киберсигурност, SEO и AI'
      },
      categories: categories?.map(cat => ({
        id: cat?.id,
        name: cat?.name,
        slug: cat?.slug
      })),
      tags: tags?.map(tag => tag?.name),
      link: wpPost?.link,
      readingTime: this.calculateReadingTime(wpPost?.content?.rendered),
      wordCount: this.countWords(wpPost?.content?.rendered)
    };
  }

  // Transform multiple posts
  transformPosts(wpPosts) {
    return wpPosts?.map(post => this.transformPost(post));
  }

  // Helper methods
  stripHtml(html) {
    return html?.replace(/<[^>]*>/g, '')?.trim();
  }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  }

  calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = this.countWords(content);
    return Math.ceil(wordCount / wordsPerMinute);
  }

  countWords(content) {
    const text = this.stripHtml(content);
    return text?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
  }

  // Map WordPress categories to our system
  mapCategory(wpCategories) {
    const categoryMap = {
      'cybersecurity': 'cybersecurity',
      'security': 'cybersecurity',
      'киберсигурност': 'cybersecurity',
      'seo': 'seo',
      'marketing': 'seo',
      'маркетинг': 'seo',
      'ai': 'ai',
      'artificial-intelligence': 'ai',
      'изкуствен-интелект': 'ai',
      'technology': 'tech-news',
      'технологии': 'tech-news'
    };

    for (const wpCat of wpCategories) {
      const mapped = categoryMap?.[wpCat?.slug?.toLowerCase()];
      if (mapped) return mapped;
    }

    return 'tech-news'; // default category
  }
}

// Create singleton instance
const wordpressAPI = new WordPressAPI();

export default wordpressAPI;

// Named exports for specific functions
export const {
  getPosts,
  getPost,
  searchPosts,
  getPostsByCategory,
  getCategories,
  getTags
} = wordpressAPI;