import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const breakingNews = {
    id: 1,
    title: "Нова киберзаплаха засяга българските банки - експертен анализ на уязвимостите",
    excerpt: "Киберсигурността на финансовия сектор в България е под заплаха след откриването на нова атака тип zero-day. Експертите препоръчват незабавни мерки за защита.",
    category: "Киберсигурност",
    categorySlug: "cybersecurity-category",
    author: "Димитър Петров",
    publishedAt: "2025-09-24T10:30:00Z",
    readTime: "8 мин четене",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200",
    isBreaking: true,
    tags: ["Киберсигурност", "Банки", "Zero-day", "България"]
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Преди минути";
    if (diffInHours < 24) return `Преди ${diffInHours} часа`;
    return `Преди ${Math.floor(diffInHours / 24)} дни`;
  };

  return (
    <section className="relative bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg min-h-[85vh] flex items-center overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      {/* Ambient Glow Effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-ai-blue/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Breaking News Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-mono font-bold text-accent uppercase tracking-wider">
                  ИЗВЪНРЕДНО
                </span>
              </div>
              <div className="text-sm text-text-off-white/70 font-mono">
                {formatTimeAgo(breakingNews?.publishedAt)}
              </div>
            </div>

            {/* Category Tag */}
            <div className="inline-flex">
              <Link
                to={`/${breakingNews?.categorySlug}`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-cyber-green/20 border border-cyber-green/30 rounded-lg hover:bg-cyber-green/30 transition-all duration-300 group"
              >
                <Icon name="Shield" size={16} className="text-cyber-green" />
                <span className="text-sm font-semibold text-cyber-green group-hover:text-white transition-colors">
                  {breakingNews?.category}
                </span>
              </Link>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-headline font-bold text-text-off-white leading-tight">
                {breakingNews?.title}
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-medium-gray font-body leading-relaxed">
                {breakingNews?.excerpt}
              </p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-text-medium-gray">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} />
                <span className="font-medium">{breakingNews?.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>{breakingNews?.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} />
                <span>2,847 прегледа</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {breakingNews?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-text-medium-gray hover:text-text-off-white hover:border-gray-600 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-cyber-green to-ai-blue hover:from-cyber-green/90 hover:to-ai-blue/90 text-white font-cta font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={20}
              >
                Прочети пълната статия
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-text-medium-gray text-text-off-white hover:bg-text-off-white hover:text-dark-bg transition-all duration-300"
                iconName="Bookmark"
                iconPosition="left"
                iconSize={18}
              >
                Запази за по-късно
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyber-green to-ai-blue rounded-full border-2 border-dark-bg"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-ai-blue to-accent rounded-full border-2 border-dark-bg"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-cyber-green rounded-full border-2 border-dark-bg"></div>
                </div>
                <span className="text-sm text-text-medium-gray">
                  +1,247 експерти четат това
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-text-medium-gray hover:text-cyber-green transition-colors">
                  <Icon name="Heart" size={16} />
                  <span className="text-sm">156</span>
                </button>
                <button className="flex items-center space-x-1 text-text-medium-gray hover:text-ai-blue transition-colors">
                  <Icon name="Share2" size={16} />
                  <span className="text-sm">89</span>
                </button>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent z-10"></div>
              <Image
                src={breakingNews?.image}
                alt={breakingNews?.title}
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      LIVE АНАЛИЗ
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <Icon name="TrendingUp" size={14} className="text-cyber-green" />
                    <span className="text-xs text-white font-medium">Trending #1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-dark-bg/90 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-green">24/7</div>
                  <div className="text-xs text-text-medium-gray">Мониторинг</div>
                </div>
                <div className="w-px h-8 bg-gray-800"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ai-blue">99.9%</div>
                  <div className="text-xs text-text-medium-gray">Точност</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-text-medium-gray">
          <span className="text-sm font-mono">Разгледай повече</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;