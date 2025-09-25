import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit, 
  suggestions, 
  recentSearches, 
  onClearRecent,
  isLoading 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef?.current && 
        !suggestionsRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    setShowSuggestions(value?.length > 0 || recentSearches?.length > 0);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(searchQuery?.length > 0 || recentSearches?.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearchSubmit(suggestion);
    setShowSuggestions(false);
    inputRef?.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      onSearchSubmit(searchQuery);
      setShowSuggestions(false);
      inputRef?.current?.blur();
    } else if (e?.key === 'Escape') {
      setShowSuggestions(false);
      inputRef?.current?.blur();
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    inputRef?.current?.focus();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className={`relative bg-background border-2 rounded-xl transition-all duration-200 ${
        isFocused ? 'border-primary shadow-lg' : 'border-border hover:border-border/80'
      }`}>
        <div className="flex items-center">
          <div className="pl-4 pr-2">
            <Icon 
              name="Search" 
              size={20} 
              className={`transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} 
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder="Търсете статии, ръководства, новини и анализи..."
            className="flex-1 py-4 px-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg"
          />
          
          <div className="flex items-center pr-2">
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Изчисти търсенето"
              >
                <Icon name="X" size={18} />
              </button>
            )}
            
            <div className="w-px h-6 bg-border mx-2"></div>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onSearchSubmit(searchQuery)}
              disabled={isLoading}
              loading={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              Търси
            </Button>
          </div>
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
        >
          {/* Auto-complete Suggestions */}
          {searchQuery && suggestions?.length > 0 && (
            <div className="p-3 border-b border-border">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Предложения
              </h4>
              <div className="space-y-1">
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches?.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Скорошни търсения
                </h4>
                <button
                  onClick={onClearRecent}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Изчисти всички
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches?.slice(0, 5)?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && recentSearches?.length === 0 && (
            <div className="p-3">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Популярни търсения
              </h4>
              <div className="space-y-1">
                {[
                  'кибератаки 2024',
                  'SEO оптимизация',
                  'ChatGPT новини',
                  'фишинг защита',
                  'Google алгоритми',
                  'машинно обучение'
                ]?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors flex items-center space-x-3"
                  >
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Search Tips */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Съвети:</span>
        <span className="bg-muted px-2 py-1 rounded">Използвайте кавички за точна фраза</span>
        <span className="bg-muted px-2 py-1 rounded">+ за задължителни думи</span>
        <span className="bg-muted px-2 py-1 rounded">- за изключване</span>
      </div>
    </div>
  );
};

export default SearchBar;