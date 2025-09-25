import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EthicsPolicyPage = () => {
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    anonymous: false
  });
  
  const [expandedSections, setExpandedSections] = useState({
    'editorial-independence': true
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleReportSubmit = (e) => {
    e?.preventDefault();
    console.log('Ethics violation report submitted:', reportForm);
    // In a real app, this would send the report to backend
    setReportForm({ type: '', description: '', anonymous: false });
    alert('Докладът беше изпратен успешно. Благодарим за вашето съдействие.');
  };

  const ethicsData = {
    lastUpdated: "24 септември 2025",
    version: "2.1",
    frameworks: [
      {
        id: 'editorial-independence',
        title: 'Редакционна независимост',
        icon: 'Shield',
        principles: [
          'Пълна редакционна автономия без влияние от рекламодатели или партньори',
          'Прозрачно разкриване на всички финансови връзки и партньорства',
          'Ясно разделение между редакционно съдържание и рекламни материали',
          'Защита на журналистическата обективност в освещаването на технологични теми'
        ]
      },
      {
        id: 'source-protection',
        title: 'Защита на източници',
        icon: 'UserCheck',
        principles: [
          'Абсолютна защита на анонимните източници и whistleblower-и',
          'Криптирани канали за комуникация с чувствителни източници',
          'Строги протоколи за съхранение на лични данни и комуникации',
          'Правни процедури за защита при съдебни разследвания'
        ]
      },
      {
        id: 'fact-checking',
        title: 'Проверка на фактите',
        icon: 'Search',
        principles: [
          'Многостепенна верификация на всяка информация преди публикуване',
          'Използване на първични източници и експертни консултации',
          'Прозрачни методологии за проверка на сложни технически твърдения',
          'Бързи корекции и публични извинения при установени грешки'
        ]
      },
      {
        id: 'conflict-resolution',
        title: 'Разрешаване на конфликти',
        icon: 'Scale',
        principles: [
          'Ясни процедури за докладване на етични нарушения',
          'Независима комисия за разглеждане на оплаквания',
          'Публични отчети за предприети действия по сериозни случаи',
          'Периодично обучение на екипа по етични стандарти'
        ]
      }
    ],
    emergingChallenges: [
      {
        challenge: 'AI-генерирано съдържание',
        approach: 'Задължително означаване и прозрачност при използване на AI помощ'
      },
      {
        challenge: 'Алгоритмична предвзетост',
        approach: 'Критичен анализ и разкриване на потенциални предразсъдъци в AI системи'
      },
      {
        challenge: 'Киберсигурност и отговорно разкриване',
        approach: 'Балансиране между публичния интерес и потенциалните рискове'
      },
      {
        challenge: 'Дълбоки фалшификати (Deepfakes)',
        approach: 'Строги протоколи за верификация на аудио-визуално съдържание'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Етична политика - Linaro News</title>
        <meta name="description" content="Всеобхватни етични стандарти за журналистическа почтеност и професионално поведение при освещаването на технологии." />
        <meta name="keywords" content="етична политика, журналистическа етика, технологичен репортаж, редакционни стандарти" />
        <meta property="og:title" content="Етична политика - Linaro News" />
        <meta property="og:description" content="Етични стандарти за журналистическа почтеност в технологичния репортаж" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://linaro-news.bg/ethics-policy" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="Heart" size={32} color="white" strokeWidth={2} />
                </div>
              </div>
              
              <h1 className="text-4xl font-headline font-bold text-foreground mb-4">
                Етична политика
              </h1>
              
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
                Всеобхватни етични стандарти за журналистическа почтеност и професионално поведение при освещаването на технологии
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="FileCheck" size={16} />
                  <span>Версия: {ethicsData?.version}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Обновено: {ethicsData?.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} />
                  <span>Международни стандарти</span>
                </div>
              </div>
            </div>

            {/* Ethics Framework */}
            <div className="space-y-6 mb-8">
              {ethicsData?.frameworks?.map((framework) => (
                <div key={framework?.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(framework?.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Icon name={framework?.icon} size={20} color="white" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {framework?.title}
                      </h2>
                    </div>
                    <Icon 
                      name={expandedSections?.[framework?.id] ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-secondary" 
                    />
                  </button>
                  
                  {expandedSections?.[framework?.id] && (
                    <div className="px-6 pb-6 border-t border-border">
                      <div className="space-y-3 pt-4">
                        {framework?.principles?.map((principle, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary leading-relaxed">
                              {principle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Emerging Challenges */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-border rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                <Icon name="AlertTriangle" size={24} />
                <span>Възникващи етични предизвикателства</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {ethicsData?.emergingChallenges?.map((item, index) => (
                  <div key={index} className="bg-white/50 dark:bg-black/20 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                      <Icon name="Zap" size={16} className="text-orange-500" />
                      <span>{item?.challenge}</span>
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {item?.approach}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Feedback */}
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                <Icon name="Users" size={24} />
                <span>Обратна връзка от общността</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name="MessageSquare" size={24} className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Етични запитвания</h4>
                  <p className="text-sm text-text-secondary">
                    ethics@linaro-news.bg
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name="AlertCircle" size={24} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Докладване на нарушения</h4>
                  <p className="text-sm text-text-secondary">
                    Анонимен канал за сигнали
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name="BookOpen" size={24} className="text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Прозрачност</h4>
                  <p className="text-sm text-text-secondary">
                    Публични отчети за етика
                  </p>
                </div>
              </div>
            </div>

            {/* Ethics Violation Report Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                <Icon name="Shield" size={24} />
                <span>Докладване на етично нарушение</span>
              </h3>
              
              <form onSubmit={handleReportSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Тип нарушение
                    </label>
                    <select
                      value={reportForm?.type}
                      onChange={(e) => setReportForm(prev => ({ ...prev, type: e?.target?.value }))}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    >
                      <option value="">Изберете тип</option>
                      <option value="editorial-bias">Редакционна предвзетост</option>
                      <option value="conflict-interest">Конфликт на интереси</option>
                      <option value="factual-error">Фактологична грешка</option>
                      <option value="source-protection">Нарушение на защитата на източници</option>
                      <option value="transparency">Липса на прозрачност</option>
                      <option value="other">Друго</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reportForm?.anonymous}
                        onChange={(e) => setReportForm(prev => ({ ...prev, anonymous: e?.target?.checked }))}
                        className="w-5 h-5 text-emerald-600 border-border rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-text-secondary">
                        Анонимен доклад
                      </span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Описание на нарушението
                  </label>
                  <textarea
                    value={reportForm?.description}
                    onChange={(e) => setReportForm(prev => ({ ...prev, description: e?.target?.value }))}
                    placeholder="Моля, опишете подробно ситуацията и предоставете всички релевантни детайли..."
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    required
                  />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    type="submit"
                    variant="default"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    iconName="Send"
                    iconPosition="left"
                  >
                    Изпрати доклад
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Изтегли етичен кодекс
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    Международни стандарти
                  </Button>
                </div>
              </form>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default EthicsPolicyPage;