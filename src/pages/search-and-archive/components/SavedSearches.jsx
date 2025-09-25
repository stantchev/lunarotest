import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ savedSearches, onLoadSearch, onSaveSearch, onDeleteSearch, currentFilters, searchQuery }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveSearch = () => {
    if (searchName?.trim()) {
      onSaveSearch({
        id: Date.now(),
        name: searchName?.trim(),
        query: searchQuery,
        filters: currentFilters,
        createdAt: new Date()?.toISOString(),
        resultsCount: 0 // This would be populated from actual search results
      });
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const formatFiltersText = (filters) => {
    const activeFilters = [];
    
    if (filters?.category && filters?.category !== 'all') {
      const categoryNames = {
        cybersecurity: 'Киберсигурност',
        seo: 'SEO',
        ai: 'Изкуствен интелект'
      };
      activeFilters?.push(categoryNames?.[filters?.category]);
    }
    
    if (filters?.contentType && filters?.contentType !== 'all') {
      const typeNames = {
        article: 'Статии',
        guide: 'Ръководства',
        news: 'Новини',
        analysis: 'Анализи'
      };
      activeFilters?.push(typeNames?.[filters?.contentType]);
    }
    
    if (filters?.tags && filters?.tags?.length > 0) {
      activeFilters?.push(`${filters?.tags?.length} тага`);
    }
    
    if (filters?.dateRange && (filters?.dateRange?.from || filters?.dateRange?.to)) {
      activeFilters?.push('Период');
    }
    
    return activeFilters?.length > 0 ? activeFilters?.join(', ') : 'Без филтри';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (savedSearches?.length === 0 && !showSaveDialog) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bookmark" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
            Няма запазени търсения
          </h3>
          <p className="text-text-secondary mb-4">
            Запазете често използвани търсения за бърз достъп
          </p>
          <Button
            variant="default"
            onClick={() => setShowSaveDialog(true)}
            iconName="Plus"
            iconPosition="left"
            disabled={!searchQuery && Object.values(currentFilters)?.every(v => 
              v === '' || v === 'all' || v === 'newest' || (Array.isArray(v) && v?.length === 0)
            )}
          >
            Запази текущото търсене
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="font-headline font-semibold text-lg text-foreground">
            Запазени търсения
          </h3>
          <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
            {savedSearches?.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
            iconName="Plus"
            iconPosition="left"
            disabled={!searchQuery && Object.values(currentFilters)?.every(v => 
              v === '' || v === 'all' || v === 'newest' || (Array.isArray(v) && v?.length === 0)
            )}
          >
            Запази
          </Button>
          
          {savedSearches?.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Скрий' : 'Покажи всички'}
            </Button>
          )}
        </div>
      </div>
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-6 p-4 bg-muted/50 border border-border rounded-lg">
          <h4 className="font-cta font-medium text-sm text-foreground mb-3">
            Запази текущото търсене
          </h4>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                placeholder="Име на търсенето..."
                value={searchName}
                onChange={(e) => setSearchName(e?.target?.value)}
                onKeyDown={(e) => {
                  if (e?.key === 'Enter') {
                    handleSaveSearch();
                  } else if (e?.key === 'Escape') {
                    setShowSaveDialog(false);
                    setSearchName('');
                  }
                }}
              />
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveSearch}
              disabled={!searchName?.trim()}
            >
              Запази
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowSaveDialog(false);
                setSearchName('');
              }}
            >
              Отказ
            </Button>
          </div>
          
          {/* Preview */}
          <div className="mt-3 p-3 bg-background border border-border rounded text-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Search" size={14} className="text-muted-foreground" />
              <span className="font-medium text-foreground">
                {searchQuery || 'Без ключови думи'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Filter" size={14} />
              <span>{formatFiltersText(currentFilters)}</span>
            </div>
          </div>
        </div>
      )}
      {/* Saved Searches List */}
      <div className="space-y-3">
        {savedSearches?.slice(0, isExpanded ? savedSearches?.length : 3)?.map((search) => (
            <div
              key={search?.id}
              className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-cta font-medium text-foreground truncate">
                    {search?.name}
                  </h4>
                  {search?.query && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      "{search?.query}"
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{formatFiltersText(search?.filters)}</span>
                  <span>•</span>
                  <span>Създадено {formatDate(search?.createdAt)}</span>
                  {search?.resultsCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{search?.resultsCount} резултата</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLoadSearch(search)}
                  iconName="Play"
                  iconPosition="left"
                >
                  Зареди
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteSearch(search?.id)}
                  iconName="Trash2"
                  className="text-destructive hover:text-destructive"
                >
                </Button>
              </div>
            </div>
          ))}
      </div>
      {/* Show More/Less */}
      {savedSearches?.length > 3 && !isExpanded && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Покажи още {savedSearches?.length - 3} търсения
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;