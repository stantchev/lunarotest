import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryNavigation = () => {
  const categories = [
    {
      id: 1,
      name: "Киберсигурност",
      slug: "cybersecurity-category",
      description: "Защита от киберзаплахи, анализи на уязвимости и експертни препоръки за сигурност",
      icon: "Shield",
      color: "cyber-green",
      bgGradient: "from-cyber-green/20 to-cyber-green/5",
      borderColor: "border-cyber-green/30",
      hoverColor: "hover:border-cyber-green",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: {
        articles: 247,
        weeklyReads: "12.4K",
        experts: 18
      },
      recentTopics: [
        "Zero-day атаки",
        "Квантова криптография", 
        "GDPR съответствие",
        "Ransomware защита"
      ],
      trending: true
    },
    {
      id: 2,
      name: "SEO",
      slug: "seo-category", 
      description: "Оптимизация за търсачки, Google алгоритми и стратегии за по-добра видимост",
      icon: "Search",
      color: "conversion-orange",
      bgGradient: "from-conversion-orange/20 to-conversion-orange/5",
      borderColor: "border-conversion-orange/30",
      hoverColor: "hover:border-conversion-orange",
      image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: {
        articles: 189,
        weeklyReads: "8.7K",
        experts: 12
      },
      recentTopics: [
        "Google Core Updates",
        "AI в SEO",
        "Local SEO",
        "Technical SEO"
      ],
      trending: false
    },
    {
      id: 3,
      name: "AI",
      slug: "ai-category",
      description: "Изкуствен интелект, машинно обучение и иновации в AI технологиите",
      icon: "Brain",
      color: "ai-blue", 
      bgGradient: "from-ai-blue/20 to-ai-blue/5",
      borderColor: "border-ai-blue/30",
      hoverColor: "hover:border-ai-blue",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600",
      stats: {
        articles: 156,
        weeklyReads: "15.2K",
        experts: 15
      },
      recentTopics: [
        "ChatGPT развитие",
        "Computer Vision",
        "NLP приложения",
        "AI етика"
      ],
      trending: true
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-cyber-green via-conversion-orange to-ai-blue rounded-full"></div>
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-foreground">
              Експертни категории
            </h2>
            <div className="w-1 h-12 bg-gradient-to-b from-ai-blue via-conversion-orange to-cyber-green rounded-full"></div>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Задълбочени анализи и актуални новини от водещите области на технологичното развитие
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              to={`/${category?.slug}`}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${category?.bgGradient} border-2 ${category?.borderColor} ${category?.hoverColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 hover-lift`}>
                {/* Trending Badge */}
                {category?.trending && (
                  <div className="absolute -top-3 -right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    HOT
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-${category?.color}/20 border border-${category?.color}/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon 
                      name={category?.icon} 
                      size={32} 
                      className={`text-${category?.color}`}
                    />
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold text-${category?.color}`}>
                      {category?.stats?.articles}
                    </div>
                    <div className="text-sm text-text-secondary">статии</div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                    {category?.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {category?.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className={`text-lg font-bold text-${category?.color}`}>
                      {category?.stats?.weeklyReads}
                    </div>
                    <div className="text-xs text-text-secondary">четения/седмица</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <div className={`text-lg font-bold text-${category?.color}`}>
                      {category?.stats?.experts}
                    </div>
                    <div className="text-xs text-text-secondary">експерти</div>
                  </div>
                </div>

                {/* Recent Topics */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Актуални теми:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category?.recentTopics?.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-background/70 border border-border rounded-full text-xs text-text-secondary hover:text-foreground transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-text-secondary group-hover:text-primary transition-colors">
                    <span className="font-medium">Разгледай категорията</span>
                    <Icon 
                      name="ArrowRight" 
                      size={16} 
                      className="group-hover:translate-x-1 transition-transform" 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-text-secondary">Активна</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 glow-${category?.color?.replace('-', '')}`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={24} className="text-primary" />
              <h3 className="text-xl font-headline font-bold text-foreground">
                Не пропускай нищо важно
              </h3>
            </div>
            <p className="text-text-secondary max-w-md">
              Абонирай се за нашия newsletter и получавай най-важните новини директно в пощата си
            </p>
            <Link
              to="/search-and-archive"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Icon name="Archive" size={18} />
              <span>Разгледай архива</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;