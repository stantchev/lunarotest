import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleContent = ({ content, featuredImage }) => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={featuredImage?.url}
            alt={featuredImage?.alt}
            className="w-full h-64 lg:h-96 object-cover"
          />
          {featuredImage?.caption && (
            <p className="text-sm text-text-secondary mt-3 text-center italic">
              {featuredImage?.caption}
            </p>
          )}
        </div>
      )}
      {/* Article Content */}
      <div className="font-body text-lg leading-relaxed text-foreground space-y-6">
        {content?.paragraphs?.map((paragraph, index) => {
          if (paragraph?.type === 'text') {
            return (
              <p key={index} className="mb-6">
                {paragraph?.content}
              </p>
            );
          }
          
          if (paragraph?.type === 'heading') {
            return (
              <h2 key={index} className="font-headline font-bold text-2xl text-foreground mt-12 mb-6">
                {paragraph?.content}
              </h2>
            );
          }
          
          if (paragraph?.type === 'quote') {
            return (
              <blockquote key={index} className="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/50 rounded-r-lg">
                <p className="text-xl font-medium text-foreground mb-3 italic">
                  "{paragraph?.content}"
                </p>
                {paragraph?.author && (
                  <cite className="text-text-secondary font-cta font-semibold">
                    — {paragraph?.author}
                  </cite>
                )}
              </blockquote>
            );
          }
          
          if (paragraph?.type === 'list') {
            return (
              <ul key={index} className="space-y-3 my-6">
                {paragraph?.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <Icon name="ArrowRight" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          
          if (paragraph?.type === 'code') {
            return (
              <div key={index} className="bg-dark-bg rounded-lg p-6 my-8 overflow-x-auto">
                <pre className="font-mono text-sm text-text-off-white">
                  <code>{paragraph?.content}</code>
                </pre>
              </div>
            );
          }
          
          if (paragraph?.type === 'warning') {
            return (
              <div key={index} className="bg-warning/10 border border-warning/20 rounded-lg p-6 my-8">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cta font-semibold text-warning mb-2">Внимание</h4>
                    <p className="text-foreground">{paragraph?.content}</p>
                  </div>
                </div>
              </div>
            );
          }
          
          return null;
        })}
      </div>
      {/* Article Tags */}
      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="font-cta font-semibold text-foreground mb-4">Тагове:</h3>
        <div className="flex flex-wrap gap-2">
          {content?.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-muted hover:bg-muted/80 text-text-secondary hover:text-foreground rounded-full text-sm font-medium transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;