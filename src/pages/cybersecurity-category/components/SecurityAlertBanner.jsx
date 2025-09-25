import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityAlertBanner = ({ alerts }) => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !alerts || alerts?.length === 0) return null;

  const alert = alerts?.[currentAlert];

  const nextAlert = () => {
    setCurrentAlert((prev) => (prev + 1) % alerts?.length);
  };

  const prevAlert = () => {
    setCurrentAlert((prev) => (prev - 1 + alerts?.length) % alerts?.length);
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bgColor: 'bg-red-600',
          textColor: 'text-white',
          icon: 'AlertTriangle'
        };
      case 'high':
        return {
          bgColor: 'bg-orange-600',
          textColor: 'text-white',
          icon: 'AlertCircle'
        };
      case 'medium':
        return {
          bgColor: 'bg-yellow-600',
          textColor: 'text-white',
          icon: 'Info'
        };
      default:
        return {
          bgColor: 'bg-blue-600',
          textColor: 'text-white',
          icon: 'Bell'
        };
    }
  };

  const config = getSeverityConfig(alert?.severity);

  return (
    <div className={`${config?.bgColor} ${config?.textColor} py-3 px-4 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Icon name={config?.icon} size={20} className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                Спешно предупреждение
              </span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <p className="text-sm font-medium truncate">{alert?.title}</p>
            <p className="text-xs opacity-90 truncate">{alert?.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {alerts?.length > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={prevAlert}
                className="p-1 rounded hover:bg-white/20 transition-colors"
                aria-label="Предишно предупреждение"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <span className="text-xs px-2">
                {currentAlert + 1}/{alerts?.length}
              </span>
              <button
                onClick={nextAlert}
                className="p-1 rounded hover:bg-white/20 transition-colors"
                aria-label="Следващо предупреждение"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1"
            iconName="X"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityAlertBanner;