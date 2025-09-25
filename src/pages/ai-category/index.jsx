import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIHeroSection from './components/AIHeroSection';
import AIFilterBar from './components/AIFilterBar';
import AIArticleGrid from './components/AIArticleGrid';
import AIToolsShowcase from './components/AIToolsShowcase';
import AITrendAnalysis from './components/AITrendAnalysis';
import AINewsletterSection from './components/AINewsletterSection';

const AICategoryPage = () => {
  const [filters, setFilters] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for filtered articles
  const mockFilteredArticles = [
    {
      id: 1,
      title: "Как ChatGPT променя българския бизнес: Реални случаи и ROI анализ",
      excerpt: "Детайлен анализ на внедряването на ChatGPT в български компании и измерими резултати от използването на AI технологии.",
      author: "Инж. Петър Димитров",
      publishDate: "23 септември 2024",
      readTime: "12 мин",
      category: "Business AI",
      difficulty: "intermediate",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tags: ["ChatGPT", "ROI", "Бизнес", "България"],
      hasDemo: true,
      hasCode: false,
      views: 2847,
      likes: 156,
      comments: 23
    },
    {
      id: 2,
      title: "Нови алгоритми за компютърно зрение: Breakthrough в медицинската диагностика",
      excerpt: "Революционни развития в областта на компютърното зрение, които променят начина, по който се извършва медицинска диагностика.",
      author: "Проф. д-р Мария Стоянова",
      publishDate: "22 септември 2024",
      readTime: "15 мин",
      category: "Computer Vision",
      difficulty: "advanced",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      tags: ["Computer Vision", "Медицина", "Алгоритми", "Диагностика"],
      hasDemo: false,
      hasCode: true,
      views: 1923,
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      title: "Етичните предизвикателства на AI: Как да балансираме иновациите и отговорността",
      excerpt: "Задълбочен поглед върху етичните въпроси, свързани с развитието на изкуствения интелект и необходимостта от отговорно внедряване.",
      author: "Д-р София Николова",
      publishDate: "21 септември 2024",
      readTime: "10 мин",
      category: "AI Ethics",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
      tags: ["AI етика", "Отговорност", "Иновации", "Общество"],
      hasDemo: false,
      hasCode: false,
      views: 3156,
      likes: 234,
      comments: 45
    }
  ];

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    
    // Simulate API call with filtering
    setTimeout(() => {
      // In a real app, this would filter based on the actual filters
      setArticles(mockFilteredArticles);
      setLoading(false);
    }, 1000);
  };

  // Load initial articles
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setArticles(mockFilteredArticles);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Категория - Изкуствен интелект новини и анализи | Linaro News</title>
        <meta 
          name="description" 
          content="Последните развития в изкуствения интелект, машинното обучение и AI технологиите. Експертни анализи, практически ръководства и прогнози за бъдещето на AI в България." 
        />
        <meta name="keywords" content="изкуствен интелект, AI, машинно обучение, България, технологии, иновации" />
        <meta property="og:title" content="AI Категория - Изкуствен интелект новини и анализи | Linaro News" />
        <meta property="og:description" content="Последните развития в изкуствения интелект, машинното обучение и AI технологиите в България." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/ai-category" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Категория - Изкуствен интелект новини и анализи" />
        <meta name="twitter:description" content="Експертни анализи и новини за AI технологиите в България" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop" />
        <link rel="canonical" href="https://linaronews.bg/ai-category" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Категория - Изкуствен интелект новини",
            "description": "Последните развития в изкуствения интелект, машинното обучение и AI технологиите в България",
            "url": "https://linaronews.bg/ai-category",
            "inLanguage": "bg-BG",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Linaro News",
              "url": "https://linaronews.bg"
            },
            "about": {
              "@type": "Thing",
              "name": "Изкуствен интелект",
              "description": "AI технологии, машинно обучение и иновации в България"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <AIHeroSection />
          
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Filter Bar */}
            <AIFilterBar 
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
            
            {/* Articles Grid */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-headline font-bold text-2xl text-foreground mb-2">
                    AI Статии и Анализи
                  </h2>
                  <p className="font-body text-text-secondary">
                    {loading ? 'Зареждане...' : `${articles?.length} статии намерени`}
                    {Object.keys(filters)?.length > 0 && ' с приложени филтри'}
                  </p>
                </div>
                
                {/* Sort Options */}
                <div className="hidden md:flex items-center space-x-2">
                  <span className="font-cta text-sm text-text-secondary">Подреди по:</span>
                  <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-cta focus:outline-none focus:ring-2 focus:ring-ai-blue">
                    <option value="date">Най-нови</option>
                    <option value="popular">Най-популярни</option>
                    <option value="trending">Тенденции</option>
                    <option value="views">Най-четени</option>
                  </select>
                </div>
              </div>
              
              <AIArticleGrid articles={articles} loading={loading} />
              
              {/* Load More Button */}
              {!loading && articles?.length > 0 && (
                <div className="text-center mt-12">
                  <button className="bg-ai-blue hover:bg-ai-blue/90 text-white font-cta font-semibold px-8 py-3 rounded-lg transition-colors">
                    Зареди още статии
                  </button>
                </div>
              )}
            </div>
            
            {/* AI Tools Showcase */}
            <AIToolsShowcase />
            
            {/* Trend Analysis */}
            <AITrendAnalysis />
            
            {/* Newsletter Section */}
            <AINewsletterSection />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  За AI категорията
                </h3>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  Нашата AI категория предлага най-актуалните новини, анализи и практически съвети 
                  за изкуствения интелект в България. Следете развитието на технологиите, които 
                  променят света.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-text-secondary hover:text-ai-blue transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-text-secondary hover:text-ai-blue transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-text-secondary hover:text-ai-blue transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  Популярни теми
                </h3>
                <ul className="space-y-2 font-body text-text-secondary">
                  <li><a href="#" className="hover:text-ai-blue transition-colors">ChatGPT</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Машинно обучение</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Computer Vision</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">AI етика</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Бизнес AI</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-headline font-bold text-lg text-foreground mb-4">
                  Ресурси
                </h3>
                <ul className="space-y-2 font-body text-text-secondary">
                  <li><a href="#" className="hover:text-ai-blue transition-colors">AI Речник</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Практически ръководства</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Инструменти</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Изследвания</a></li>
                  <li><a href="#" className="hover:text-ai-blue transition-colors">Експертни мнения</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 mt-8 text-center">
              <p className="font-body text-text-secondary">
                © {new Date()?.getFullYear()} Linaro News. Всички права запазени. 
                Специализирани AI новини за българския пазар.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AICategoryPage;