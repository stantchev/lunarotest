import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import SavedSearches from './components/SavedSearches';
import TrendingSearches from './components/TrendingSearches';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import wordpressAPI from '../../utils/wordpressApi';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';

const SearchAndArchive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    contentType: 'all',
    sortBy: 'newest',
    readingTime: 'all',
    dateRange: { from: '', to: '' },
    tags: [],
    author: '',
    hasImages: false,
    hasVideo: false,
    includeArchived: false
  });
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [wpPosts, setWpPosts] = useState([]);
  
  const { trackEvent } = useGoogleAnalytics();

  // Mock trending searches - can be enhanced with WordPress data
  const trendingSearches = [
    {
      id: 1,
      query: "кибератаки 2024",
      category: "cybersecurity",
      searchCount: 1247,
      resultsCount: 89,
      trend: "up",
      changePercent: 23,
      relatedTopics: ["фишинг", "малуер", "защита"]
    },
    {
      id: 2,
      query: "Google алгоритъм",
      category: "seo",
      searchCount: 892,
      resultsCount: 156,
      trend: "up",
      changePercent: 15,
      relatedTopics: ["ранкиране", "SEO", "оптимизация"]
    },
    {
      id: 3,
      query: "ChatGPT новини",
      category: "ai",
      searchCount: 756,
      resultsCount: 67,
      trend: "down",
      changePercent: -8,
      relatedTopics: ["OpenAI", "AI", "технологии"]
    },
    {
      id: 4,
      query: "ransomware защита",
      category: "cybersecurity",
      searchCount: 634,
      resultsCount: 43,
      trend: "up",
      changePercent: 31,
      relatedTopics: ["превенция", "сигурност", "бизнес"]
    },
    {
      id: 5,
      query: "локално SEO",
      category: "seo",
      searchCount: 523,
      resultsCount: 78,
      trend: "stable",
      changePercent: 2,
      relatedTopics: ["Google Maps", "бизнес", "маркетинг"]
    }
  ];

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('linaro-saved-searches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
    
    const recent = localStorage.getItem('linaro-recent-searches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('linaro-saved-searches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem('linaro-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery?.length > 2) {
      const timer = setTimeout(() => {
        const baseSuggestions = [
          `${searchQuery} анализ`,
          `${searchQuery} новини 2024`,
          `${searchQuery} ръководство`,
          `${searchQuery} тенденции`,
          `${searchQuery} безопасност`
        ];
        setSuggestions(baseSuggestions);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Perform search combining WordPress and mock data
  const performSearch = async (query = searchQuery, searchFilters = filters, page = 1) => {
    setIsLoading(true);
    
    // Track search event
    trackEvent('search', {
      search_term: query,
      category: searchFilters?.category,
      page: page
    });
    
    // Add to recent searches
    if (query && !recentSearches?.includes(query)) {
      setRecentSearches(prev => [query, ...prev?.slice(0, 9)]);
    }

    try {
      let allResults = [];
      
      // Fetch from WordPress API if query exists
      if (query?.trim()) {
        try {
          const wpData = await wordpressAPI?.searchPosts(query, {
            page: page,
            per_page: 5 // Limit WP results to make room for mock data
          });
          
          // Transform WordPress posts to our format
          const transformedWpPosts = wpData?.posts?.map(post => ({
            ...post,
            category: wordpressAPI?.mapCategory(post?.categories),
            contentType: 'article',
            views: Math.floor(Math.random() * 5000) + 100, // Mock view count
            featured: Math.random() > 0.7,
            source: 'WordPress'
          }));
          
          allResults = [...transformedWpPosts];
          setWpPosts(transformedWpPosts);
        } catch (wpError) {
          console.error('WordPress search failed:', wpError);
          // Continue with mock data only
        }
      }

      // Add mock results to supplement WordPress data
      const mockResults = generateMockResults(query, searchFilters);
      allResults = [...allResults, ...mockResults];

      // Apply filters
      let filteredResults = allResults;

      // Apply category filter
      if (searchFilters?.category && searchFilters?.category !== 'all') {
        filteredResults = filteredResults?.filter(article => article?.category === searchFilters?.category);
      }

      // Apply content type filter
      if (searchFilters?.contentType && searchFilters?.contentType !== 'all') {
        filteredResults = filteredResults?.filter(article => article?.contentType === searchFilters?.contentType);
      }

      // Apply reading time filter
      if (searchFilters?.readingTime && searchFilters?.readingTime !== 'all') {
        const [min, max] = searchFilters?.readingTime?.split('-')?.map(Number);
        filteredResults = filteredResults?.filter(article => {
          if (searchFilters?.readingTime === '20+') return article?.readingTime >= 20;
          return article?.readingTime >= min && article?.readingTime <= max;
        });
      }

      // Apply author filter
      if (searchFilters?.author) {
        filteredResults = filteredResults?.filter(article =>
          article?.author?.name?.toLowerCase()?.includes(searchFilters?.author?.toLowerCase())
        );
      }

      // Apply tag filter
      if (searchFilters?.tags && searchFilters?.tags?.length > 0) {
        filteredResults = filteredResults?.filter(article =>
          searchFilters?.tags?.some(tag => article?.tags?.includes(tag))
        );
      }

      // Apply date range filter
      if (searchFilters?.dateRange?.from || searchFilters?.dateRange?.to) {
        filteredResults = filteredResults?.filter(article => {
          const articleDate = new Date(article.publishedAt);
          const fromDate = searchFilters?.dateRange?.from ? new Date(searchFilters.dateRange.from) : null;
          const toDate = searchFilters?.dateRange?.to ? new Date(searchFilters.dateRange.to) : null;
          
          if (fromDate && articleDate < fromDate) return false;
          if (toDate && articleDate > toDate) return false;
          return true;
        });
      }

      // Apply sorting
      switch (searchFilters?.sortBy) {
        case 'oldest':
          filteredResults?.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
          break;
        case 'popular':
          filteredResults?.sort((a, b) => (b?.views || 0) - (a?.views || 0));
          break;
        case 'relevant':
          // WordPress results first (already sorted by relevance), then mock data
          break;
        default: // newest
          filteredResults?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }

      const resultsPerPage = 10;
      const startIndex = (page - 1) * resultsPerPage;
      const paginatedResults = filteredResults?.slice(startIndex, startIndex + resultsPerPage);

      setResults(paginatedResults);
      setTotalResults(filteredResults?.length);
      setTotalPages(Math.ceil(filteredResults?.length / resultsPerPage));
      setCurrentPage(page);
      
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to mock data only
      const mockResults = generateMockResults(query, searchFilters);
      setResults(mockResults);
      setTotalResults(mockResults?.length);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock results for demonstration
  const generateMockResults = (query, searchFilters) => {
    const mockResults = [
      {
        id: 'mock-1',
        title: `${query || 'Нови кибератаки'} заплашават българските банки през 2024`,
        excerpt: "Експертите предупреждават за нарастващи заплахи от фишинг атаки и малуер, насочени специално към финансовия сектор в България.",
        content: "Подробен анализ на най-новите кибератаки...",
        category: "cybersecurity",
        contentType: "analysis",
        author: {
          id: 1,
          name: "Милен Станчев",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&face&facepad=3",
          bio: "Експерт по киберсигурност"
        },
        publishedAt: "2024-09-20T10:30:00Z",
        readingTime: 8,
        views: 2847,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
        tags: [query || "кибератаки", "банки", "фишинг", "малуер"],
        featured: true,
        source: 'Mock Data'
      },
      {
        id: 'mock-2', 
        title: `Google обнови алгоритъма си - ${query || 'SEO анализ'}`,
        excerpt: "Последната актуализация на Google Core Update носи значителни промени в ранкирането на сайтовете.",
        content: "Анализ на промените в Google алгоритъма...",
        category: "seo",
        contentType: "news",
        author: {
          id: 2,
          name: "Мария Георгиева",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          bio: "SEO специалист"
        },
        publishedAt: "2024-09-19T14:15:00Z",
        readingTime: 6,
        views: 1923,
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
        tags: ["Google", "алгоритъм", "SEO", query || "ранкиране"],
        featured: false,
        source: 'Mock Data'
      }
    ];

    return mockResults?.filter(result => 
      !query || 
      result?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
      result?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase()))
    );
  };

  // Initial search
  useEffect(() => {
    performSearch();
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    performSearch(query, filters, 1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters, 1);
  };

  const handleClearFilters = (clearedFilters) => {
    setFilters(clearedFilters);
    setCurrentPage(1);
    performSearch(searchQuery, clearedFilters, 1);
  };

  const handlePageChange = (page) => {
    performSearch(searchQuery, filters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSearch = (searchData) => {
    setSavedSearches(prev => [searchData, ...prev]);
    trackEvent('save_search', { search_term: searchData?.query });
  };

  const handleLoadSearch = (search) => {
    setSearchQuery(search?.query);
    setFilters(search?.filters);
    setCurrentPage(1);
    performSearch(search?.query, search?.filters, 1);
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev?.filter(search => search?.id !== searchId));
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleTrendingSearchClick = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    performSearch(query, filters, 1);
    trackEvent('trending_search_click', { search_term: query });
  };

  return (
    <>
      <Helmet>
        <title>Търсене и Архив - Linaro News | Търсете технологични новини</title>
        <meta 
          name="description" 
          content="Търсете и открийте хиляди експертни статии и анализи за киберсигурност, SEO оптимизация и изкуствен интелект. Интегрирано търсене с WordPress." 
        />
        <meta name="keywords" content="търсене новини, технологичен архив, киберсигурност архив, SEO статии, AI новини, WordPress интеграция" />
        <meta property="og:title" content="Търсене и Архив - Linaro News" />
        <meta property="og:description" content="Мощна търсачка с интеграция към WordPress за технологични новини и експертни анализи." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/search-and-archive" />
        <link rel="canonical" href="https://linaronews.bg/search-and-archive" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-cyber-green/5 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h1 className="font-headline font-bold text-4xl lg:text-5xl text-foreground mb-4">
                  Търсене и Архив
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                  Открийте знания в нашата обширна база от статии за киберсигурност, SEO и изкуствен интелект
                </p>
              </div>

              {/* Search Bar */}
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
                suggestions={suggestions}
                recentSearches={recentSearches}
                onClearRecent={handleClearRecentSearches}
                isLoading={isLoading}
              />

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">{totalResults + 1200}</div>
                  <div className="text-sm text-text-secondary">Общо статии</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <div className="text-sm text-text-secondary">Автори</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{wpPosts?.length + 89}</div>
                  <div className="text-sm text-text-secondary">WordPress статии</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-text-secondary">Актуализации</div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Search Filters */}
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                    isExpanded={isFiltersExpanded}
                    onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
                  />

                  {/* Saved Searches */}
                  <SavedSearches
                    savedSearches={savedSearches}
                    onLoadSearch={handleLoadSearch}
                    onSaveSearch={handleSaveSearch}
                    onDeleteSearch={handleDeleteSearch}
                    currentFilters={filters}
                    searchQuery={searchQuery}
                  />

                  {/* Trending Searches */}
                  <TrendingSearches
                    trendingSearches={trendingSearches}
                    onSearchClick={handleTrendingSearchClick}
                  />
                </div>

                {/* Results */}
                <div className="lg:col-span-3">
                  <SearchResults
                    results={results}
                    totalResults={totalResults}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                    searchQuery={searchQuery}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Search Tips */}
          <section className="py-12 bg-muted/30">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="font-headline font-bold text-2xl text-foreground mb-4">
                  Съвети за търсене
                </h2>
                <p className="text-text-secondary">
                  Използвайте тези техники за по-точни резултати
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="Quote" size={20} className="text-primary" />
                    <h3 className="font-cta font-semibold text-foreground">Точна фраза</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    Използвайте кавички за търсене на точна фраза
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    "кибератаки България"
                  </code>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="Plus" size={20} className="text-success" />
                    <h3 className="font-cta font-semibold text-foreground">Задължителни думи</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    Добавете + пред думи, които трябва да присъстват
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    SEO +Google +алгоритъм
                  </code>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name="Minus" size={20} className="text-destructive" />
                    <h3 className="font-cta font-semibold text-foreground">Изключване</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    Използвайте - за изключване на думи
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    AI -ChatGPT
                  </code>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  iconName="HelpCircle"
                  iconPosition="left"
                >
                  Още съвети за търсене
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SearchAndArchive;