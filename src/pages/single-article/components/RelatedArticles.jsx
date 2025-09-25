import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedArticles = ({ articles }) => {
  return (
    <section className="mt-12">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-1 h-8 bg-gradient-to-b from-cyber-green to-ai-blue rounded-full"></div>
        <h2 className="font-headline font-bold text-2xl text-foreground">Свързани статии</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <Link
            key={article?.id}
            to="/single-article"
            className="group bg-card hover:bg-card/80 rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Article Image */}
            <div className="relative overflow-hidden">
              <Image
                src={article?.image}
                alt={article?.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  article?.category === 'киберсигурност' ?'bg-accent/90 text-white' 
                    : article?.category === 'seo' ?'bg-conversion-orange/90 text-white' :'bg-ai-blue/90 text-white'
                }`}>
                  <Icon 
                    name={article?.category === 'киберсигурност' ? 'Shield' : article?.category === 'seo' ? 'Search' : 'Brain'} 
                    size={10} 
                    className="mr-1" 
                  />
                  {article?.category?.toUpperCase()}
                </span>
              </div>

              {/* Reading Time */}
              <div className="absolute bottom-3 right-3 bg-dark-bg/80 backdrop-blur-sm text-text-off-white px-2 py-1 rounded-full text-xs font-mono">
                {article?.readingTime} мин
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                {article?.title}
              </h3>
              
              <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {article?.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{article?.publishedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article?.views?.toLocaleString('bg-BG')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-primary group-hover:text-primary/80">
                  <span className="font-cta font-medium">Прочетете</span>
                  <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          to="/search-and-archive"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 hover:from-cyber-green/20 hover:to-ai-blue/20 border border-primary/20 hover:border-primary/40 rounded-lg font-cta font-semibold text-primary hover:text-primary/80 transition-all duration-300"
        >
          <span>Разгледайте повече статии</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;