import React from 'react';

const AlphabetFilter = ({ alphabet, selectedLetter, onLetterSelect }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-headline font-bold text-lg text-foreground mb-4">
        Азбучен филтър
      </h3>
      
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
        {alphabet?.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterSelect(selectedLetter === letter ? '' : letter)}
            className={`w-10 h-10 rounded-lg font-cta font-medium transition-all duration-200 ${
              selectedLetter === letter
                ? 'bg-ai-blue text-white shadow-md scale-105'
                : 'bg-muted hover:bg-ai-blue/10 text-text-secondary hover:text-ai-blue'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
      
      {selectedLetter && (
        <div className="mt-4 p-3 bg-ai-blue/10 border border-ai-blue/20 rounded-lg">
          <p className="font-cta text-sm text-ai-blue">
            Показване на термини започващи с "<strong>{selectedLetter}</strong>"
          </p>
        </div>
      )}
    </div>
  );
};

export default AlphabetFilter;