import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SEOArticleCard = ({ article, variant = 'default' }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Начинаещи';
      case 'intermediate': return 'Средно ниво';
      case 'advanced': return 'Напреднали';
      default: return 'Всички нива';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatReadTime = (minutes) => {
    return `${minutes} мин четене`;
  };

  if (variant === 'featured') {
    return (
      <Link
        to={`/single-article?id=${article?.id}`}
        className="group block bg-white rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <Image
              src={article?.image}
              alt={article?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(article?.difficulty)}`}>
              {getDifficultyLabel(article?.difficulty)}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-white text-xs font-medium">{formatReadTime(article?.readTime)}</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Tag" size={14} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">{article?.category}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article?.title}
          </h3>
          
          <p className="text-text-secondary mb-4 line-clamp-3">
            {article?.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={article?.author?.avatar}
                  alt={article?.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{article?.author?.name}</p>
                <p className="text-xs text-text-secondary">{formatDate(article?.publishDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>{article?.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={14} />
                <span>{article?.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/single-article?id=${article?.id}`}
      className="group block bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="flex">
        <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
          <Image
            src={article?.image}
            alt={article?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(article?.difficulty)}`}>
              {getDifficultyLabel(article?.difficulty)}
            </span>
            <span className="text-xs text-text-secondary">{formatReadTime(article?.readTime)}</span>
          </div>
          
          <h4 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article?.title}
          </h4>
          
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <span>{article?.author?.name}</span>
              <span>•</span>
              <span>{formatDate(article?.publishDate)}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={12} />
                <span>{article?.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={12} />
                <span>{article?.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SEOArticleCard;