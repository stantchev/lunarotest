import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, isExpanded, onToggleExpanded }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'Всички категории' },
    { value: 'cybersecurity', label: 'Киберсигурност' },
    { value: 'seo', label: 'SEO' },
    { value: 'ai', label: 'Изкуствен интелект' }
  ];

  const contentTypeOptions = [
    { value: 'all', label: 'Всички типове' },
    { value: 'article', label: 'Статии' },
    { value: 'guide', label: 'Ръководства' },
    { value: 'news', label: 'Новини' },
    { value: 'analysis', label: 'Анализи' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Най-нови първо' },
    { value: 'oldest', label: 'Най-стари първо' },
    { value: 'popular', label: 'Най-популярни' },
    { value: 'relevant', label: 'Най-релевантни' }
  ];

  const readingTimeOptions = [
    { value: 'all', label: 'Всички времена' },
    { value: '0-5', label: '0-5 минути' },
    { value: '5-10', label: '5-10 минути' },
    { value: '10-20', label: '10-20 минути' },
    { value: '20+', label: '20+ минути' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleDateRangeChange = (type, value) => {
    const updatedFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters?.dateRange,
        [type]: value
      }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: 'all',
      contentType: 'all',
      sortBy: 'newest',
      readingTime: 'all',
      dateRange: { from: '', to: '' },
      tags: [],
      author: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters(clearedFilters);
  };

  const activeFiltersCount = Object.values(localFilters)?.filter(value => {
    if (typeof value === 'string') return value !== '' && value !== 'all' && value !== 'newest';
    if (Array.isArray(value)) return value?.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)?.some(v => v !== '');
    }
    return false;
  })?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-headline font-semibold text-lg text-foreground">
            Филтри за търсене
          </h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            disabled={activeFiltersCount === 0}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Изчисти всички
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Скрий' : 'Покажи повече'}
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Категория"
          options={categoryOptions}
          value={localFilters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        <Select
          label="Тип съдържание"
          options={contentTypeOptions}
          value={localFilters?.contentType}
          onChange={(value) => handleFilterChange('contentType', value)}
        />

        <Select
          label="Сортиране"
          options={sortOptions}
          value={localFilters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />

        <Select
          label="Време за четене"
          options={readingTimeOptions}
          value={localFilters?.readingTime}
          onChange={(value) => handleFilterChange('readingTime', value)}
        />
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-6 border-t border-border">
          {/* Date Range */}
          <div>
            <h4 className="font-cta font-medium text-sm text-foreground mb-3">
              Период на публикуване
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="От дата"
                value={localFilters?.dateRange?.from}
                onChange={(e) => handleDateRangeChange('from', e?.target?.value)}
              />
              <Input
                type="date"
                label="До дата"
                value={localFilters?.dateRange?.to}
                onChange={(e) => handleDateRangeChange('to', e?.target?.value)}
              />
            </div>
          </div>

          {/* Author Filter */}
          <div>
            <Input
              label="Автор"
              placeholder="Търсене по име на автор..."
              value={localFilters?.author}
              onChange={(e) => handleFilterChange('author', e?.target?.value)}
            />
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="font-cta font-medium text-sm text-foreground mb-3">
              Популярни тагове
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'малуер', 'фишинг', 'ранкиране', 'ChatGPT', 'машинно обучение',
                'GDPR', 'облачна сигурност', 'SEO оптимизация', 'невронни мрежи',
                'кибератаки', 'Google алгоритми', 'автоматизация'
              ]?.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const updatedTags = localFilters?.tags?.includes(tag)
                      ? localFilters?.tags?.filter(t => t !== tag)
                      : [...localFilters?.tags, tag];
                    handleFilterChange('tags', updatedTags);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    localFilters?.tags?.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <h4 className="font-cta font-medium text-sm text-foreground mb-3">
              Допълнителни опции
            </h4>
            <div className="space-y-3">
              <Checkbox
                label="Само статии с изображения"
                checked={localFilters?.hasImages || false}
                onChange={(e) => handleFilterChange('hasImages', e?.target?.checked)}
              />
              <Checkbox
                label="Само статии с видео съдържание"
                checked={localFilters?.hasVideo || false}
                onChange={(e) => handleFilterChange('hasVideo', e?.target?.checked)}
              />
              <Checkbox
                label="Включи архивирани статии"
                checked={localFilters?.includeArchived || false}
                onChange={(e) => handleFilterChange('includeArchived', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;