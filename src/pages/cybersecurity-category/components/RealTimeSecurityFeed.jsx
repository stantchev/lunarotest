import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeSecurityFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock real-time feed data
  const mockFeeds = [
    {
      id: 1,
      source: 'CERT-BG',
      type: 'alert',
      severity: 'high',
      title: 'Нова фишинг кампания насочена към български банки',
      timestamp: new Date(Date.now() - 300000),
      description: 'Засечена е нова фишинг кампания, която имитира интерфейса на водещи български банки.',
      affectedSectors: ['Банкиране', 'Финанси']
    },
    {
      id: 2,
      source: 'Microsoft Security',
      type: 'update',
      severity: 'medium',
      title: 'Критична актуализация за Windows Defender',
      timestamp: new Date(Date.now() - 600000),
      description: 'Издадена е спешна актуализация за Windows Defender за защита срещу нови малуер варианти.',
      affectedSectors: ['IT', 'Корпоративни']
    },
    {
      id: 3,
      source: 'NIST',
      type: 'advisory',
      severity: 'critical',
      title: 'Уязвимост в Apache Log4j - CVE-2024-0001',
      timestamp: new Date(Date.now() - 900000),
      description: 'Открита е критична уязвимост в Apache Log4j библиотеката, която може да доведе до отдалечено изпълнение на код.',
      affectedSectors: ['Всички сектори']
    },
    {
      id: 4,
      source: 'Kaspersky',
      type: 'threat',
      severity: 'high',
      title: 'Нов рансъмуер вариант "BulgarianLock"',
      timestamp: new Date(Date.now() - 1200000),
      description: 'Засечен е нов рансъмуер вариант, който специално насочва български организации.',
      affectedSectors: ['Здравеопазване', 'Образование']
    },
    {
      id: 5,
      source: 'EU-CERT',
      type: 'warning',
      severity: 'medium',
      title: 'Увеличена DDoS активност в Източна Европа',
      timestamp: new Date(Date.now() - 1500000),
      description: 'Наблюдава се значително увеличение на DDoS атаки срещу критична инфраструктура в региона.',
      affectedSectors: ['Енергетика', 'Телекомуникации']
    }
  ];

  useEffect(() => {
    setFeeds(mockFeeds);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive) {
        setLastUpdate(new Date());
        // Simulate new feed item occasionally
        if (Math.random() < 0.3) {
          const newFeed = {
            id: Date.now(),
            source: 'Live Feed',
            type: 'alert',
            severity: 'medium',
            title: 'Нова заплаха засечена в реално време',
            timestamp: new Date(),
            description: 'Автоматично генерирано предупреждение от системата за мониторинг.',
            affectedSectors: ['Общо']
          };
          setFeeds(prev => [newFeed, ...prev?.slice(0, 4)]);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'AlertTriangle'
        };
      case 'high':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          icon: 'AlertCircle'
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: 'Info'
        };
      default:
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: 'Bell'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertTriangle';
      case 'update': return 'Download';
      case 'advisory': return 'FileText';
      case 'threat': return 'Shield';
      case 'warning': return 'AlertCircle';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'току-що';
    if (diffInMinutes < 60) return `преди ${diffInMinutes} мин`;
    if (diffInMinutes < 1440) return `преди ${Math.floor(diffInMinutes / 60)} ч`;
    return `преди ${Math.floor(diffInMinutes / 1440)} дни`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Radio" size={20} />
          <span>Новини в реално време</span>
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-text-secondary">
              {isLive ? 'НА ЖИВО' : 'СПРЯНО'}
            </span>
          </div>
          
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {isLive ? 'Спри' : 'Стартирай'}
          </button>
        </div>
      </div>
      <div className="text-xs text-text-secondary mb-4">
        Последна актуализация: {lastUpdate?.toLocaleTimeString('bg-BG')}
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {feeds?.map((feed) => {
          const severityConfig = getSeverityConfig(feed?.severity);
          
          return (
            <div key={feed?.id} className={`p-4 rounded-lg border ${severityConfig?.bgColor} ${severityConfig?.borderColor}`}>
              <div className="flex items-start space-x-3">
                <Icon name={getTypeIcon(feed?.type)} size={16} className={severityConfig?.color} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-secondary">
                      {feed?.source}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatTimeAgo(feed?.timestamp)}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    {feed?.title}
                  </h4>
                  
                  <p className="text-xs text-text-secondary mb-3">
                    {feed?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {feed?.affectedSectors?.map((sector, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white/50 text-gray-700"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                    
                    <span className={`text-xs font-medium ${severityConfig?.color}`}>
                      {feed?.severity === 'critical' && 'КРИТИЧНО'}
                      {feed?.severity === 'high' && 'ВИСОКО'}
                      {feed?.severity === 'medium' && 'СРЕДНО'}
                      {feed?.severity === 'low' && 'НИСКО'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          Виж всички новини
        </button>
      </div>
    </div>
  );
};

export default RealTimeSecurityFeed;