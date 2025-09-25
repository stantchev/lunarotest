import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingSearches = ({ trendingSearches, onSearchClick }) => {
  const getTrendIcon = (trend) => {
    if (trend === 'up') return { icon: 'TrendingUp', color: 'text-success' };
    if (trend === 'down') return { icon: 'TrendingDown', color: 'text-destructive' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cybersecurity':
        return 'bg-accent/10 text-accent';
      case 'seo':
        return 'bg-cyber-green/10 text-cyber-green';
      case 'ai':
        return 'bg-ai-blue/10 text-ai-blue';
      default:
        return 'bg-muted text-muted-foreground';
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

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="font-headline font-semibold text-lg text-foreground">
          Популярни търсения
        </h3>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Последните 24 часа</span>
        </div>
      </div>
      {/* Trending List */}
      <div className="space-y-3">
        {trendingSearches?.map((search, index) => {
          const trendData = getTrendIcon(search?.trend);
          
          return (
            <div
              key={search?.id}
              className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < 3 
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                
                {/* Search Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <button
                      onClick={() => onSearchClick(search?.query)}
                      className="font-cta font-medium text-foreground hover:text-primary transition-colors group-hover:text-primary"
                    >
                      {search?.query}
                    </button>
                    
                    {search?.category && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(search?.category)}`}>
                        {getCategoryName(search?.category)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{search?.searchCount?.toLocaleString('bg-BG')} търсения</span>
                    <span>•</span>
                    <span>{search?.resultsCount?.toLocaleString('bg-BG')} резултата</span>
                    {search?.relatedTopics && search?.relatedTopics?.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{search?.relatedTopics?.length} свързани теми</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Trend Indicator */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={trendData?.icon} 
                    size={16} 
                    className={trendData?.color} 
                  />
                  <span className={`text-sm font-medium ${trendData?.color}`}>
                    {search?.changePercent > 0 ? '+' : ''}{search?.changePercent}%
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSearchClick(search?.query)}
                  iconName="Search"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Related Topics */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-cta font-medium text-sm text-foreground mb-3">
          Свързани теми
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            'кибератаки', 'фишинг', 'малуер', 'GDPR', 'облачна сигурност',
            'SEO оптимизация', 'Google алгоритми', 'ключови думи',
            'ChatGPT', 'машинно обучение', 'невронни мрежи', 'автоматизация'
          ]?.map((topic) => (
            <button
              key={topic}
              onClick={() => onSearchClick(topic)}
              className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSearchClick('нови кибератаки 2024')}
            iconName="Shield"
            iconPosition="left"
          >
            Нови заплаhi
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSearchClick('SEO тенденции')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            SEO тенденции
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSearchClick('AI новини')}
            iconName="Brain"
            iconPosition="left"
          >
            AI новини
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingSearches;