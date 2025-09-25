import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SEOHeroSection from './components/SEOHeroSection';
import SEOToolsWidget from './components/SEOToolsWidget';
import AlgorithmUpdateTimeline from './components/AlgorithmUpdateTimeline';
import SEOArticleCard from './components/SEOArticleCard';
import SEOFiltersPanel from './components/SEOFiltersPanel';
import PerformanceTrackingWidget from './components/PerformanceTrackingWidget';

const SEOCategoryPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const articlesPerPage = 12;

  // Mock SEO articles data
  const seoArticles = [
    {
      id: 1,
      title: "Google Core Update септември 2024: Какво трябва да знаете",
      excerpt: "Анализ на най-новата актуализация на Google алгоритъма и нейното влияние върху SEO стратегиите. Практически съвети за адаптиране към промените.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      category: "Алгоритмични актуализации",
      difficulty: "intermediate",
      readTime: 8,
      publishDate: "2024-09-20",
      author: {
        name: "Мария Петрова",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      views: "2.3K",
      comments: 45,
      featured: true
    },
    {
      id: 2,
      title: "Техническо SEO: Пълно ръководство за 2024",
      excerpt: "Всичко, което трябва да знаете за техническото SEO - от Core Web Vitals до структурирани данни и мобилна оптимизация.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "Техническо SEO",
      difficulty: "advanced",
      readTime: 15,
      publishDate: "2024-09-18",
      author: {
        name: "Иван Георгиев",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      views: "4.1K",
      comments: 78
    },
    {
      id: 3,
      title: "Локално SEO за български бизнеси: Стратегии за успех",
      excerpt: "Как да оптимизирате вашия бизнес за локални търсения в България. Google My Business, локални ключови думи и отзиви.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
      category: "Локално SEO",
      difficulty: "beginner",
      readTime: 6,
      publishDate: "2024-09-15",
      author: {
        name: "Елена Димитрова",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      views: "1.8K",
      comments: 32
    },
    {
      id: 4,
      title: "SEO инструменти за 2024: Безплатни и платени решения",
      excerpt: "Преглед на най-добрите SEO инструменти за анализ, проследяване и оптимизация. Сравнение на функционалности и цени.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      category: "SEO инструменти",
      difficulty: "intermediate",
      readTime: 12,
      publishDate: "2024-09-12",
      author: {
        name: "Стефан Николов",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg"
      },
      views: "3.2K",
      comments: 56
    },
    {
      id: 5,
      title: "Link Building стратегии за българския пазар",
      excerpt: "Ефективни техники за изграждане на качествени backlinks. Как да избягвате черните SEO практики и да постигнете устойчиви резултати.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      category: "Link Building",
      difficulty: "advanced",
      readTime: 10,
      publishDate: "2024-09-10",
      author: {
        name: "Ана Стоева",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      views: "2.7K",
      comments: 41
    },
    {
      id: 6,
      title: "Мобилно SEO: Оптимизация за мобилни устройства",
      excerpt: "Как да подготвите вашия сайт за mobile-first индексирането на Google. Core Web Vitals, AMP и прогресивни уеб приложения.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
      category: "Мобилно SEO",
      difficulty: "intermediate",
      readTime: 9,
      publishDate: "2024-09-08",
      author: {
        name: "Мария Петрова",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      views: "1.9K",
      comments: 28
    },
    {
      id: 7,
      title: "E-commerce SEO: Оптимизация на онлайн магазини",
      excerpt: "Специфични SEO техники за електронна търговия. Оптимизация на продуктови страници, категории и структурирани данни.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      category: "E-commerce SEO",
      difficulty: "advanced",
      readTime: 14,
      publishDate: "2024-09-05",
      author: {
        name: "Иван Георгиев",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      views: "3.5K",
      comments: 67
    },
    {
      id: 8,
      title: "Съдържание и SEO: Как да създавате оптимизирани текстове",
      excerpt: "Стратегии за създаване на SEO-оптимизирано съдържание, което ангажира потребителите и се класира високо в търсачките.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
      category: "Съдържание и SEO",
      difficulty: "beginner",
      readTime: 7,
      publishDate: "2024-09-03",
      author: {
        name: "Елена Димитрова",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      views: "2.1K",
      comments: 39
    }
  ];

  const featuredArticle = seoArticles?.find(article => article?.featured) || seoArticles?.[0];
  const regularArticles = seoArticles?.filter(article => !article?.featured);

  // Filter articles based on current filters
  const filteredArticles = regularArticles?.filter(article => {
    if (currentFilters?.search && !article?.title?.toLowerCase()?.includes(currentFilters?.search?.toLowerCase())) {
      return false;
    }
    if (currentFilters?.category && currentFilters?.category !== 'all' && article?.category !== currentFilters?.category) {
      return false;
    }
    if (currentFilters?.difficulty && currentFilters?.difficulty !== 'all' && article?.difficulty !== currentFilters?.difficulty) {
      return false;
    }
    if (currentFilters?.author && currentFilters?.author !== 'all') {
      const authorSlug = article?.author?.name?.toLowerCase()?.replace(/\s+/g, '-');
      if (authorSlug !== currentFilters?.author) {
        return false;
      }
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles?.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles?.slice(startIndex, startIndex + articlesPerPage);

  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>SEO Категория - Linaro News | Стратегии за оптимизация и алгоритмични актуализации</title>
        <meta name="description" content="Открийте най-новите SEO техники, алгоритмични актуализации и практически съвети за подобряване на вашата онлайн видимост в българския и международния пазар." />
        <meta name="keywords" content="SEO България, техническо SEO, локално SEO, Google алгоритъм, SEO инструменти, link building, мобилно SEO" />
        <meta property="og:title" content="SEO Категория - Linaro News" />
        <meta property="og:description" content="Професионални SEO стратегии и актуализации за българския пазар" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://linaronews.bg/seo-category" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <SEOHeroSection />

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SEOFiltersPanel
                onFiltersChange={handleFiltersChange}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
              />
              <SEOToolsWidget />
              <AlgorithmUpdateTimeline />
              <PerformanceTrackingWidget />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Article */}
              {featuredArticle && (
                <div className="mb-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Star" size={20} className="text-yellow-500" />
                    <h2 className="text-xl font-semibold text-foreground">Препоръчана статия</h2>
                  </div>
                  <SEOArticleCard article={featuredArticle} variant="featured" />
                </div>
              )}

              {/* Content Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    SEO Статии {currentFilters?.search && `за "${currentFilters?.search}"`}
                  </h2>
                  <p className="text-text-secondary">
                    {filteredArticles?.length} {filteredArticles?.length === 1 ? 'статия' : 'статии'} намерени
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon name="Grid3X3" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <Icon name="List" size={18} />
                  </button>
                </div>
              </div>

              {/* Articles Grid/List */}
              {paginatedArticles?.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8' : 'space-y-4 mb-8'}>
                  {paginatedArticles?.map((article) => (
                    <SEOArticleCard
                      key={article?.id}
                      article={article}
                      variant={viewMode === 'list' ? 'list' : 'default'}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Няма намерени статии</h3>
                  <p className="text-text-secondary mb-4">
                    Опитайте да промените филтрите или търсачката
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentFilters({});
                      setCurrentPage(1);
                    }}
                  >
                    Изчистете филтрите
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    iconName="ChevronLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Предишна
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary text-primary-foreground'
                              : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    iconName="ChevronRight"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Следваща
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 mb-6">
                <Icon name="Mail" size={16} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">SEO Бюлетин</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
                Получавайте най-новите SEO новини
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Абонирайте се за нашия седмичен бюлетин и бъдете първите, които ще научат за алгоритмичните актуализации, нови техники и SEO тенденции.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Въведете вашия имейл"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold whitespace-nowrap"
                  iconName="Send"
                  iconPosition="right"
                  iconSize={18}
                >
                  Абонирайте се
                </Button>
              </div>
              
              <p className="text-sm text-text-secondary mt-4">
                Без спам. Отписване по всяко време.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyber-green to-ai-blue rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="font-headline font-bold text-xl">Linaro News</span>
              </div>
              <p className="text-text-off-white mb-6">
                Вашият надежден източник за SEO новини и стратегии
              </p>
              <div className="flex items-center justify-center space-x-6">
                <a href="#" className="text-text-off-white hover:text-cyber-green transition-colors">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-text-off-white hover:text-cyber-green transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-text-off-white hover:text-cyber-green transition-colors">
                  <Icon name="Linkedin" size={20} />
                </a>
                <a href="#" className="text-text-off-white hover:text-cyber-green transition-colors">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
              <div className="mt-8 pt-8 border-t border-text-medium-gray">
                <p className="text-text-medium-gray text-sm">
                  © {new Date()?.getFullYear()} Linaro News. Всички права запазени.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SEOCategoryPage;