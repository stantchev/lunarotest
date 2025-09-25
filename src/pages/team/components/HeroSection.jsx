import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-cyber-green/5 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyber-green rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Users" size={32} color="white" strokeWidth={2} />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Zap" size={14} color="white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        <h1 className="font-headline font-bold text-4xl lg:text-5xl text-foreground mb-6">
          Нашият <span className="text-gradient bg-gradient-to-r from-primary to-cyber-green bg-clip-text text-transparent">Експертен Екип</span>
        </h1>
        
        <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
          Запознайте се с експерта зад Linaro News - Милен Станчев, който води платформата 
          с дълбоки знания в киберсигурността, SEO оптимизацията и изкуствения интелект.
        </p>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-text-secondary">Години опит</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-cyber-green mb-2">247</div>
            <div className="text-sm text-text-secondary">Публикувани статии</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-ai-blue mb-2">8</div>
            <div className="text-sm text-text-secondary">Сертификата</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <div className="text-3xl font-bold text-accent mb-2">25</div>
            <div className="text-sm text-text-secondary">Консултирани компании</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;