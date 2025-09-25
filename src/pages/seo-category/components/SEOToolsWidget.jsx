import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SEOToolsWidget = () => {
  const [activeTab, setActiveTab] = useState('audit');

  const tools = {
    audit: [
      {
        id: 1,
        name: 'SEO Site Audit',
        description: 'Анализирайте техническите проблеми на вашия сайт',
        icon: 'Search',
        color: 'blue',
        features: ['Техническо SEO', 'Скорост на зареждане', 'Mobile-friendly тест']
      },
      {
        id: 2,
        name: 'Keyword Density Checker',
        description: 'Проверете плътността на ключовите думи',
        icon: 'Target',
        color: 'green',
        features: ['Анализ на ключови думи', 'Плътност %', 'Препоръки']
      }
    ],
    research: [
      {
        id: 3,
        name: 'Keyword Research Tool',
        description: 'Открийте най-добрите ключови думи за вашия бизнес',
        icon: 'Key',
        color: 'purple',
        features: ['Обем на търсене', 'Конкуренция', 'CPC данни']
      },
      {
        id: 4,
        name: 'Competitor Analysis',
        description: 'Анализирайте SEO стратегиите на конкурентите',
        icon: 'Users',
        color: 'orange',
        features: ['Backlink анализ', 'Ключови думи', 'Позиции']
      }
    ],
    tracking: [
      {
        id: 5,
        name: 'Rank Tracker',
        description: 'Следете позициите си в Google',
        icon: 'TrendingUp',
        color: 'red',
        features: ['Ежедневно проследяване', 'Локални резултати', 'Мобилни позиции']
      },
      {
        id: 6,
        name: 'Backlink Monitor',
        description: 'Наблюдавайте вашите backlinks',
        icon: 'Link',
        color: 'indigo',
        features: ['Нови линкове', 'Загубени линкове', 'Качество на линковете']
      }
    ]
  };

  const tabs = [
    { id: 'audit', label: 'SEO Одит', icon: 'Search' },
    { id: 'research', label: 'Изследване', icon: 'Target' },
    { id: 'tracking', label: 'Проследяване', icon: 'TrendingUp' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
      green: 'from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200',
      purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 border-purple-200',
      orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50 border-orange-200',
      red: 'from-red-500 to-red-600 text-red-600 bg-red-50 border-red-200',
      indigo: 'from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50 border-indigo-200'
    };
    return colors?.[color] || colors?.blue;
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Icon name="Wrench" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">SEO Инструменти</h3>
            <p className="text-sm text-text-secondary">Безплатни инструменти за оптимизация</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          Всички инструменти
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-white text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools?.[activeTab]?.map((tool) => {
          const colorClasses = getColorClasses(tool?.color);
          const [gradientClass, textClass, bgClass, borderClass] = colorClasses?.split(' ');
          
          return (
            <div
              key={tool?.id}
              className="group border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={tool?.icon} size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                    {tool?.name}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {tool?.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {tool?.features?.map((feature, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${bgClass} ${textClass} border ${borderClass}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  iconName="Play"
                  iconPosition="left"
                  iconSize={14}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Стартирайте инструмента
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Всички инструменти са безплатни за използване
          </span>
          <div className="flex items-center space-x-1 text-green-600">
            <Icon name="Shield" size={14} />
            <span className="font-medium">SSL защитени</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOToolsWidget;