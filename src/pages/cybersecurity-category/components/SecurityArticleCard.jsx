import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import ExpertVerificationBadge from './ExpertVerificationBadge';

const SecurityArticleCard = ({ article, variant = 'default' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (variant === 'featured') {
    return (
      <Link to="/single-article" className="block group">
        <article className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative overflow-hidden h-64">
            <Image
              src={article?.featuredImage}
              alt={article?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Threat Level Badge */}
            {article?.threatLevel && (
              <div className={`absolute top-4 left-4 px-2 py-1 rounded-full border text-xs font-medium ${getThreatLevelColor(article?.threatLevel)}`}>
                {article?.threatLevel === 'critical' && 'Критично'}
                {article?.threatLevel === 'high' && 'Високо'}
                {article?.threatLevel === 'medium' && 'Средно'}
                {article?.threatLevel === 'low' && 'Ниско'}
              </div>
            )}
            
            {/* Breaking News Badge */}
            {article?.isBreaking && (
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">СПЕШНО</span>
              </div>
            )}
            
            {/* Category */}
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="Shield" size={12} />
                <span>{article?.category}</span>
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <ExpertVerificationBadge
                expert={article?.author?.name}
                verificationLevel={article?.author?.verificationLevel}
                specialization={article?.author?.specialization}
              />
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {article?.title}
            </h2>
            
            <p className="text-text-secondary text-sm mb-4 line-clamp-3">
              {article?.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center space-x-4">
                <span>{formatDate(article?.publishedAt)}</span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{article?.readTime} мин четене</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{article?.views}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={12} />
                  <span>{article?.comments}</span>
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to="/single-article" className="block group">
      <article className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        <div className="flex">
          <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
            <Image
              src={article?.featuredImage}
              alt={article?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article?.threatLevel && (
              <div className={`absolute top-1 left-1 w-2 h-2 rounded-full ${
                article?.threatLevel === 'critical' ? 'bg-red-500' :
                article?.threatLevel === 'high' ? 'bg-orange-500' :
                article?.threatLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
            )}
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="inline-flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Shield" size={10} />
                <span>{article?.category}</span>
              </span>
              {article?.isBreaking && (
                <span className="text-xs text-red-600 font-medium">СПЕШНО</span>
              )}
            </div>
            
            <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {article?.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{formatDate(article?.publishedAt)}</span>
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={10} />
                  <span>{article?.readTime}м</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={10} />
                  <span>{article?.views}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default SecurityArticleCard;