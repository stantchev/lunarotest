import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIArticleGrid = ({ articles = [], loading = false }) => {
  const mockArticles = [
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
    },
    {
      id: 4,
      title: "TensorFlow vs PyTorch 2024: Кой framework да изберете за вашия AI проект",
      excerpt: "Сравнителен анализ на двата най-популярни AI frameworks с практически примери и препоръки за различни случаи на употреба.",
      author: "Инж. Георги Петков",
      publishDate: "20 септември 2024",
      readTime: "18 мин",
      category: "Machine Learning",
      difficulty: "intermediate",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      tags: ["TensorFlow", "PyTorch", "Framework", "Сравнение"],
      hasDemo: true,
      hasCode: true,
      views: 4521,
      likes: 312,
      comments: 67
    },
    {
      id: 5,
      title: "Генеративен AI в креативните индустрии: Възможности и заплаха за творците",
      excerpt: "Как генеративният изкуствен интелект променя креативните индустрии и какво означава това за художници, дизайнери и писатели.",
      author: "Мария Василева",
      publishDate: "19 септември 2024",
      readTime: "14 мин",
      category: "Generative AI",
      difficulty: "beginner",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop",
      tags: ["Generative AI", "Креативност", "Изкуство", "Дизайн"],
      hasDemo: true,
      hasCode: false,
      views: 2789,
      likes: 198,
      comments: 34
    },
    {
      id: 6,
      title: "Автономни превозни средства в България: Готови ли сме за бъдещето?",
      excerpt: "Анализ на състоянието на технологиите за автономно шофиране и готовността на българската инфраструктура за тяхното внедряване.",
      author: "Инж. Иван Стефанов",
      publishDate: "18 септември 2024",
      readTime: "16 мин",
      category: "Robotics",
      difficulty: "intermediate",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      tags: ["Автономни коли", "България", "Транспорт", "Технологии"],
      hasDemo: false,
      hasCode: false,
      views: 1876,
      likes: 134,
      comments: 28
    }
  ];

  const displayArticles = articles?.length > 0 ? articles : mockArticles;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'advanced': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'expert': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Начинаещи';
      case 'intermediate': return 'Средно';
      case 'advanced': return 'Напреднали';
      case 'expert': return 'Експертно';
      default: return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
              <div className="h-3 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4 w-1/2"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayArticles?.map((article) => (
        <article key={article?.id} className="bg-card border border-border rounded-xl overflow-hidden hover-lift transition-all duration-300 group">
          {/* Article Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article?.image}
              alt={article?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(article?.difficulty)}`}>
                {getDifficultyLabel(article?.difficulty)}
              </span>
            </div>
            
            <div className="absolute top-4 right-4 flex space-x-2">
              {article?.hasDemo && (
                <div className="bg-cyber-green/90 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                  <Icon name="Play" size={12} />
                </div>
              )}
              {article?.hasCode && (
                <div className="bg-ai-blue/90 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                  <Icon name="Code" size={12} />
                </div>
              )}
            </div>
            
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="font-cta text-xs font-medium text-foreground">{article?.category}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {article?.tags?.slice(0, 3)?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-muted text-text-secondary text-xs font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {article?.tags?.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 bg-muted text-text-secondary text-xs font-medium rounded-full">
                  +{article?.tags?.length - 3}
                </span>
              )}
            </div>
            
            {/* Title */}
            <h3 className="font-headline font-bold text-lg text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-ai-blue transition-colors">
              {article?.title}
            </h3>
            
            {/* Excerpt */}
            <p className="font-body text-text-secondary mb-4 leading-relaxed line-clamp-3">
              {article?.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={14} />
                  <span className="font-cta font-medium">{article?.author}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{article?.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{article?.publishDate}</span>
              </div>
            </div>
            
            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{article?.views?.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span>{article?.likes}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={14} />
                  <span>{article?.comments}</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
                className="text-ai-blue hover:text-ai-blue/80 hover:bg-ai-blue/10"
              >
                Прочети
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default AIArticleGrid;