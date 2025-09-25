import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResults = ({ 
  results, 
  totalResults, 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading, 
  searchQuery,
  viewMode,
  onViewModeChange 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cybersecurity':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'seo':
        return 'bg-cyber-green/10 text-cyber-green border-cyber-green/20';
      case 'ai':
        return 'bg-ai-blue/10 text-ai-blue border-ai-blue/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'cybersecurity':
        return 'Киберсигурност';
      case 'seo':
        return 'SEO';
      case 'ai':
        return 'Изкуствен интелект';
      default:
        return 'Общо';
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'guide':
        return 'BookOpen';
      case 'news':
        return 'Newspaper';
      case 'analysis':
        return 'BarChart3';
      default:
        return 'FileText';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
          Няма намерени резултати
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          {searchQuery 
            ? `Не намерихме резултати за "${searchQuery}". Опитайте с различни ключови думи или филтри.`
            : 'Не намерихме резултати с текущите филтри. Опитайте да промените критериите за търсене.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Изчисти филтрите
          </Button>
          <Button variant="default" iconName="TrendingUp" iconPosition="left">
            Вижте популярните статии
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <p className="text-text-secondary">
            <span className="font-medium text-foreground">{totalResults?.toLocaleString('bg-BG')}</span> резултата
            {searchQuery && (
              <span> за "<span className="font-medium text-foreground">{searchQuery}</span>"</span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Изглед:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Results List */}
      <div className={viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-6'
      }>
        {results?.map((article) => (
          <article 
            key={article?.id} 
            className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group ${
              viewMode === 'list' ? 'p-6' : 'p-0'
            }`}
          >
            {viewMode === 'list' ? (
              // List View
              (<div className="flex space-x-6">
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article?.category)}`}>
                        {getCategoryName(article?.category)}
                      </span>
                      <Icon name={getContentTypeIcon(article?.contentType)} size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{article?.readingTime} мин четене</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Eye" size={12} />
                      <span>{article?.views?.toLocaleString('bg-BG')}</span>
                    </div>
                  </div>
                  
                  <Link to={`/single-article?id=${article?.id}`} className="group">
                    <h3 className="font-headline font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article?.title}
                    </h3>
                  </Link>
                  
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                    {article?.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <Image
                            src={article?.author?.avatar}
                            alt={article?.author?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{article?.author?.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(article?.publishedAt)}
                      </time>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {article?.tags?.slice(0, 2)?.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>)
            ) : (
              // Grid View
              (<div>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article?.category)}`}>
                      {getCategoryName(article?.category)}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{article?.readingTime} мин</span>
                    </div>
                  </div>
                  
                  <Link to={`/single-article?id=${article?.id}`} className="group">
                    <h3 className="font-headline font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article?.title}
                    </h3>
                  </Link>
                  
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {article?.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={article?.author?.avatar}
                          alt={article?.author?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground">{article?.author?.name}</span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {formatDate(article?.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>)
            )}
          </article>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Предишна
          </Button>
          
          <div className="flex items-center space-x-1">
            {[...Array(Math.min(5, totalPages))]?.map((_, index) => {
              const pageNumber = Math.max(1, currentPage - 2) + index;
              if (pageNumber > totalPages) return null;
              
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Следваща
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;