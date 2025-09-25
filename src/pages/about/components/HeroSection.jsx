import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-ai-blue to-cyber-green text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Icon name="Shield" size={20} className="text-cyber-green" />
            <span className="font-mono text-sm font-medium">Доверена журналистика от 2020</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            За <span className="text-cyber-green">Linaro News</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-body text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Водещата българска платформа за технологични новини, киберсигурност и AI интелигентност. 
            Свързваме сложните технологични развития с практическото разбиране.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="font-headline text-3xl md:text-4xl font-bold text-cyber-green mb-2">50K+</div>
              <div className="font-cta text-sm text-white/80">Месечни читатели</div>
            </div>
            <div className="text-center">
              <div className="font-headline text-3xl md:text-4xl font-bold text-ai-blue mb-2">1200+</div>
              <div className="font-cta text-sm text-white/80">Публикувани статии</div>
            </div>
            <div className="text-center">
              <div className="font-headline text-3xl md:text-4xl font-bold text-conversion-orange mb-2">15+</div>
              <div className="font-cta text-sm text-white/80">Експертни автори</div>
            </div>
            <div className="text-center">
              <div className="font-headline text-3xl md:text-4xl font-bold text-white mb-2">4</div>
              <div className="font-cta text-sm text-white/80">Години опит</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;