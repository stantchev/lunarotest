import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleHeader = ({ article, author, readingTime, publishedDate }) => {
  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
        <span>Начало</span>
        <Icon name="ChevronRight" size={16} />
        <span className="capitalize">{article?.category}</span>
        <Icon name="ChevronRight" size={16} />
        <span className="text-foreground font-medium truncate">{article?.title}</span>
      </nav>
      {/* Category Badge */}
      <div className="flex items-center space-x-3 mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
          article?.category === 'киберсигурност' ?'bg-accent/10 text-accent border border-accent/20' 
            : article?.category === 'seo' ?'bg-conversion-orange/10 text-conversion-orange border border-conversion-orange/20' :'bg-ai-blue/10 text-ai-blue border border-ai-blue/20'
        }`}>
          <Icon 
            name={article?.category === 'киберсигурност' ? 'Shield' : article?.category === 'seo' ? 'Search' : 'Brain'} 
            size={12} 
            className="mr-1" 
          />
          {article?.category?.toUpperCase()}
        </span>
        {article?.isBreaking && (
          <span className="inline-flex items-center px-2 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs font-mono font-semibold text-accent animate-pulse">
            <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
            СПЕШНО
          </span>
        )}
      </div>
      {/* Title */}
      <h1 className="font-headline font-bold text-3xl lg:text-4xl text-foreground leading-tight mb-6">
        {article?.title}
      </h1>
      {/* Subtitle */}
      {article?.subtitle && (
        <p className="font-body text-xl text-text-secondary leading-relaxed mb-8">
          {article?.subtitle}
        </p>
      )}
      {/* Article Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {author?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyber-green rounded-full flex items-center justify-center border-2 border-background">
                <Icon name="Check" size={12} color="black" strokeWidth={3} />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-cta font-semibold text-foreground">{author?.name}</h3>
              {author?.isExpert && (
                <span className="inline-flex items-center px-2 py-0.5 bg-cyber-green/10 text-cyber-green text-xs font-mono font-semibold rounded border border-cyber-green/20">
                  ЕКСПЕРТ
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{author?.role}</p>
          </div>
        </div>

        {/* Article Stats */}
        <div className="flex items-center space-x-6 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{readingTime} мин четене</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{article?.views?.toLocaleString('bg-BG')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;