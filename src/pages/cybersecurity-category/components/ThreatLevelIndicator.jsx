import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatLevelIndicator = ({ level, count, description, trend }) => {
  const getLevelConfig = (level) => {
    switch (level) {
      case 'critical':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'AlertTriangle',
          label: 'Критично'
        };
      case 'high':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          icon: 'AlertCircle',
          label: 'Високо'
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: 'Info',
          label: 'Средно'
        };
      case 'low':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: 'CheckCircle',
          label: 'Ниско'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: 'Shield',
          label: 'Неизвестно'
        };
    }
  };

  const config = getLevelConfig(level);

  return (
    <div className={`p-4 rounded-lg border ${config?.bgColor} ${config?.borderColor} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon name={config?.icon} size={20} className={config?.color} />
          <span className={`font-semibold text-sm ${config?.color}`}>
            {config?.label}
          </span>
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={16} 
              className={trend === 'up' ? 'text-red-500' : trend === 'down' ? 'text-green-500' : 'text-gray-500'} 
            />
          </div>
        )}
      </div>
      <div className="mb-1">
        <span className="text-2xl font-bold text-foreground">{count}</span>
        <span className="text-sm text-text-secondary ml-1">заплахи</span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default ThreatLevelIndicator;