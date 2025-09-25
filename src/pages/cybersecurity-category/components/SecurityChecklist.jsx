import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityChecklist = ({ checklist }) => {
  const [completedItems, setCompletedItems] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set(['basic']));

  const toggleItem = (itemId) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted?.has(itemId)) {
      newCompleted?.delete(itemId);
    } else {
      newCompleted?.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionId)) {
      newExpanded?.delete(sectionId);
    } else {
      newExpanded?.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getSectionProgress = (section) => {
    const totalItems = section?.items?.length;
    const completedCount = section?.items?.filter(item => completedItems?.has(item?.id))?.length;
    return { completed: completedCount, total: totalItems, percentage: (completedCount / totalItems) * 100 };
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'basic': return 'Shield';
      case 'advanced': return 'Lock';
      case 'enterprise': return 'Building';
      case 'incident': return 'AlertTriangle';
      default: return 'CheckSquare';
    }
  };

  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading security checklist...');
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} />
          <span>Контролен списък за сигурност</span>
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Изтегли PDF
        </Button>
      </div>
      <div className="space-y-4">
        {checklist?.sections?.map((section) => {
          const progress = getSectionProgress(section);
          const isExpanded = expandedSections?.has(section?.id);
          
          return (
            <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section?.id)}
                className="w-full p-4 bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={getSectionIcon(section?.type)} size={18} className="text-primary" />
                    <div>
                      <h4 className="font-medium text-foreground">{section?.title}</h4>
                      <p className="text-sm text-text-secondary">{section?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {progress?.completed}/{progress?.total}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {Math.round(progress?.percentage)}% завършено
                      </div>
                    </div>
                    
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress?.percentage}%` }}
                      ></div>
                    </div>
                    
                    <Icon
                      name={isExpanded ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-text-secondary"
                    />
                  </div>
                </div>
              </button>
              {isExpanded && (
                <div className="p-4 bg-white border-t border-border">
                  <div className="space-y-3">
                    {section?.items?.map((item) => {
                      const isCompleted = completedItems?.has(item?.id);
                      
                      return (
                        <div key={item?.id} className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleItem(item?.id)}
                            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isCompleted
                                ? 'bg-primary border-primary text-white' :'border-gray-300 hover:border-primary'
                            }`}
                          >
                            {isCompleted && <Icon name="Check" size={12} />}
                          </button>
                          <div className="flex-1">
                            <div className={`text-sm ${isCompleted ? 'line-through text-text-secondary' : 'text-foreground'}`}>
                              {item?.title}
                            </div>
                            {item?.description && (
                              <div className="text-xs text-text-secondary mt-1">
                                {item?.description}
                              </div>
                            )}
                            {item?.priority && (
                              <div className="mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  item?.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  item?.priority === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {item?.priority === 'high' && 'Висок приоритет'}
                                  {item?.priority === 'medium' && 'Среден приоритет'}
                                  {item?.priority === 'low' && 'Нисък приоритет'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Препоръка за сигурност</p>
            <p>Редовно актуализирайте този списък и проверявайте новите заплахи. Препоръчваме месечен преглед на всички точки.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityChecklist;