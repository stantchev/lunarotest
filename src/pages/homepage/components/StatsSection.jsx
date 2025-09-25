import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    articles: 0,
    readers: 0,
    experts: 0,
    threats: 0
  });

  const finalStats = {
    articles: 592,
    readers: 28400,
    experts: 45,
    threats: 1247
  };

  const statsData = [
    {
      id: 'articles',
      label: 'Публикувани статии',
      value: finalStats?.articles,
      icon: 'FileText',
      color: 'text-cyber-green',
      bgColor: 'bg-cyber-green/10',
      borderColor: 'border-cyber-green/30',
      suffix: '+',
      description: 'Експертни анализи и новини'
    },
    {
      id: 'readers',
      label: 'Активни читатели',
      value: finalStats?.readers,
      icon: 'Users',
      color: 'text-ai-blue',
      bgColor: 'bg-ai-blue/10',
      borderColor: 'border-ai-blue/30',
      suffix: '+',
      description: 'Месечни уникални посетители'
    },
    {
      id: 'experts',
      label: 'Експерти автори',
      value: finalStats?.experts,
      icon: 'Award',
      color: 'text-conversion-orange',
      bgColor: 'bg-conversion-orange/10',
      borderColor: 'border-conversion-orange/30',
      suffix: '',
      description: 'Сертифицирани професионалисти'
    },
    {
      id: 'threats',
      label: 'Анализирани заплахи',
      value: finalStats?.threats,
      icon: 'AlertTriangle',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
      suffix: '+',
      description: 'Киберзаплахи и уязвимости'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = statsData?.map((stat) => {
      const increment = stat?.value / steps;
      let currentValue = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        currentValue = Math.min(Math.floor(increment * step), stat?.value);
        
        setCounters(prev => ({
          ...prev,
          [stat?.id]: currentValue
        }));

        if (step >= steps) {
          clearInterval(intervals?.find(interval => interval === this));
        }
      }, stepDuration);
    });

    return () => {
      intervals?.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Icon name="BarChart3" size={32} className="text-primary" />
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">
              Linaro News в цифри
            </h2>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Доверието на хилядите професионалисти и постоянното развитие на нашата платформа
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData?.map((stat, index) => (
            <div
              key={stat?.id}
              className={`relative group bg-background border-2 ${stat?.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-current to-transparent rounded-2xl"></div>
              </div>

              {/* Icon */}
              <div className={`relative w-16 h-16 ${stat?.bgColor} border ${stat?.borderColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon name={stat?.icon} size={28} className={stat?.color} />
              </div>

              {/* Counter */}
              <div className="relative space-y-2 mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className={`text-4xl lg:text-5xl font-bold ${stat?.color}`}>
                    {stat?.id === 'readers' ? formatNumber(counters?.[stat?.id]) : counters?.[stat?.id]?.toLocaleString()}
                  </span>
                  <span className={`text-2xl font-bold ${stat?.color}`}>
                    {stat?.suffix}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">
                  {stat?.label}
                </h3>
                
                <p className="text-sm text-text-secondary">
                  {stat?.description}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r from-${stat?.color?.split('-')?.[1]} to-${stat?.color?.split('-')?.[1]}/70 rounded-full transition-all duration-2000 ease-out`}
                    style={{ 
                      width: `${(counters?.[stat?.id] / stat?.value) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${stat?.bgColor}`}></div>
            </div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {/* Trust Metrics */}
          <div className="text-center p-6 bg-background border border-border rounded-xl">
            <div className="w-12 h-12 bg-success/10 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">99.9% Точност</h3>
            <p className="text-text-secondary">на нашите киберсигурност анализи</p>
          </div>

          {/* Response Time */}
          <div className="text-center p-6 bg-background border border-border rounded-xl">
            <div className="w-12 h-12 bg-ai-blue/10 border border-ai-blue/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={24} className="text-ai-blue" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">&lt; 2 часа</h3>
            <p className="text-text-secondary">средно време за покритие на важни новини</p>
          </div>

          {/* Community Engagement */}
          <div className="text-center p-6 bg-background border border-border rounded-xl">
            <div className="w-12 h-12 bg-conversion-orange/10 border border-conversion-orange/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={24} className="text-conversion-orange" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">4.8/5</h3>
            <p className="text-text-secondary">средна оценка от нашите читатели</p>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="mt-16 bg-gradient-to-r from-dark-bg/50 to-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <h3 className="text-xl font-semibold text-text-off-white">
                  Активност в реalno време
                </h3>
              </div>
              <p className="text-text-medium-gray">
                Следете живата статистика на нашата платформа
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-green">127</div>
                <div className="text-sm text-text-medium-gray">Онлайн сега</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-blue">43</div>
                <div className="text-sm text-text-medium-gray">Четат статии</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-conversion-orange">8</div>
                <div className="text-sm text-text-medium-gray">Нови абонати</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2</div>
                <div className="text-sm text-text-medium-gray">Нови заплахи</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;