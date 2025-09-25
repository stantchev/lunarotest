import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ThreatTimeline = ({ threats }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  const periods = [
    { id: '24h', label: '24 часа' },
    { id: '7d', label: '7 дни' },
    { id: '30d', label: '30 дни' },
    { id: '90d', label: '90 дни' }
  ];

  const getThreatIcon = (type) => {
    switch (type) {
      case 'malware': return 'Bug';
      case 'phishing': return 'Fish';
      case 'ransomware': return 'Lock';
      case 'ddos': return 'Zap';
      case 'data-breach': return 'Database';
      default: return 'AlertTriangle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `преди ${diffInMinutes} мин`;
    } else if (diffInMinutes < 1440) {
      return `преди ${Math.floor(diffInMinutes / 60)} ч`;
    } else {
      return `преди ${Math.floor(diffInMinutes / 1440)} дни`;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Timeline" size={20} />
          <span>Хронология на заплахите</span>
        </h3>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {periods?.map((period) => (
            <button
              key={period?.id}
              onClick={() => setSelectedPeriod(period?.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedPeriod === period?.id
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              {period?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {threats?.map((threat, index) => (
          <div key={threat?.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat?.severity)} flex-shrink-0`}></div>
              {index < threats?.length - 1 && (
                <div className="w-px h-12 bg-border mt-2"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Icon name={getThreatIcon(threat?.type)} size={16} className="text-text-secondary" />
                  <span className="text-sm font-medium text-foreground">{threat?.title}</span>
                </div>
                <span className="text-xs text-text-secondary flex-shrink-0">
                  {formatTimeAgo(threat?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-2">{threat?.description}</p>
              
              <div className="flex items-center space-x-3 text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  threat?.severity === 'critical' ? 'bg-red-100 text-red-800' :
                  threat?.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                  threat?.severity === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {threat?.severity === 'critical' && 'Критично'}
                  {threat?.severity === 'high' && 'Високо'}
                  {threat?.severity === 'medium' && 'Средно'}
                  {threat?.severity === 'low' && 'Ниско'}
                </span>
                
                <span className="text-text-secondary">
                  Засегнати: {threat?.affectedSystems}
                </span>
                
                {threat?.mitigated && (
                  <span className="flex items-center space-x-1 text-green-600">
                    <Icon name="CheckCircle" size={12} />
                    <span>Неутрализирано</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          Виж пълната хронология
        </button>
      </div>
    </div>
  );
};

export default ThreatTimeline;