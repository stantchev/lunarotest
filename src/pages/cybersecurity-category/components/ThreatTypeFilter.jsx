import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatTypeFilter = ({ selectedTypes, onTypeChange, threatCounts }) => {
  const threatTypes = [
    {
      id: 'malware',
      label: 'Малуер',
      icon: 'Bug',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'phishing',
      label: 'Фишинг',
      icon: 'Fish',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'ransomware',
      label: 'Рансъмуер',
      icon: 'Lock',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'ddos',
      label: 'DDoS',
      icon: 'Zap',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'data-breach',
      label: 'Изтичане на данни',
      icon: 'Database',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'social-engineering',
      label: 'Социално инженерство',
      icon: 'Users',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const handleTypeToggle = (typeId) => {
    const newSelectedTypes = selectedTypes?.includes(typeId)
      ? selectedTypes?.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    onTypeChange(newSelectedTypes);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Тип заплахи</h3>
        {selectedTypes?.length > 0 && (
          <button
            onClick={() => onTypeChange([])}
            className="text-sm text-text-secondary hover:text-foreground transition-colors"
          >
            Изчисти всички
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {threatTypes?.map((type) => {
          const isSelected = selectedTypes?.includes(type?.id);
          const count = threatCounts?.[type?.id] || 0;
          
          return (
            <button
              key={type?.id}
              onClick={() => handleTypeToggle(type?.id)}
              className={`p-3 rounded-lg border transition-all duration-200 text-left hover:shadow-md ${
                isSelected
                  ? `${type?.bgColor} ${type?.borderColor} ${type?.color} shadow-sm`
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon 
                  name={type?.icon} 
                  size={20} 
                  className={isSelected ? type?.color : 'text-gray-500'} 
                />
                <span className={`text-sm font-medium ${isSelected ? type?.color : 'text-gray-500'}`}>
                  {count}
                </span>
              </div>
              <div className="text-sm font-medium">{type?.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThreatTypeFilter;