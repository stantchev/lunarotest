import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ArticleActions = () => {
  const [fontSize, setFontSize] = useState('default');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    const article = document.querySelector('article');
    if (article) {
      article?.classList?.remove('text-sm', 'text-lg', 'text-xl');
      if (size === 'small') article?.classList?.add('text-sm');
      if (size === 'large') article?.classList?.add('text-xl');
      if (size === 'extra-large') article?.classList?.add('text-2xl');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTextToSpeech = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const article = document.querySelector('article');
      if (article) {
        const text = article?.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bg-BG';
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:flex flex-col space-y-2 bg-background/95 backdrop-blur-md border border-border rounded-lg p-2 shadow-lg">
      {/* Font Size Controls */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-cta font-medium text-text-secondary text-center mb-1">Размер</span>
        <button
          onClick={() => handleFontSizeChange('small')}
          className={`p-2 rounded-lg transition-colors ${
            fontSize === 'small' ?'bg-primary text-primary-foreground' :'hover:bg-muted text-text-secondary hover:text-foreground'
          }`}
          title="Малък шрифт"
        >
          <span className="text-xs font-bold">A</span>
        </button>
        <button
          onClick={() => handleFontSizeChange('default')}
          className={`p-2 rounded-lg transition-colors ${
            fontSize === 'default' ?'bg-primary text-primary-foreground' :'hover:bg-muted text-text-secondary hover:text-foreground'
          }`}
          title="Нормален шрифт"
        >
          <span className="text-sm font-bold">A</span>
        </button>
        <button
          onClick={() => handleFontSizeChange('large')}
          className={`p-2 rounded-lg transition-colors ${
            fontSize === 'large' ?'bg-primary text-primary-foreground' :'hover:bg-muted text-text-secondary hover:text-foreground'
          }`}
          title="Голям шрифт"
        >
          <span className="text-base font-bold">A</span>
        </button>
      </div>

      <div className="w-full h-px bg-border my-2"></div>

      {/* Text to Speech */}
      <button
        onClick={handleTextToSpeech}
        className={`p-2 rounded-lg transition-colors ${
          isPlaying 
            ? 'bg-cyber-green/20 text-cyber-green' :'hover:bg-muted text-text-secondary hover:text-foreground'
        }`}
        title={isPlaying ? "Спрете четенето" : "Слушайте статията"}
      >
        <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
      </button>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-text-secondary hover:text-foreground"
        title="Отпечатайте статията"
      >
        <Icon name="Printer" size={18} />
      </button>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-text-secondary hover:text-foreground"
        title="Към началото"
      >
        <Icon name="ArrowUp" size={18} />
      </button>
    </div>
  );
};

export default ArticleActions;