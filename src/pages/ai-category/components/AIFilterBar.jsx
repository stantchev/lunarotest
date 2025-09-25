import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AIFilterBar = ({ onFilterChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = {
    category: [
      { value: 'all', label: 'Всички категории' },
      { value: 'machine-learning', label: 'Машинно обучение' },
      { value: 'deep-learning', label: 'Дълбоко обучение' },
      { value: 'nlp', label: 'Обработка на естествен език' },
      { value: 'computer-vision', label: 'Компютърно зрение' },
      { value: 'robotics', label: 'Роботика' },
      { value: 'ai-ethics', label: 'AI етика' },
      { value: 'business-ai', label: 'AI в бизнеса' }
    ],
    difficulty: [
      { value: 'all', label: 'Всички нива' },
      { value: 'beginner', label: 'Начинаещи' },
      { value: 'intermediate', label: 'Средно ниво' },
      { value: 'advanced', label: 'Напреднали' },
      { value: 'expert', label: 'Експертно ниво' }
    ],
    contentType: [
      { value: 'all', label: 'Всички типове' },
      { value: 'news', label: 'Новини' },
      { value: 'analysis', label: 'Анализи' },
      { value: 'tutorial', label: 'Ръководства' },
      { value: 'research', label: 'Изследвания' },
      { value: 'interview', label: 'Интервюта' },
      { value: 'review', label: 'Ревюта' }
    ],
    timeframe: [
      { value: 'all', label: 'Всички периоди' },
      { value: 'today', label: 'Днес' },
      { value: 'week', label: 'Тази седмица' },
      { value: 'month', label: 'Този месец' },
      { value: 'quarter', label: 'Това тримесечие' },
      { value: 'year', label: 'Тази година' }
    ]
  };

  const popularTags = [
    'ChatGPT', 'OpenAI', 'Google AI', 'TensorFlow', 'PyTorch', 
    'Transformers', 'GPT-4', 'BERT', 'Neural Networks', 'AutoML',
    'AI Safety', 'Generative AI', 'LLM', 'Computer Vision', 'NLP'
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange?.({
      ...activeFilters,
      [filterType]: value
    });
  };

  const handleTagClick = (tag) => {
    onFilterChange?.({
      ...activeFilters,
      tag: tag
    });
  };

  const clearAllFilters = () => {
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.keys(activeFilters)?.some(key => 
    activeFilters?.[key] && activeFilters?.[key] !== 'all'
  );

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-ai-blue" />
          <h3 className="font-headline font-semibold text-lg text-foreground">
            Филтриране на съдържанието
          </h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-text-secondary hover:text-foreground"
            >
              Изчисти всички
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'По-малко опции' : 'Повече опции'}
          </Button>
        </div>
      </div>
      {/* Main Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Категория"
          options={filterOptions?.category}
          value={activeFilters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />
        
        <Select
          label="Ниво на сложност"
          options={filterOptions?.difficulty}
          value={activeFilters?.difficulty || 'all'}
          onChange={(value) => handleFilterChange('difficulty', value)}
          className="w-full"
        />
        
        <Select
          label="Тип съдържание"
          options={filterOptions?.contentType}
          value={activeFilters?.contentType || 'all'}
          onChange={(value) => handleFilterChange('contentType', value)}
          className="w-full"
        />
        
        <Select
          label="Период"
          options={filterOptions?.timeframe}
          value={activeFilters?.timeframe || 'all'}
          onChange={(value) => handleFilterChange('timeframe', value)}
          className="w-full"
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-6">
          {/* Popular Tags */}
          <div className="mb-6">
            <h4 className="font-cta font-medium text-sm text-text-secondary mb-3">
              Популярни тагове:
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularTags?.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilters?.tag === tag
                      ? 'bg-ai-blue text-white' :'bg-muted text-text-secondary hover:bg-ai-blue/10 hover:text-ai-blue'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasDemo"
                checked={activeFilters?.hasDemo || false}
                onChange={(e) => handleFilterChange('hasDemo', e?.target?.checked)}
                className="w-4 h-4 text-ai-blue bg-background border-border rounded focus:ring-ai-blue"
              />
              <label htmlFor="hasDemo" className="font-cta text-sm text-foreground">
                Със AI демо
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasCode"
                checked={activeFilters?.hasCode || false}
                onChange={(e) => handleFilterChange('hasCode', e?.target?.checked)}
                className="w-4 h-4 text-ai-blue bg-background border-border rounded focus:ring-ai-blue"
              />
              <label htmlFor="hasCode" className="font-cta text-sm text-foreground">
                С код примери
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isFree"
                checked={activeFilters?.isFree || false}
                onChange={(e) => handleFilterChange('isFree', e?.target?.checked)}
                className="w-4 h-4 text-ai-blue bg-background border-border rounded focus:ring-ai-blue"
              />
              <label htmlFor="isFree" className="font-cta text-sm text-foreground">
                Безплатни ресурси
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-cta font-medium text-text-secondary">Активни филтри:</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters)?.map(([key, value]) => {
                if (!value || value === 'all') return null;
                
                let displayValue = value;
                if (key !== 'tag') {
                  const option = filterOptions?.[key]?.find(opt => opt?.value === value);
                  displayValue = option?.label || value;
                }
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center space-x-1 bg-ai-blue/10 text-ai-blue px-2 py-1 rounded-full"
                  >
                    <span>{displayValue}</span>
                    <button
                      onClick={() => handleFilterChange(key, key === 'tag' ? null : 'all')}
                      className="hover:bg-ai-blue/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFilterBar;