import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingArticles = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trendingArticles = [
    {
      id: 1,
      title: "AI алгоритмите на Google променят SEO стратегиите за 2025",
      excerpt: "Новите машинно-обучаеми алгоритми на Google изискват коренно преосмисляне на SEO подходите. Експертите споделят ключовите промени.",
      category: "SEO",
      categorySlug: "seo-category",
      author: "Мария Георгиева",
      publishedAt: "2025-09-24T08:15:00Z",
      readTime: "6 мин четене",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: "1,892",
      likes: "234",
      trending: 1,
      tags: ["SEO", "Google", "AI", "Алгоритми"]
    },
    {
      id: 2,
      title: "Квантовото изчисление заплашва съвременната криптография",
      excerpt: "IBM и Google правят пробиви в квантовите компютри, които могат да компрометират RSA енкрипцията. Как да се подготвим?",
      category: "Киберсигурност",
      categorySlug: "cybersecurity-category",
      author: "Стоян Иванов",
      publishedAt: "2025-09-24T06:45:00Z",
      readTime: "12 мин четене",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: "3,156",
      likes: "445",
      trending: 2,
      tags: ["Квантово", "Криптография", "IBM", "Google"]
    },
    {
      id: 3,
      title: "ChatGPT-5 и бъдещето на изкуствения интелект в България",
      excerpt: "OpenAI обяви нови възможности на ChatGPT-5. Как българските компании могат да се възползват от новите AI технологии?",
      category: "AI",
      categorySlug: "ai-category",
      author: "Николай Димитров",
      publishedAt: "2025-09-23T16:20:00Z",
      readTime: "9 мин четене",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: "2,743",
      likes: "378",
      trending: 3,
      tags: ["ChatGPT", "OpenAI", "България", "Бизнес"]
    },
    {
      id: 4,
      title: "Нови GDPR изисквания за AI системите в ЕС",
      excerpt: "Европейската комисия въвежда допълнителни регулации за AI системите. Какво означава това за българските IT компании?",
      category: "Киберсигурност",
      categorySlug: "cybersecurity-category",
      author: "Елена Петкова",
      publishedAt: "2025-09-23T14:10:00Z",
      readTime: "7 мин четене",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
      views: "1,567",
      likes: "189",
      trending: 4,
      tags: ["GDPR", "AI", "ЕС", "Регулации"]
    }
  ];

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Преди минути";
    if (diffInHours < 24) return `Преди ${diffInHours} часа`;
    return `Преди ${Math.floor(diffInHours / 24)} дни`;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Киберсигурност':
        return 'text-cyber-green border-cyber-green/30 bg-cyber-green/10';
      case 'SEO':
        return 'text-conversion-orange border-conversion-orange/30 bg-conversion-orange/10';
      case 'AI':
        return 'text-ai-blue border-ai-blue/30 bg-ai-blue/10';
      default:
        return 'text-text-medium-gray border-gray-600/30 bg-gray-600/10';
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingArticles?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingArticles?.length) % trendingArticles?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="space-y-4 mb-8 lg:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-cyber-green to-ai-blue rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">
                Актуални теми
              </h2>
            </div>
            <p className="text-lg text-text-secondary max-w-2xl">
              Най-четените статии от експертите ни в областта на киберсигурността, SEO и изкуствения интелект
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Предишна статия"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Следваща статия"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              iconName="Pause"
              iconPosition="left"
              iconSize={16}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? 'Пауза' : 'Пусни'}
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {trendingArticles?.map((article, index) => (
              <div key={article?.id} className="w-full flex-shrink-0">
                <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl p-8 shadow-lg">
                  {/* Content Column */}
                  <div className="space-y-6 flex flex-col justify-center">
                    {/* Trending Badge & Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full">
                          <Icon name="TrendingUp" size={14} className="text-accent" />
                          <span className="text-sm font-mono font-bold text-accent">
                            #{article?.trending} TRENDING
                          </span>
                        </div>
                        
                        <Link
                          to={`/${article?.categorySlug}`}
                          className={`inline-flex items-center space-x-1 px-3 py-1 border rounded-full text-sm font-semibold transition-all hover:scale-105 ${getCategoryColor(article?.category)}`}
                        >
                          <span>{article?.category}</span>
                        </Link>
                      </div>

                      <div className="text-sm text-text-secondary">
                        {formatTimeAgo(article?.publishedAt)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-headline font-bold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">
                      {article?.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {article?.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={16} />
                        <span className="font-medium">{article?.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} />
                        <span>{article?.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Eye" size={16} />
                        <span>{article?.views} прегледа</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {article?.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-text-secondary hover:text-foreground hover:bg-primary/10 transition-all cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="default"
                        size="default"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        iconName="ArrowRight"
                        iconPosition="right"
                        iconSize={16}
                      >
                        Прочети повече
                      </Button>

                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-text-secondary hover:text-accent transition-colors">
                          <Icon name="Heart" size={18} />
                          <span className="text-sm">{article?.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
                          <Icon name="Share2" size={18} />
                          <span className="text-sm">Сподели</span>
                        </button>
                        <button className="text-text-secondary hover:text-primary transition-colors">
                          <Icon name="Bookmark" size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover-lift">
                      <Image
                        src={article?.image}
                        alt={article?.title}
                        className="w-full h-80 lg:h-96 object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Floating Stats */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-white">
                          <Icon name="Eye" size={14} />
                          <span className="text-sm font-medium">{article?.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {trendingArticles?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-primary scale-125' :'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Отиди на слайд ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="Grid3X3"
            iconPosition="left"
            iconSize={18}
          >
            Виж всички актуални статии
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingArticles;