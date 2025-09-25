import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DictionaryTermCard = ({ term, onBookmark, onShare, isBookmarked }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRelatedTerms, setShowRelatedTerms] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'intermediate': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'advanced': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Начинаещи';
      case 'intermediate': return 'Напреднали';
      case 'advanced': return 'Експерти';
      default: return 'Неопределено';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-headline font-bold text-xl text-foreground">
                {term?.termBg}
              </h3>
              <span className={`px-3 py-1 text-xs font-cta font-medium rounded-full border ${getDifficultyColor(term?.difficulty)}`}>
                {getDifficultyLabel(term?.difficulty)}
              </span>
            </div>
            
            <p className="font-cta text-sm text-text-secondary mb-3">
              EN: {term?.termEn}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>{term?.views?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Bookmark" size={16} />
                <span>{term?.bookmarks}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{term?.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark(term)}
              className={isBookmarked ? 'text-amber-500' : 'text-text-secondary hover:text-amber-500'}
              iconName={isBookmarked ? 'BookmarkCheck' : 'Bookmark'}
              title="Запази термина"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(term)}
              className="text-text-secondary hover:text-ai-blue"
              iconName="Share"
              title="Сподели"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-text-secondary hover:text-foreground"
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              title={isExpanded ? 'Свий' : 'Разгъни'}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 bg-ai-blue/10 text-ai-blue text-sm font-medium rounded-full">
            <Icon name="Tag" size={14} className="mr-1" />
            {term?.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Definition */}
        <div className="mb-6">
          <h4 className="font-headline font-bold text-foreground mb-2">Определение</h4>
          <p className="font-body text-text-secondary leading-relaxed">
            {term?.definition}
          </p>
        </div>
        
        {/* Practical Example */}
        <div className="mb-6">
          <h4 className="font-headline font-bold text-foreground mb-2">Практически пример</h4>
          <div className="bg-muted border-l-4 border-ai-blue p-4 rounded-r-lg">
            <p className="font-body text-text-secondary leading-relaxed">
              {term?.practicalExample}
            </p>
          </div>
        </div>
        
        {/* Business Context - Show when expanded */}
        {isExpanded && (
          <>
            <div className="mb-6">
              <h4 className="font-headline font-bold text-foreground mb-2">Бизнес контекст</h4>
              <p className="font-body text-text-secondary leading-relaxed">
                {term?.businessContext}
              </p>
            </div>
            
            {/* Related Terms */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline font-bold text-foreground">Свързани термини</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRelatedTerms(!showRelatedTerms)}
                  className="text-ai-blue"
                  iconName={showRelatedTerms ? 'ChevronUp' : 'ChevronDown'}
                >
                  {showRelatedTerms ? 'Скрий' : 'Покажи'} ({term?.relatedTerms?.length})
                </Button>
              </div>
              
              {showRelatedTerms && (
                <div className="flex flex-wrap gap-2">
                  {term?.relatedTerms?.map((relatedTerm, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 bg-background border border-border text-text-secondary hover:text-ai-blue hover:border-ai-blue text-sm font-cta rounded-full transition-colors"
                    >
                      {relatedTerm}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBookmark(term)}
                className={`border-amber-500 ${
                  isBookmarked 
                    ? 'bg-amber-500 text-white' :'text-amber-500 hover:bg-amber-500 hover:text-white'
                }`}
                iconName={isBookmarked ? 'BookmarkCheck' : 'BookmarkPlus'}
              >
                {isBookmarked ? 'Запазен' : 'Запази'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShare(term)}
                className="border-ai-blue text-ai-blue hover:bg-ai-blue hover:text-white"
                iconName="Share"
              >
                Сподели
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-white"
                iconName="MessageSquare"
              >
                Обсъди
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-text-secondary text-text-secondary hover:bg-text-secondary hover:text-white"
                iconName="Flag"
              >
                Предложи промяна
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DictionaryTermCard;