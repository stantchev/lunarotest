import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DictionaryHeroSection = () => {
  const stats = [
    { icon: 'BookOpen', label: 'AI Термини', value: '247+', color: 'text-ai-blue' },
    { icon: 'Users', label: 'Активни потребители', value: '12K+', color: 'text-cyber-green' },
    { icon: 'Star', label: 'Запазени термини', value: '3.5K+', color: 'text-amber-500' },
    { icon: 'TrendingUp', label: 'Ежедневни търсения', value: '890+', color: 'text-accent' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-ai-blue/5 via-background to-cyber-green/5 pt-24 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-ai-blue/10 border border-ai-blue/20 rounded-full px-6 py-3 mb-6">
            <Icon name="BookOpen" size={24} className="text-ai-blue" />
            <span className="font-headline font-bold text-lg text-ai-blue">
              AI Речник
            </span>
          </div>
          
          <h1 className="font-headline font-bold text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            Българската AI Терминология
          </h1>
          
          <p className="font-body text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
            Comprehensive Bulgarian-language artificial intelligence terminology resource providing clear definitions 
            and practical context for AI concepts. Interactive dictionary features alphabetical organization with 
            search functionality, category filtering, and cross-referencing between related terms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              className="bg-gradient-to-r from-ai-blue to-cyber-green hover:from-ai-blue/90 hover:to-cyber-green/90 text-white font-cta font-semibold"
              iconName="Search"
              iconPosition="left"
            >
              Започни търсенето
            </Button>
            
            <Button
              variant="outline"
              className="border-ai-blue text-ai-blue hover:bg-ai-blue hover:text-white"
              iconName="BookmarkPlus"
              iconPosition="left"
            >
              Моите запазени термини
            </Button>
          </div>
        </div>

        {/* Quick Access Categories */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-lg">
          <h2 className="font-headline font-bold text-xl text-foreground mb-6 text-center">
            Популярни категории
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Основни понятия', icon: 'Brain', count: '45', color: 'bg-ai-blue/10 text-ai-blue border-ai-blue/20' },
              { name: 'Машинно обучение', icon: 'Cpu', count: '78', color: 'bg-cyber-green/10 text-cyber-green border-cyber-green/20' },
              { name: 'Невронни мрежи', icon: 'Network', count: '56', color: 'bg-accent/10 text-accent border-accent/20' },
              { name: 'Компютърно зрение', icon: 'Eye', count: '34', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' }
            ]?.map((category, index) => (
              <button
                key={index}
                className={`p-4 border rounded-xl hover:scale-105 transition-all duration-200 ${category?.color}`}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon name={category?.icon} size={24} className="mb-2" />
                  <span className="font-cta font-medium text-sm mb-1">{category?.name}</span>
                  <span className="text-xs opacity-70">{category?.count} термина</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card border border-border rounded-xl hover-lift">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${stat?.color?.replace('text-', 'bg-')}/10`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
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

        {/* Features Highlight */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: 'Search',
              title: 'Интелигентно търсене',
              description: 'Търсете по български и английски термини, дефиниции и примери с гласово търсене'
            },
            {
              icon: 'Bookmark',
              title: 'Персонални колекции',
              description: 'Запазвайте любими термини с лични бележки и организирайте ги по категории'
            },
            {
              icon: 'Users',
              title: 'Общностни принос',
              description: 'Предлагайте нови термини и подобрения с редакторски преглед и одобрение'
            }
          ]?.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ai-blue/10 rounded-full mb-4">
                <Icon name={feature?.icon} size={28} className="text-ai-blue" />
              </div>
              <h3 className="font-headline font-bold text-lg text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="font-body text-text-secondary leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DictionaryHeroSection;