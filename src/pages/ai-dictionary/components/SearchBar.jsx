import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchTerm, onSearchChange, onVoiceSearch }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock search suggestions
  const mockSuggestions = [
    'Изкуствен интелект',
    'Машинно обучение',
    'Невронна мрежа',
    'Компютърно зрение',
    'Обработка на естествен език',
    'Дълбоко обучение',
    'Алгоритъм',
    'Данни за обучение'
  ];

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    
    if (value?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Гласовото търсене не се поддържа от вашия браузър');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'bg-BG';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsVoiceActive(true);

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript;
      onSearchChange(transcript);
      setIsVoiceActive(false);
    };

    recognition.onerror = () => {
      setIsVoiceActive(false);
      alert('Възникна грешка при гласовото търсене');
    };

    recognition.onend = () => {
      setIsVoiceActive(false);
    };

    recognition?.start();
  };

  const clearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Търси термини по български или английски... (напр. 'машинно обучение' или 'neural network')"
          className="w-full pl-12 pr-32 py-4 bg-card border border-border rounded-xl text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ai-blue focus:border-transparent text-lg font-body"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="text-text-secondary hover:text-foreground"
              iconName="X"
            />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            className={`text-text-secondary hover:text-ai-blue transition-colors ${
              isVoiceActive ? 'text-accent animate-pulse' : ''
            }`}
            iconName="Mic"
            title="Гласово търсене"
          />
        </div>
      </div>
      
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors font-body text-foreground border-b border-border last:border-0"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-text-secondary" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Search Tips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-text-secondary font-body">Бързи търсения:</span>
        {['AI', 'машинно обучение', 'невронна мрежа', 'компютърно зрение']?.map((tip, index) => (
          <button
            key={index}
            onClick={() => onSearchChange(tip)}
            className="px-3 py-1 bg-muted hover:bg-ai-blue/10 text-text-secondary hover:text-ai-blue text-sm font-cta rounded-full transition-colors"
          >
            #{tip}
          </button>
        ))}
      </div>
      
      {/* Voice Search Status */}
      {isVoiceActive && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="font-cta text-sm text-accent">Слушам... говорете сега</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;