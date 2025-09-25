import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkModal = ({ isOpen, onClose, term, bookmarkedTerms, onBookmarkUpdate }) => {
  const [personalNote, setPersonalNote] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('default');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);

  // Mock collections
  const collections = [
    { id: 'default', name: 'Общи термини', count: 23 },
    { id: 'ml', name: 'Машинно обучение', count: 15 },
    { id: 'cv', name: 'Компютърно зрение', count: 8 },
    { id: 'nlp', name: 'Обработка на език', count: 12 }
  ];

  // Mock bookmarked terms for display
  const mockBookmarkedTerms = [
    { id: 1, termBg: 'Изкуствен интелект', collection: 'Общи термини', note: 'Основно понятие' },
    { id: 2, termBg: 'Машинно обучение', collection: 'ML', note: 'Важно за проекта' },
    { id: 3, termBg: 'Невронна мрежа', collection: 'ML', note: '' }
  ];

  if (!isOpen) return null;

  const handleSaveBookmark = () => {
    // Logic to save bookmark with note and collection
    console.log('Saving bookmark:', {
      term: term?.id,
      note: personalNote,
      collection: selectedCollection
    });
    
    // Update bookmarked terms
    if (term && !bookmarkedTerms?.includes(term?.id)) {
      onBookmarkUpdate([...bookmarkedTerms, term?.id]);
    }
    
    onClose();
  };

  const handleCreateCollection = () => {
    if (newCollectionName?.trim()) {
      // Logic to create new collection
      console.log('Creating collection:', newCollectionName);
      setShowNewCollection(false);
      setNewCollectionName('');
    }
  };

  const handleRemoveBookmark = (termId) => {
    const updatedBookmarks = bookmarkedTerms?.filter(id => id !== termId);
    onBookmarkUpdate(updatedBookmarks);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-headline font-bold text-xl text-foreground flex items-center space-x-2">
            <Icon name="Bookmark" size={24} className="text-ai-blue" />
            <span>{term ? 'Запази термин' : 'Моите запазени термини'}</span>
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-secondary hover:text-foreground"
            iconName="X"
          />
        </div>
        
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          {term ? (
            /* Bookmark Form */
            (<div className="p-6">
              {/* Term Info */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h3 className="font-headline font-bold text-lg text-foreground mb-1">
                  {term?.termBg}
                </h3>
                <p className="font-cta text-sm text-text-secondary mb-2">
                  {term?.termEn}
                </p>
                <p className="font-body text-text-secondary text-sm">
                  {term?.definition?.substring(0, 150)}...
                </p>
              </div>
              {/* Collection Selection */}
              <div className="mb-6">
                <label className="font-cta font-medium text-foreground mb-3 block">
                  Избери колекция
                </label>
                
                <div className="space-y-2 mb-4">
                  {collections?.map((collection) => (
                    <button
                      key={collection?.id}
                      onClick={() => setSelectedCollection(collection?.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                        selectedCollection === collection?.id
                          ? 'bg-ai-blue/10 border border-ai-blue/20 text-ai-blue' :'bg-background border border-border hover:bg-muted'
                      }`}
                    >
                      <span className="font-cta font-medium">{collection?.name}</span>
                      <span className="text-sm text-text-secondary">{collection?.count} термина</span>
                    </button>
                  ))}
                </div>
                
                {/* New Collection */}
                {showNewCollection ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e?.target?.value)}
                      placeholder="Име на новата колекция..."
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ai-blue"
                    />
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleCreateCollection}
                      iconName="Plus"
                    >
                      Създай
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewCollection(false)}
                      iconName="X"
                    />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowNewCollection(true)}
                    iconName="Plus"
                    className="w-full"
                  >
                    Създай нова колекция
                  </Button>
                )}
              </div>
              {/* Personal Note */}
              <div className="mb-6">
                <label className="font-cta font-medium text-foreground mb-3 block">
                  Лична бележка (по избор)
                </label>
                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e?.target?.value)}
                  placeholder="Добави лична бележка за този термин..."
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg font-body text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-ai-blue resize-none"
                />
              </div>
              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handleSaveBookmark}
                  className="flex-1 bg-ai-blue hover:bg-ai-blue/90"
                  iconName="BookmarkPlus"
                >
                  Запази термин
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Откажи
                </Button>
              </div>
            </div>)
          ) : (
            /* Bookmarked Terms List */
            (<div className="p-6">
              {mockBookmarkedTerms?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="BookOpen" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="font-headline font-bold text-lg text-foreground mb-2">
                    Все още няма запазени термини
                  </h3>
                  <p className="font-body text-text-secondary">
                    Започнете да запазвате термини, за да ги намирате лесно по-късно
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockBookmarkedTerms?.map((bookmarked) => (
                    <div key={bookmarked?.id} className="bg-background border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-headline font-bold text-foreground mb-1">
                            {bookmarked?.termBg}
                          </h4>
                          <p className="font-cta text-sm text-ai-blue mb-2">
                            {bookmarked?.collection}
                          </p>
                          {bookmarked?.note && (
                            <p className="font-body text-text-secondary text-sm">
                              {bookmarked?.note}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-text-secondary hover:text-foreground"
                            iconName="Edit"
                            title="Редактирай"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBookmark(bookmarked?.id)}
                            className="text-text-secondary hover:text-accent"
                            iconName="Trash"
                            title="Премахни"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;