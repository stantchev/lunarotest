import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, Grid, List, TrendingUp, Clock, Hash, X, ChevronDown, ChevronUp, Eye, Bookmark, Heart, Share2 } from 'lucide-react';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import wordpressAPI from '../../utils/wordpressApi';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

const EnhancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    contentType: 'all',
    sortBy: 'relevance',
    readingTime: 'all',
    dateRange: { from: '', to: '' },
    tags: [],
    author: '',
    hasImages: false,
    hasVideo: false,
    includeArchived: false,
    language: 'all'
  });
  
  // Results and pagination
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // UI state
  const [viewMode, setViewMode] = useState('list');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Search enhancements
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchPerformance, setSearchPerformance] = useState(null);
  
  // WordPress data
  const [wpPosts, setWpPosts] = useState([]);
  const [wpCategories, setWpCategories] = useState([]);
  const [wpTags, setWpTags] = useState([]);
  const [realtimeResults, setRealtimeResults] = useState([]);
  
  const { trackEvent } = useGoogleAnalytics();

  // Load initial data and saved state
  useEffect(() => {
    loadInitialData();
    loadSavedData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load WordPress categories and tags
      const [categories, tags] = await Promise.all([
        wordpressAPI?.getCategories(),
        wordpressAPI?.getTags()
      ]);
      setWpCategories(categories);
      setWpTags(tags?.slice(0, 50)); // Limit tags for performance
      
      // Perform initial search
      performSearch();
    } catch (error) {
      console.error('Failed to load initial data:', error);
      performSearch(); // Fallback to mock data
    }
  };

  const loadSavedData = () => {
    try {
      const savedHistory = localStorage.getItem('linaro-search-history');
      const savedSearchesList = localStorage.getItem('linaro-saved-searches');
      
      if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
      if (savedSearchesList) setSavedSearches(JSON.parse(savedSearchesList));
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  };

  // Real-time search suggestions
  useEffect(() => {
    if (searchQuery?.length >= 2) {
      const timer = setTimeout(() => {
        generateSuggestions(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const generateSuggestions = async (query) => {
    try {
      const baseSuggestions = [
        `${query} анализ`,
        `${query} новини 2024`,
        `${query} ръководство`,
        `${query} безопасност`,
        `${query} тенденции`,
        `как работи ${query}`,
        `${query} България`
      ];

      // Add WordPress-based suggestions if available
      let enhancedSuggestions = [...baseSuggestions];
      
      if (wpTags?.length > 0) {
        const matchingTags = wpTags
          ?.filter(tag => tag?.name?.toLowerCase()?.includes(query?.toLowerCase()))
          ?.slice(0, 3)
          ?.map(tag => tag?.name);
        enhancedSuggestions = [...enhancedSuggestions, ...matchingTags];
      }

      setSuggestions(enhancedSuggestions?.slice(0, 8));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    }
  };

  // Advanced WordPress integration with real-time search
  const performSearch = async (query = searchQuery, searchFilters = filters, page = 1, append = false) => {
    if (!append) setIsLoading(true);
    else setLoadingMore(true);
    
    const startTime = performance.now();

    try {
      trackEvent('search_performed', {
        search_term: query,
        category: searchFilters?.category,
        sort_by: searchFilters?.sortBy,
        page: page
      });

      let allResults = [];
      let wpResults = [];

      // WordPress API search with enhanced parameters
      if (query?.trim()) {
        try {
          const searchParams = {
            page: page,
            per_page: 8, // Balance between WP and mock data
            orderby: searchFilters?.sortBy === 'relevance' ? 'relevance' : 'date',
            order: searchFilters?.sortBy === 'oldest' ? 'asc' : 'desc'
          };

          // Add category filter for WordPress
          if (searchFilters?.category && searchFilters?.category !== 'all') {
            const wpCategory = wpCategories?.find(cat => 
              cat?.slug?.includes(searchFilters?.category) || 
              searchFilters?.category?.includes(cat?.slug)
            );
            if (wpCategory) {
              searchParams.categories = wpCategory?.id;
            }
          }

          const wpData = await wordpressAPI?.searchPosts(query, searchParams);
          
          wpResults = wpData?.posts?.map(post => ({
            ...post,
            category: wordpressAPI?.mapCategory(post?.categories || []),
            contentType: 'article',
            views: Math.floor(Math.random() * 10000) + 500,
            featured: Math.random() > 0.6,
            source: 'WordPress',
            likes: Math.floor(Math.random() * 200) + 10,
            saves: Math.floor(Math.random() * 50) + 5,
            shares: Math.floor(Math.random() * 30) + 2
          }));

          allResults = [...wpResults];
          if (page === 1) setWpPosts(wpResults);
        } catch (wpError) {
          console.error('WordPress search failed:', wpError);
        }
      }

      // Supplement with enhanced mock data
      const mockResults = generateEnhancedMockResults(query, searchFilters, page);
      allResults = [...allResults, ...mockResults];

      // Apply advanced filtering
      let filteredResults = applyAdvancedFilters(allResults, searchFilters);

      // Apply sorting
      filteredResults = applySorting(filteredResults, searchFilters?.sortBy);

      // Pagination
      const resultsPerPage = 12;
      const startIndex = (page - 1) * resultsPerPage;
      
      let finalResults;
      if (append) {
        finalResults = [...results, ...filteredResults?.slice(startIndex, startIndex + resultsPerPage)];
      } else {
        finalResults = filteredResults?.slice(startIndex, startIndex + resultsPerPage);
      }

      setResults(finalResults);
      setTotalResults(filteredResults?.length);
      setTotalPages(Math.ceil(filteredResults?.length / resultsPerPage));
      setCurrentPage(page);

      // Track performance
      const endTime = performance.now();
      setSearchPerformance({
        duration: Math.round(endTime - startTime),
        resultsCount: filteredResults?.length,
        wpResultsCount: wpResults?.length,
        query: query
      });

      // Update search history
      if (query && !searchHistory?.includes(query)) {
        const newHistory = [query, ...searchHistory?.slice(0, 9)];
        setSearchHistory(newHistory);
        localStorage.setItem('linaro-search-history', JSON.stringify(newHistory));
      }

    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to mock data
      const mockResults = generateEnhancedMockResults(query, searchFilters, page);
      setResults(mockResults);
      setTotalResults(mockResults?.length);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  // Enhanced mock data generation
  const generateEnhancedMockResults = (query, searchFilters, page) => {
    const mockArticles = [
      {
        id: `mock-${page}-1`,
        title: `${query || 'Кибератаки'} срещу Bulgarian Tech сектора - Експертен анализ`,
        slug: `${query || 'cyber-attacks'}-bulgarian-tech-analysis`,
        excerpt: "Задълбочен анализ на най-новите кибер заплахи, които засягат българския технологичен сектор, с практически препоръки за защита.",
        content: "Пълно съдържание на статията...",
        category: "cybersecurity",
        contentType: "analysis",
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)?.toISOString(),
        modifiedAt: new Date()?.toISOString(),
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
        author: {
          id: 1,
          name: "Милен Станчев",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&face&facepad=3",
          bio: "Експерт по киберсигурност с 15+ години опит"
        },
        readingTime: 12,
        wordCount: 2400,
        views: 3847,
        likes: 156,
        saves: 89,
        shares: 45,
        tags: [query || "кибератаки", "България", "технологии", "анализ"],
        featured: page === 1,
        source: 'Mock Data',
        status: 'published'
      },
      {
        id: `mock-${page}-2`,
        title: `Google алгоритъм промени 2024: Влияние върху ${query || 'SEO стратегиите'}`,
        slug: `google-algorithm-${query || 'seo'}-strategies-2024`,
        excerpt: "Последните промени в Google алгоритъма и тяхното въздействие върху SEO оптимизацията и ранкирането на сайтове.",
        content: "Пълно съдържание на статията...",
        category: "seo",
        contentType: "guide",
        publishedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000)?.toISOString(),
        modifiedAt: new Date()?.toISOString(),
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
        author: {
          id: 2,
          name: "Мария Георгиева",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          bio: "SEO консултант и дигитален маркетинг експерт"
        },
        readingTime: 8,
        wordCount: 1600,
        views: 2156,
        likes: 94,
        saves: 67,
        shares: 23,
        tags: ["Google", "алгоритъм", "SEO", query || "оптимизация"],
        featured: false,
        source: 'Mock Data',
        status: 'published'
      },
      {
        id: `mock-${page}-3`,
        title: `AI революцията в ${query || 'българския бизнес'} - тенденции и възможности`,
        slug: `ai-revolution-${query || 'bulgarian-business'}-trends`,
        excerpt: "Как изкуствен интелект преобразува българския бизнес ландшафт и какви възможности открива за иновации.",
        content: "Пълно съдържание на статията...",
        category: "ai",
        contentType: "news",
        publishedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000)?.toISOString(),
        modifiedAt: new Date()?.toISOString(),
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        author: {
          id: 3,
          name: "Иван Петров",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          bio: "AI изследовател и технологичен консултант"
        },
        readingTime: 10,
        wordCount: 2000,
        views: 4231,
        likes: 203,
        saves: 145,
        shares: 67,
        tags: ["AI", "изкуствен интелект", query || "бизнес", "иновации"],
        featured: Math.random() > 0.5,
        source: 'Mock Data',
        status: 'published'
      }
    ];

    return mockArticles?.filter(article => {
      if (!query) return true;
      return article?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
             article?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase())) ||
             article?.excerpt?.toLowerCase()?.includes(query?.toLowerCase());
    });
  };

  // Advanced filtering system
  const applyAdvancedFilters = (results, filters) => {
    let filtered = [...results];

    // Category filter
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter(item => item?.category === filters?.category);
    }

    // Content type filter
    if (filters?.contentType && filters?.contentType !== 'all') {
      filtered = filtered?.filter(item => item?.contentType === filters?.contentType);
    }

    // Reading time filter
    if (filters?.readingTime && filters?.readingTime !== 'all') {
      if (filters?.readingTime === '1-5') {
        filtered = filtered?.filter(item => item?.readingTime >= 1 && item?.readingTime <= 5);
      } else if (filters?.readingTime === '6-10') {
        filtered = filtered?.filter(item => item?.readingTime >= 6 && item?.readingTime <= 10);
      } else if (filters?.readingTime === '11-15') {
        filtered = filtered?.filter(item => item?.readingTime >= 11 && item?.readingTime <= 15);
      } else if (filters?.readingTime === '15+') {
        filtered = filtered?.filter(item => item?.readingTime > 15);
      }
    }

    // Author filter
    if (filters?.author) {
      filtered = filtered?.filter(item => 
        item?.author?.name?.toLowerCase()?.includes(filters?.author?.toLowerCase())
      );
    }

    // Tags filter
    if (filters?.tags?.length > 0) {
      filtered = filtered?.filter(item =>
        filters?.tags?.some(tag => 
          item?.tags?.some(itemTag => 
            itemTag?.toLowerCase()?.includes(tag?.toLowerCase())
          )
        )
      );
    }

    // Date range filter
    if (filters?.dateRange?.from || filters?.dateRange?.to) {
      filtered = filtered?.filter(item => {
        const itemDate = new Date(item?.publishedAt);
        const fromDate = filters?.dateRange?.from ? new Date(filters?.dateRange?.from) : null;
        const toDate = filters?.dateRange?.to ? new Date(filters?.dateRange?.to) : null;
        
        if (fromDate && itemDate < fromDate) return false;
        if (toDate && itemDate > toDate) return false;
        return true;
      });
    }

    // Media filters
    if (filters?.hasImages) {
      filtered = filtered?.filter(item => item?.image);
    }

    return filtered;
  };

  // Advanced sorting system
  const applySorting = (results, sortBy) => {
    const sorted = [...results];

    switch (sortBy) {
      case 'newest':
        return sorted?.sort((a, b) => new Date(b?.publishedAt) - new Date(a?.publishedAt));
      case 'oldest':
        return sorted?.sort((a, b) => new Date(a?.publishedAt) - new Date(b?.publishedAt));
      case 'popular':
        return sorted?.sort((a, b) => (b?.views || 0) - (a?.views || 0));
      case 'trending':
        return sorted?.sort((a, b) => (b?.likes || 0) - (a?.likes || 0));
      case 'reading-time-asc':
        return sorted?.sort((a, b) => (a?.readingTime || 0) - (b?.readingTime || 0));
      case 'reading-time-desc':
        return sorted?.sort((a, b) => (b?.readingTime || 0) - (a?.readingTime || 0));
      case 'relevance':
      default:
        // WordPress results first (already sorted by relevance), then by date
        return sorted?.sort((a, b) => {
          if (a?.source === 'WordPress' && b?.source !== 'WordPress') return -1;
          if (a?.source !== 'WordPress' && b?.source === 'WordPress') return 1;
          return new Date(b?.publishedAt) - new Date(a?.publishedAt);
        });
    }
  };

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    performSearch(query, filters, 1);
    setShowSuggestions(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters, 1);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: 'all',
      contentType: 'all',
      sortBy: 'relevance',
      readingTime: 'all',
      dateRange: { from: '', to: '' },
      tags: [],
      author: '',
      hasImages: false,
      hasVideo: false,
      includeArchived: false,
      language: 'all'
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    performSearch(searchQuery, clearedFilters, 1);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      performSearch(searchQuery, filters, currentPage + 1, true);
    }
  };

  const handleSaveSearch = () => {
    const searchData = {
      id: Date.now()?.toString(),
      query: searchQuery,
      filters: filters,
      timestamp: new Date()?.toISOString(),
      resultCount: totalResults
    };
    
    const newSavedSearches = [searchData, ...savedSearches?.slice(0, 9)];
    setSavedSearches(newSavedSearches);
    localStorage.setItem('linaro-saved-searches', JSON.stringify(newSavedSearches));
    
    trackEvent('save_search', { search_term: searchQuery });
  };

  const handleArticleClick = (article) => {
    trackEvent('search_result_click', {
      article_id: article?.id,
      article_title: article?.title,
      search_term: searchQuery,
      result_position: results?.indexOf(article) + 1
    });
  };

  // Render functions
  const renderSearchBar = () => (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onKeyPress={(e) => e?.key === 'Enter' && handleSearch(searchQuery)}
          placeholder="Търсете статии, новини, анализи... (напр. 'кибератаки България 2024')"
          className="w-full px-6 py-4 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary focus:outline-none pr-14 shadow-lg transition-all duration-200"
        />
        <Button
          onClick={() => handleSearch(searchQuery)}
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
        >
          <Search className="w-5 h-5 text-primary" />
        </Button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-center space-x-3 border-b border-border/50 last:border-b-0"
            >
              <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Quick filters */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {['cybersecurity', 'seo', 'ai']?.map(category => (
          <button
            key={category}
            onClick={() => handleFilterChange({ ...filters, category })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filters?.category === category 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {category === 'cybersecurity' ? 'Киберсигурност' : 
             category === 'seo' ? 'SEO' : 'AI'}
          </button>
        ))}
      </div>
    </div>
  );

  const renderAdvancedFilters = () => (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline font-semibold text-lg text-foreground flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Разширени филтри
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        >
          {isFiltersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {isFiltersExpanded && (
        <div className="space-y-6">
          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Категория</label>
              <select
                value={filters?.category}
                onChange={(e) => handleFilterChange({ ...filters, category: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
              >
                <option value="all">Всички категории</option>
                <option value="cybersecurity">Киберсигурност</option>
                <option value="seo">SEO</option>
                <option value="ai">Изкуствен интелект</option>
              </select>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Тип съдържание</label>
              <select
                value={filters?.contentType}
                onChange={(e) => handleFilterChange({ ...filters, contentType: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
              >
                <option value="all">Всички типове</option>
                <option value="article">Статии</option>
                <option value="news">Новини</option>
                <option value="guide">Ръководства</option>
                <option value="analysis">Анализи</option>
              </select>
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Време за четене</label>
              <select
                value={filters?.readingTime}
                onChange={(e) => handleFilterChange({ ...filters, readingTime: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
              >
                <option value="all">Всички</option>
                <option value="1-5">1-5 минути</option>
                <option value="6-10">6-10 минути</option>
                <option value="11-15">11-15 минути</option>
                <option value="15+">Над 15 минути</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Сортиране</label>
              <select
                value={filters?.sortBy}
                onChange={(e) => handleFilterChange({ ...filters, sortBy: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
              >
                <option value="relevance">По релевантност</option>
                <option value="newest">Най-нови първо</option>
                <option value="oldest">Най-стари първо</option>
                <option value="popular">Най-четени</option>
                <option value="trending">Най-харесвани</option>
                <option value="reading-time-asc">Кратко четене първо</option>
                <option value="reading-time-desc">Дълго четене първо</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Автор</label>
              <input
                type="text"
                value={filters?.author}
                onChange={(e) => handleFilterChange({ ...filters, author: e?.target?.value })}
                placeholder="Име на автор..."
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Дата на публикуване</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters?.dateRange?.from}
                  onChange={(e) => handleFilterChange({ 
                    ...filters, 
                    dateRange: { ...filters?.dateRange, from: e?.target?.value }
                  })}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
                />
                <input
                  type="date"
                  value={filters?.dateRange?.to}
                  onChange={(e) => handleFilterChange({ 
                    ...filters, 
                    dateRange: { ...filters?.dateRange, to: e?.target?.value }
                  })}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-foreground mb-3">Допълнителни опции</h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.hasImages}
                  onChange={(e) => handleFilterChange({ ...filters, hasImages: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Със снимки</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.hasVideo}
                  onChange={(e) => handleFilterChange({ ...filters, hasVideo: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">С видео</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.includeArchived}
                  onChange={(e) => handleFilterChange({ ...filters, includeArchived: e?.target?.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Включи архивирани</span>
              </label>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              size="sm"
            >
              Изчисти филтри
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleSaveSearch}
                iconName="Bookmark"
                iconPosition="left"
                size="sm"
              >
                Запази търсене
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="font-headline font-semibold text-xl text-foreground">
            Резултати {searchQuery && `за "${searchQuery}"`}
          </h2>
          <span className="text-text-secondary">
            ({totalResults} {totalResults === 1 ? 'резултат' : 'резултата'})
          </span>
          {searchPerformance && (
            <span className="text-sm text-text-secondary bg-muted px-2 py-1 rounded">
              {searchPerformance?.duration}ms
            </span>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid/List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <span className="ml-3 text-text-secondary">Търсене...</span>
        </div>
      ) : (
        <>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6': 'space-y-6'
          }>
            {results?.map((article) => (
              <div
                key={article?.id}
                onClick={() => handleArticleClick(article)}
                className={`bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-200 cursor-pointer group ${
                  viewMode === 'list' ? 'flex' : 'flex flex-col'
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[16/9]'
                }`}>
                  <img
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article?.featured && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Препоръчано
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{article?.readingTime} мин</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div>
                    {/* Meta */}
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article?.category === 'cybersecurity' ? 'bg-red-100 text-red-700' :
                        article?.category === 'seo'? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {article?.category === 'cybersecurity' ? 'Киберсигурност' :
                         article?.category === 'seo' ? 'SEO' : 'AI'}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {new Date(article?.publishedAt)?.toLocaleDateString('bg-BG')}
                      </span>
                      {article?.source === 'WordPress' && (
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                          WordPress
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-headline font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article?.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                      {article?.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <img
                        src={article?.author?.avatar}
                        alt={article?.author?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-foreground font-medium">
                        {article?.author?.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article?.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{article?.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-3 h-3" />
                        <span>{article?.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {currentPage < totalPages && (
            <div className="text-center pt-8">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                size="lg"
                variant="outline"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                    Зарежда се...
                  </>
                ) : (
                  'Зареди още резултати'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderSidebar = () => (
    <div className="space-y-6">
      {/* Search History */}
      {searchHistory?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-headline font-semibold text-lg text-foreground mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Последни търсения
          </h3>
          <div className="space-y-2">
            {searchHistory?.slice(0, 5)?.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSearch(query)}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-headline font-semibold text-lg text-foreground mb-4 flex items-center">
            <Bookmark className="w-5 h-5 mr-2" />
            Запазени търсения
          </h3>
          <div className="space-y-3">
            {savedSearches?.slice(0, 3)?.map((search) => (
              <div
                key={search?.id}
                className="p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSearch(search?.query)}
              >
                <div className="font-medium text-sm text-foreground mb-1">
                  {search?.query}
                </div>
                <div className="text-xs text-text-secondary">
                  {search?.resultCount} резултата • {new Date(search?.timestamp)?.toLocaleDateString('bg-BG')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WordPress Categories */}
      {wpCategories?.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-headline font-semibold text-lg text-foreground mb-4 flex items-center">
            <Hash className="w-5 h-5 mr-2" />
            WordPress категории
          </h3>
          <div className="space-y-2">
            {wpCategories?.slice(0, 8)?.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleFilterChange({ ...filters, category: category?.slug })}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{category?.name}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Разширено търсене - Linaro News | WordPress интеграция за технологични новини</title>
        <meta 
          name="description" 
          content="Мощна търсачка с WordPress интеграция за технологични новини. Търсете и филтрирайте статии за киберсигурност, SEO и AI с разширени опции и real-time резултати." 
        />
        <meta name="keywords" content="търсене новини, WordPress интеграция, технологичен архив, киберсигурност статии, SEO ръководства, AI анализи, българска технологична медия" />
        <meta property="og:title" content="Разширено търсене - Linaro News" />
        <meta property="og:description" content="Открийте експертни технологични статии с нашата разширена търсачка с WordPress интеграция и интелигентни филтри." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/enhanced-search" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop" />
        <link rel="canonical" href="https://linaronews.bg/enhanced-search" />
        
        {/* WordPress API Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Linaro News Enhanced Search",
            "url": "https://linaronews.bg/enhanced-search",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://linaronews.bg/enhanced-search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "provider": {
              "@type": "Organization",
              "name": "Linaro News",
              "url": "https://linaronews.bg"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with Enhanced Search */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-cyber-green/5 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h1 className="font-headline font-bold text-4xl lg:text-6xl text-foreground mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text">
                  Разширено търсене
                </h1>
                <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
                  Открийте знания с нашата интелигентна търсачка. 
                  Интеграция с <span className="font-semibold text-primary">WordPress</span>, 
                  real-time резултати и разширени филтри за технологични новини
                </p>
              </div>

              {renderSearchBar()}

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-foreground">{totalResults + (wpPosts?.length || 0) + 1200}</div>
                  <div className="text-sm text-text-secondary">Общо статии</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-foreground">{wpCategories?.length + 15}</div>
                  <div className="text-sm text-text-secondary">Категории</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-foreground">{wpPosts?.length}</div>
                  <div className="text-sm text-text-secondary">WordPress статии</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-text-secondary">Real-time обновления</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                  {renderSidebar()}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 order-1 lg:order-2 space-y-6">
                  {renderAdvancedFilters()}
                  {renderResults()}
                </div>
              </div>
            </div>
          </section>

          {/* Search Tips Section */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="font-headline font-bold text-3xl text-foreground mb-8">
                Съвети за по-добро търсене
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-cta font-semibold text-lg text-foreground mb-2">Българска кирилица</h3>
                  <p className="text-text-secondary text-sm">
                    Търсачката поддържа пълно търсене на кирилица и автоматично предлага подобни термини
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-cta font-semibold text-lg text-foreground mb-2">WordPress интеграция</h3>
                  <p className="text-text-secondary text-sm">
                    Real-time синхронизация с WordPress API за най-актуални резултати от lunaro.sofia-today.org
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-cta font-semibold text-lg text-foreground mb-2">Разширени филтри</h3>
                  <p className="text-text-secondary text-sm">
                    Филтрирайте по категория, автор, дата, време за четене и много други критерии
                  </p>
                </div>
              </div>

              <div className="bg-card border-2 border-dashed border-primary/30 rounded-xl p-8">
                <h3 className="font-headline font-semibold text-xl text-foreground mb-4">
                  Примери за търсене
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    'кибератаки България 2024',
                    'Google алгоритъм промени',
                    'AI тенденции бизнес',
                    'SEO оптимизация ръководство',
                    'ransomware защита',
                    'ChatGPT новини'
                  ]?.map(example => (
                    <button
                      key={example}
                      onClick={() => handleSearch(example)}
                      className="px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default EnhancedSearch;