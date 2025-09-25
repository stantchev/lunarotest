import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  selectedDifficulty, 
  onDifficultySelect 
}) => {
  const difficulties = [
    { value: '', label: 'Всички нива', icon: 'Circle', color: 'text-text-secondary' },
    { value: 'beginner', label: 'Начинаещи', icon: 'CircleDot', color: 'text-green-500' },
    { value: 'intermediate', label: 'Напреднали', icon: 'Circle', color: 'text-amber-500' },
    { value: 'advanced', label: 'Експерти', icon: 'Circle', color: 'text-red-500' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-headline font-bold text-lg text-foreground mb-4">
        Категории и трудност
      </h3>
      {/* Category Filter */}
      <div className="mb-6">
        <label className="font-cta font-medium text-foreground mb-3 block">
          Категория
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategorySelect(e?.target?.value)}
          className="w-full p-3 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue focus:border-transparent"
        >
          {categories?.map((category) => (
            <option key={category} value={category === 'Всички категории' ? '' : category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* Difficulty Filter */}
      <div>
        <label className="font-cta font-medium text-foreground mb-3 block">
          Ниво на трудност
        </label>
        <div className="space-y-2">
          {difficulties?.map((difficulty) => (
            <button
              key={difficulty?.value}
              onClick={() => onDifficultySelect(difficulty?.value)}
              className={`w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center space-x-3 ${
                selectedDifficulty === difficulty?.value
                  ? 'bg-ai-blue/10 border border-ai-blue/20 text-ai-blue' :'hover:bg-muted'
              }`}
            >
              <Icon 
                name={difficulty?.icon} 
                size={16} 
                className={selectedDifficulty === difficulty?.value ? 'text-ai-blue' : difficulty?.color}
              />
              <span className="font-cta font-medium">{difficulty?.label}</span>
              {selectedDifficulty === difficulty?.value && (
                <Icon name="Check" size={16} className="text-ai-blue ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedCategory || selectedDifficulty) && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="font-cta text-sm text-text-secondary mb-2">Активни филтри:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && selectedCategory !== 'Всички категории' && (
              <span className="inline-flex items-center px-3 py-1 bg-ai-blue/10 text-ai-blue text-sm font-medium rounded-full">
                {selectedCategory}
                <button
                  onClick={() => onCategorySelect('')}
                  className="ml-2 hover:text-ai-blue/70"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            )}
            {selectedDifficulty && (
              <span className="inline-flex items-center px-3 py-1 bg-ai-blue/10 text-ai-blue text-sm font-medium rounded-full">
                {difficulties?.find(d => d?.value === selectedDifficulty)?.label}
                <button
                  onClick={() => onDifficultySelect('')}
                  className="ml-2 hover:text-ai-blue/70"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;