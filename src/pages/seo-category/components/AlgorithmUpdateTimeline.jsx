import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlgorithmUpdateTimeline = () => {
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const updates = [
    {
      id: 1,
      date: '2024-09-15',
      title: 'Google September 2024 Core Update',
      type: 'Core Update',
      impact: 'high',
      status: 'rolling-out',
      description: 'Значителни промени в алгоритъма за подобряване на качеството на резултатите от търсене.',
      details: `Тази актуализация се фокусира върху подобряването на релевантността на съдържанието и потребителския опит. Очакваните промени включват:\n\n• По-добро разпознаване на качествено съдържание\n• Подобрена оценка на E-A-T сигналите\n• Засилено внимание към потребителския опит\n• Промени в локалните резултати от търсене`,
      affectedSites: '15-20%',
      recommendations: [
        'Прегледайте качеството на съдържанието',
        'Подобрете Core Web Vitals показателите',
        'Актуализирайте E-A-T сигналите'
      ]
    },
    {
      id: 2,
      date: '2024-08-28',
      title: 'Spam Update August 2024',
      type: 'Spam Update',
      impact: 'medium',
      status: 'completed',
      description: 'Актуализация насочена към борбата със спам съдържание и манипулативни SEO техники.',
      details: `Тази актуализация се насочва към:\n\n• Автоматично генерирано съдържание с ниско качество\n• Манипулативни link building схеми\n• Keyword stuffing и други спам техники\n• Скрито съдържание и cloaking`,
      affectedSites: '5-8%',
      recommendations: [
        'Премахнете спам съдържание',
        'Прегледайте backlink профила',
        'Избягвайте keyword stuffing'
      ]
    },
    {
      id: 3,
      date: '2024-07-20',
      title: 'Local Search Enhancement',
      type: 'Local Update',
      impact: 'medium',
      status: 'completed',
      description: 'Подобрения в локалните резултати от търсене за по-добра релевантност.',
      details: `Промените включват:\n\n• По-точно геотаргетиране\n• Подобрена интеграция с Google My Business\n• Засилено значение на локалните отзиви\n• По-добро разпознаване на локални заявки`,
      affectedSites: '10-12%',
      recommendations: [
        'Оптимизирайте Google My Business профила',
        'Събирайте повече локални отзиви',
        'Подобрете локалните NAP данни'
      ]
    },
    {
      id: 4,
      date: '2024-06-10',
      title: 'Page Experience Update',
      type: 'UX Update',
      impact: 'low',
      status: 'completed',
      description: 'Актуализация фокусирана върху подобряването на потребителския опит.',
      details: `Основните области на фокус:\n\n• Core Web Vitals оптимизация\n• Mobile-first индексиране\n• Безопасност на сайта (HTTPS)\n• Отсъствие на intrusive interstitials`,
      affectedSites: '3-5%',
      recommendations: [
        'Подобрете Core Web Vitals',
        'Оптимизирайте за мобилни устройства',
        'Внедрете HTTPS'
      ]
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'rolling-out': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'announced': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'rolling-out': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'announced': return 'Bell';
      default: return 'Info';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Алгоритмични Актуализации</h3>
            <p className="text-sm text-text-secondary">Последни промени в Google алгоритъма</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          Пълна история
        </Button>
      </div>
      {/* Timeline */}
      <div className="space-y-4">
        {updates?.map((update, index) => (
          <div key={update?.id} className="relative">
            {/* Timeline Line */}
            {index < updates?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
            )}
            
            <div className="flex space-x-4">
              {/* Timeline Dot */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name={getStatusIcon(update?.status)} size={18} className="text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{update?.title}</h4>
                      <p className="text-sm text-text-secondary mb-2">{update?.description}</p>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-text-secondary">{formatDate(update?.date)}</span>
                        <span className={`px-2 py-1 rounded-md border font-medium ${getImpactColor(update?.impact)}`}>
                          {update?.impact === 'high' ? 'Висок импакт' : 
                           update?.impact === 'medium' ? 'Среден импакт' : 'Нисък импакт'}
                        </span>
                        <span className={`px-2 py-1 rounded-md border font-medium ${getStatusColor(update?.status)}`}>
                          {update?.status === 'rolling-out' ? 'В процес' :
                           update?.status === 'completed' ? 'Завършена' : 'Обявена'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUpdate(selectedUpdate === update?.id ? null : update?.id)}
                      iconName={selectedUpdate === update?.id ? "ChevronUp" : "ChevronDown"}
                      iconPosition="right"
                      iconSize={16}
                    >
                      Детайли
                    </Button>
                  </div>
                  
                  {/* Expanded Details */}
                  {selectedUpdate === update?.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Описание на промените:</h5>
                          <p className="text-sm text-text-secondary whitespace-pre-line mb-4">
                            {update?.details}
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Globe" size={16} className="text-blue-600" />
                            <span className="text-text-secondary">
                              Засегнати сайтове: <span className="font-medium text-foreground">{update?.affectedSites}</span>
                            </span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Препоръки за действие:</h5>
                          <ul className="space-y-2">
                            {update?.recommendations?.map((rec, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <Icon name="CheckCircle" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-text-secondary">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Последна актуализация: 24 септември 2024
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={14} className="text-blue-600" />
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Абонирайте се за известия
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmUpdateTimeline;