import React from 'react';
import Icon from '../../../components/AppIcon';

const ExpertVerificationBadge = ({ expert, verificationLevel, specialization }) => {
  const getVerificationConfig = (level) => {
    switch (level) {
      case 'certified':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200',
          icon: 'Award',
          label: 'Сертифициран експерт'
        };
      case 'verified':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: 'CheckCircle',
          label: 'Потвърден експерт'
        };
      case 'contributor':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-200',
          icon: 'User',
          label: 'Сътрудник'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: 'Shield',
          label: 'Автор'
        };
    }
  };

  const config = getVerificationConfig(verificationLevel);

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${config?.bgColor} ${config?.borderColor} ${config?.textColor}`}>
      <Icon name={config?.icon} size={14} />
      <span className="text-xs font-medium">{config?.label}</span>
      {specialization && (
        <>
          <div className="w-1 h-1 bg-current rounded-full opacity-50"></div>
          <span className="text-xs opacity-80">{specialization}</span>
        </>
      )}
    </div>
  );
};

export default ExpertVerificationBadge;