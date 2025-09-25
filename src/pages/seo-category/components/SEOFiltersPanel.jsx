import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SEOFiltersPanel = ({ onFiltersChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: 'all',
    dateRange: 'all',
    author: 'all',
    sortBy: 'newest'
  });

  const categories = [
    { value: 'all', label: 'Всички категории' },
    { value: 'technical-seo', label: 'Техническо SEO' },
    { value: 'content-seo', label: 'Съдържание и SEO' },
    { value: 'local-seo', label: 'Локално SEO' },
    { value: 'link-building', label: 'Link Building' },
    { value: 'seo-tools', label: 'SEO Инструменти' },
    { value: 'algorithm-updates', label: 'Алгоритмични актуализации' },
    { value: 'mobile-seo', label: 'Мобилно SEO' },
    { value: 'ecommerce-seo', label: 'E-commerce SEO' }
  ];

  const difficulties = [
    { value: 'all', label: 'Всички нива' },
    { value: 'beginner', label: 'Начинаещи' },
    { value: 'intermediate', label: 'Средно ниво' },
    { value: 'advanced', label: 'Напреднали' }
  ];

  const dateRanges = [
    { value: 'all', label: 'Всички периоди' },
    { value: 'today', label: 'Днес' },
    { value: 'week', label: 'Тази седмица' },
    { value: 'month', label: 'Този месец' },
    { value: 'quarter', label: 'Последните 3 месеца' },
    { value: 'year', label: 'Тази година' }
  ];

  const authors = [
    { value: 'all', label: 'Всички автори' },
    { value: 'maria-petrova', label: 'Мария Петрова' },
    { value: 'ivan-georgiev', label: 'Иван Георгиев' },
    { value: 'elena-dimitrova', label: 'Елена Димитрова' },
    { value: 'stefan-nikolov', label: 'Стефан Николов' },
    { value: 'ana-stoeva', label: 'Ана Стоева' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Най-нови първо' },
    { value: 'oldest', label: 'Най-стари първо' },
    { value: 'popular', label: 'Най-популярни' },
    { value: 'trending', label: 'Трендинг' },
    { value: 'alphabetical', label: 'По азбучен ред' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      search: '',
      category: 'all',
      difficulty: 'all',
      dateRange: 'all',
      author: 'all',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.category !== 'all') count++;
    if (filters?.difficulty !== 'all') count++;
    if (filters?.dateRange !== 'all') count++;
    if (filters?.author !== 'all') count++;
    if (filters?.sortBy !== 'newest') count++;
    return count;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={18}
          className="w-full"
        >
          Филтри {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
        </Button>
      </div>
      {/* Filters Panel */}
      <div className={`bg-white rounded-xl border border-border shadow-sm p-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-foreground">Филтри</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Изчисти всички
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              label="Търсене"
              placeholder="Търсете статии..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Категория
            </label>
            <select
              value={filters?.category}
              onChange={(e) => handleFilterChange('category', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories?.map((category) => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ниво на сложност
            </label>
            <div className="space-y-2">
              {difficulties?.map((difficulty) => (
                <label key={difficulty?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty?.value}
                    checked={filters?.difficulty === difficulty?.value}
                    onChange={(e) => handleFilterChange('difficulty', e?.target?.value)}
                    className="w-4 h-4 text-blue-600 border-border focus:ring-blue-500"
                  />
                  <span className="text-sm text-foreground">{difficulty?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Период
            </label>
            <select
              value={filters?.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dateRanges?.map((range) => (
                <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Автор
            </label>
            <select
              value={filters?.author}
              onChange={(e) => handleFilterChange('author', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {authors?.map((author) => (
                <option key={author?.value} value={author?.value}>
                  {author?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Подреди по
            </label>
            <select
              value={filters?.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Бързи филтри</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Най-четени', action: () => handleFilterChange('sortBy', 'popular') },
              { label: 'Тази седмица', action: () => handleFilterChange('dateRange', 'week') },
              { label: 'Техническо SEO', action: () => handleFilterChange('category', 'technical-seo') },
              { label: 'Начинаещи', action: () => handleFilterChange('difficulty', 'beginner') }
            ]?.map((quickFilter, index) => (
              <button
                key={index}
                onClick={quickFilter?.action}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
              >
                {quickFilter?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SEOFiltersPanel;