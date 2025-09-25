import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SocialShare = ({ article, isSticky = false }) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const shareUrl = `https://linaronews.bg/single-article`;
  const shareText = `${article?.title} - Linaro News`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500 hover:text-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-700 hover:text-blue-800'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'text-blue-500 hover:text-blue-600'
    }
  ];

  const containerClasses = isSticky 
    ? "fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:flex flex-col space-y-3 bg-background/95 backdrop-blur-md border border-border rounded-lg p-3 shadow-lg"
    : "flex items-center justify-center space-x-4 py-6 border-t border-b border-border bg-muted/30";

  return (
    <div className={containerClasses}>
      {!isSticky && (
        <span className="font-cta font-semibold text-foreground mr-2">Споделете:</span>
      )}
      {shareLinks?.map((link) => (
        <a
          key={link?.name}
          href={link?.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg hover:bg-muted transition-colors ${link?.color}`}
          title={`Споделете в ${link?.name}`}
        >
          <Icon name={link?.icon} size={isSticky ? 18 : 20} />
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg hover:bg-muted transition-colors text-text-secondary hover:text-foreground"
        title={copied ? "Копирано!" : "Копирайте линка"}
      >
        <Icon name={copied ? "Check" : "Link"} size={isSticky ? 18 : 20} />
      </button>
      <button
        onClick={handleBookmark}
        className={`p-2 rounded-lg hover:bg-muted transition-colors ${
          bookmarked ? 'text-cyber-green' : 'text-text-secondary hover:text-foreground'
        }`}
        title={bookmarked ? "Премахнете от отметки" : "Добавете в отметки"}
      >
        <Icon name={bookmarked ? "BookmarkCheck" : "Bookmark"} size={isSticky ? 18 : 20} />
      </button>
    </div>
  );
};

export default SocialShare;