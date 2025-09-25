import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceTrackingWidget = () => {
  const [selectedMetric, setSelectedMetric] = useState('rankings');

  const metrics = {
    rankings: {
      title: 'Позиции в търсачките',
      icon: 'TrendingUp',
      color: 'blue',
      data: [
        { keyword: 'SEO оптимизация България', position: 3, change: +2, volume: '1.2K' },
        { keyword: 'техническо SEO', position: 7, change: -1, volume: '890' },
        { keyword: 'локално SEO София', position: 1, change: 0, volume: '650' },
        { keyword: 'SEO инструменти', position: 12, change: +5, volume: '2.1K' },
        { keyword: 'Google алгоритъм', position: 8, change: +3, volume: '1.8K' }
      ]
    },
    traffic: {
      title: 'Органичен трафик',
      icon: 'BarChart3',
      color: 'green',
      data: [
        { source: 'Google', visitors: 12450, change: +15.2, percentage: 78.5 },
        { source: 'Bing', visitors: 1890, change: +8.7, percentage: 11.9 },
        { source: 'Yahoo', visitors: 890, change: -2.1, percentage: 5.6 },
        { source: 'DuckDuckGo', visitors: 630, change: +22.3, percentage: 4.0 }
      ]
    },
    performance: {
      title: 'Core Web Vitals',
      icon: 'Gauge',
      color: 'purple',
      data: [
        { metric: 'LCP (Largest Contentful Paint)', value: '1.8s', status: 'good', target: '< 2.5s' },
        { metric: 'FID (First Input Delay)', value: '45ms', status: 'good', target: '< 100ms' },
        { metric: 'CLS (Cumulative Layout Shift)', value: '0.08', status: 'needs-improvement', target: '< 0.1' },
        { metric: 'FCP (First Contentful Paint)', value: '1.2s', status: 'good', target: '< 1.8s' }
      ]
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'good': return 'Добро';
      case 'needs-improvement': return 'Нужда от подобрение';
      case 'poor': return 'Лошо';
      default: return 'Неизвестно';
    }
  };

  const tabs = [
    { id: 'rankings', label: 'Позиции', icon: 'TrendingUp' },
    { id: 'traffic', label: 'Трафик', icon: 'BarChart3' },
    { id: 'performance', label: 'Производителност', icon: 'Gauge' }
  ];

  const renderRankingsData = () => (
    <div className="space-y-3">
      {metrics?.rankings?.data?.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{item?.keyword}</p>
            <p className="text-sm text-text-secondary">Обем: {item?.volume}/месец</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-semibold text-foreground">#{item?.position}</p>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(item?.change)}`}>
                <Icon name={getChangeIcon(item?.change)} size={12} />
                <span>{item?.change > 0 ? '+' : ''}{item?.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrafficData = () => (
    <div className="space-y-3">
      {metrics?.traffic?.data?.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">{item?.source}</p>
              <p className="text-sm text-text-secondary">{item?.percentage}% от трафика</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">{item?.visitors?.toLocaleString()}</p>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(item?.change)}`}>
              <Icon name={getChangeIcon(item?.change)} size={12} />
              <span>{item?.change > 0 ? '+' : ''}{item?.change}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformanceData = () => (
    <div className="space-y-3">
      {metrics?.performance?.data?.map((item, index) => (
        <div key={index} className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-foreground text-sm">{item?.metric}</p>
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(item?.status)}`}>
              {getStatusLabel(item?.status)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-foreground">{item?.value}</p>
            <p className="text-sm text-text-secondary">Цел: {item?.target}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedMetric) {
      case 'rankings': return renderRankingsData();
      case 'traffic': return renderTrafficData();
      case 'performance': return renderPerformanceData();
      default: return renderRankingsData();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Проследяване на производителността</h3>
            <p className="text-sm text-text-secondary">Мониторинг на SEO метрики в реalno време</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          Пълен отчет
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setSelectedMetric(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              selectedMetric === tab?.id
                ? 'bg-white text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="mb-6">
        {renderContent()}
      </div>
      {/* Summary Stats */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">+24%</p>
            <p className="text-sm text-text-secondary">Органичен трафик</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">87</p>
            <p className="text-sm text-text-secondary">Средна позиция</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">92</p>
            <p className="text-sm text-text-secondary">SEO резултат</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Последна актуализация: преди 2 часа
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} className="text-blue-600" />
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Обновяване на данните
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrackingWidget;