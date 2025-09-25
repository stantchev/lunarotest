import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIHeroSection = () => {
  const featuredArticle = {
    id: 1,
    title: "Революция в машинното обучение: Новите български AI стартъпи променят играта",
    excerpt: "Анализ на най-новите развития в областта на изкуствения интелект в България и как местните компании се конкурират с глобалните лидери в AI технологиите.",
    author: "Д-р Мария Петрова",
    publishDate: "24 септември 2024",
    readTime: "8 мин четене",
    category: "Машинно обучение",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    tags: ["AI стартъпи", "Машинно обучение", "България", "Иновации"],
    isBreaking: true
  };

  return (
    <section className="relative bg-gradient-to-br from-ai-blue/5 via-background to-cyber-green/5 pt-24 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-ai-blue/10 border border-ai-blue/20 rounded-full px-6 py-3 mb-6">
            <Icon name="Brain" size={24} className="text-ai-blue" />
            <span className="font-headline font-bold text-lg text-ai-blue">
              Изкуствен интелект
            </span>
          </div>
          
          <h1 className="font-headline font-bold text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            AI Новини и Анализи
          </h1>
          
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Последните развития в изкуствения интелект, машинното обучение и AI технологиите. 
            Експертни анализи, практически ръководства и прогнози за бъдещето на AI в България.
          </p>
        </div>

        {/* Featured Article */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover-lift">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-64 lg:h-full overflow-hidden">
              <Image
                src={featuredArticle?.image}
                alt={featuredArticle?.title}
                className="w-full h-full object-cover"
              />
              
              {/* Breaking Badge */}
              {featuredArticle?.isBreaking && (
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs font-bold">АКТУАЛНО</span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute bottom-4 left-4 bg-ai-blue/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <span className="font-cta text-sm font-medium">{featuredArticle?.category}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredArticle?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-muted text-text-secondary text-sm font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <h2 className="font-headline font-bold text-2xl lg:text-3xl text-foreground mb-4 leading-tight">
                {featuredArticle?.title}
              </h2>
              
              <p className="font-body text-text-secondary mb-6 leading-relaxed">
                {featuredArticle?.excerpt}
              </p>
              
              {/* Article Meta */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} className="text-text-secondary" />
                    <span className="font-cta text-sm font-medium text-text-secondary">
                      {featuredArticle?.author}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-text-secondary" />
                    <span className="font-cta text-sm text-text-secondary">
                      {featuredArticle?.publishDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-text-secondary" />
                    <span className="font-cta text-sm text-text-secondary">
                      {featuredArticle?.readTime}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="default"
                className="bg-gradient-to-r from-ai-blue to-cyber-green hover:from-ai-blue/90 hover:to-cyber-green/90 text-white font-cta font-semibold w-fit"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Прочети пълната статия
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { label: "AI Статии", value: "247", icon: "FileText" },
            { label: "Експертни анализи", value: "89", icon: "TrendingUp" },
            { label: "Практически ръководства", value: "156", icon: "BookOpen" },
            { label: "AI Инструменти", value: "34", icon: "Wrench" }
          ]?.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card border border-border rounded-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ai-blue/10 rounded-lg mb-3">
                <Icon name={stat?.icon} size={24} className="text-ai-blue" />
              </div>
              <div className="font-headline font-bold text-2xl text-foreground mb-1">
                {stat?.value}
              </div>
              <div className="font-cta text-sm text-text-secondary">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIHeroSection;