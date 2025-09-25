import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SEOHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="cyber-grid"></div>
      </div>
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-25 animate-pulse delay-500"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Category Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-green-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Icon name="Search" size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">SEO Категория</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-6 leading-tight">
            SEO Стратегии и
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Оптимизация</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Открийте най-новите SEO техники, алгоритмични актуализации и практически съвети за подобряване на вашата онлайн видимост в българския и международния пазар.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-100">
              <Icon name="FileText" size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-foreground">240+ SEO статии</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-100">
              <Icon name="TrendingUp" size={18} className="text-green-600" />
              <span className="text-sm font-medium text-foreground">Ежедневни актуализации</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-100">
              <Icon name="Users" size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-foreground">15K+ SEO специалисти</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              iconName="BookOpen"
              iconPosition="left"
              iconSize={20}
            >
              Разгледайте SEO Ръководства
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold"
              iconName="Bell"
              iconPosition="left"
              iconSize={20}
            >
              Абонирайте се за SEO новини
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { label: 'Алгоритмични актуализации', icon: 'Zap' },
              { label: 'Техническо SEO', icon: 'Settings' },
              { label: 'Локално SEO', icon: 'MapPin' },
              { label: 'SEO инструменти', icon: 'Wrench' },
              { label: 'Анализ на конкуренцията', icon: 'BarChart3' }
            ]?.map((item, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-200 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:shadow-md"
              >
                <Icon name={item?.icon} size={14} className="text-blue-600" />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOHeroSection;