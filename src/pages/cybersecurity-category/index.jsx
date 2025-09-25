import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import ThreatLevelIndicator from './components/ThreatLevelIndicator';
import SecurityAlertBanner from './components/SecurityAlertBanner';

import ThreatTypeFilter from './components/ThreatTypeFilter';
import SecurityArticleCard from './components/SecurityArticleCard';
import ThreatTimeline from './components/ThreatTimeline';
import SecurityChecklist from './components/SecurityChecklist';
import RealTimeSecurityFeed from './components/RealTimeSecurityFeed';

const CybersecurityCategory = () => {
  const [selectedThreatTypes, setSelectedThreatTypes] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data for security alerts
  const securityAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Критична уязвимост в Microsoft Exchange Server',
      description: 'Засечена е нова zero-day уязвимост, която позволява отдалечено изпълнение на код. Препоръчва се незабавна актуализация.'
    },
    {
      id: 2,
      severity: 'high',
      title: 'Масова фишинг кампания насочена към български банки',
      description: 'Кибер престъпници използват фалшиви имейли, имитиращи известни банкови институции за кражба на лични данни.'
    }
  ];

  // Mock data for threat level indicators
  const threatLevels = [
    {
      level: 'critical',
      count: 12,
      description: 'Заплахи изискващи незабавни действия',
      trend: 'up'
    },
    {
      level: 'high',
      count: 34,
      description: 'Сериозни заплахи за сигурността',
      trend: 'up'
    },
    {
      level: 'medium',
      count: 67,
      description: 'Умерени рискове за организациите',
      trend: 'down'
    },
    {
      level: 'low',
      count: 156,
      description: 'Ниски рискове, изискващи наблюдение',
      trend: 'stable'
    }
  ];

  // Mock data for threat counts by type
  const threatCounts = {
    'malware': 45,
    'phishing': 78,
    'ransomware': 23,
    'ddos': 34,
    'data-breach': 12,
    'social-engineering': 56
  };

  // Mock data for featured articles
  const featuredArticles = [
    {
      id: 1,
      title: 'Как да защитите организацията си от нови рансъмуер атаки',
      excerpt: 'Подробно ръководство за превенция и реакция при рансъмуер инциденти, включващо най-новите техники за защита и препоръки от експерти.',
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
      category: 'Рансъмуер защита',
      author: {
        name: 'Д-р Иван Петров',
        verificationLevel: 'certified',
        specialization: 'Кибер сигурност'
      },
      publishedAt: '2024-09-24T10:30:00Z',
      readTime: 8,
      views: 2340,
      comments: 45,
      threatLevel: 'critical',
      isBreaking: true
    },
    {
      id: 2,
      title: 'Анализ на новите фишинг техники за 2024 година',
      excerpt: 'Детайлен преглед на еволюцията на фишинг атаките и как киберпрестъпниците адаптират методите си за заобикаляне на съвременните защити.',
      featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      category: 'Фишинг анализ',
      author: {
        name: 'Мария Георгиева',
        verificationLevel: 'verified',
        specialization: 'Threat Intelligence'
      },
      publishedAt: '2024-09-24T08:15:00Z',
      readTime: 12,
      views: 1890,
      comments: 32,
      threatLevel: 'high',
      isBreaking: false
    }
  ];

  // Mock data for regular articles
  const articles = [
    {
      id: 3,
      title: 'Нови стандарти за киберсигурност в ЕС',
      excerpt: 'Преглед на актуализираните регулации и тяхното влияние върху българските компании.',
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
      category: 'Регулации',
      author: {
        name: 'Стефан Николов',
        verificationLevel: 'contributor',
        specialization: 'Правни въпроси'
      },
      publishedAt: '2024-09-23T16:45:00Z',
      readTime: 6,
      views: 1234,
      comments: 18,
      threatLevel: 'medium'
    },
    {
      id: 4,
      title: 'AI в киберсигурността: възможности и рискове',
      excerpt: 'Как изкуственият интелект променя ландшафта на киберсигурността.',
      featuredImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop',
      category: 'AI & Сигурност',
      author: {
        name: 'Д-р Елена Димитрова',
        verificationLevel: 'certified',
        specialization: 'AI Security'
      },
      publishedAt: '2024-09-23T14:20:00Z',
      readTime: 10,
      views: 987,
      comments: 24,
      threatLevel: 'low'
    },
    {
      id: 5,
      title: 'Защита на критичната инфраструктура в България',
      excerpt: 'Анализ на текущото състояние и препоръки за подобрение.',
      featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
      category: 'Критична инфраструктура',
      author: {
        name: 'Георги Стоянов',
        verificationLevel: 'verified',
        specialization: 'Infrastructure Security'
      },
      publishedAt: '2024-09-23T11:30:00Z',
      readTime: 7,
      views: 756,
      comments: 15,
      threatLevel: 'high'
    }
  ];

  // Mock data for threat timeline
  const threatTimelineData = [
    {
      id: 1,
      type: 'ransomware',
      severity: 'critical',
      title: 'Нова рансъмуер атака срещу болница в София',
      description: 'Засегнати са критични системи, пациентските данни са криптирани',
      timestamp: new Date(Date.now() - 1800000),
      affectedSystems: '15 сървъра',
      mitigated: false
    },
    {
      id: 2,
      type: 'phishing',
      severity: 'high',
      title: 'Масова фишинг кампания срещу банкови клиенти',
      description: 'Засечени са над 500 фалшиви имейла имитиращи банкови съобщения',
      timestamp: new Date(Date.now() - 3600000),
      affectedSystems: '500+ потребители',
      mitigated: true
    },
    {
      id: 3,
      type: 'ddos',
      severity: 'medium',
      title: 'DDoS атака срещу правителствен портал',
      description: 'Временно прекъсване на услугите за граждани',
      timestamp: new Date(Date.now() - 7200000),
      affectedSystems: '3 сървъра',
      mitigated: true
    }
  ];

  // Mock data for security checklist
  const securityChecklistData = {
    sections: [
      {
        id: 'basic',
        type: 'basic',
        title: 'Основна сигурност',
        description: 'Фундаментални мерки за защита',
        items: [
          {
            id: 'basic-1',
            title: 'Актуализирайте всички операционни системи',
            description: 'Инсталирайте най-новите security patches',
            priority: 'high'
          },
          {
            id: 'basic-2',
            title: 'Активирайте автоматичните актуализации',
            description: 'Настройте автоматично инсталиране на критични актуализации',
            priority: 'high'
          },
          {
            id: 'basic-3',
            title: 'Използвайте силни пароли',
            description: 'Минимум 12 символа с комбинация от букви, цифри и специални знаци',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'advanced',
        type: 'advanced',
        title: 'Разширена защита',
        description: 'Допълнителни мерки за по-висока сигурност',
        items: [
          {
            id: 'advanced-1',
            title: 'Настройте двуфакторна автентикация',
            description: 'Активирайте 2FA за всички критични системи',
            priority: 'high'
          },
          {
            id: 'advanced-2',
            title: 'Внедрете network segmentation',
            description: 'Разделете мрежата на сигурни зони',
            priority: 'medium'
          }
        ]
      }
    ]
  };

  // Sort options
  const sortOptions = [
    { value: 'latest', label: 'Най-нови' },
    { value: 'popular', label: 'Най-популярни' },
    { value: 'threat-level', label: 'Ниво на заплаха' },
    { value: 'alphabetical', label: 'Азбучен ред' }
  ];

  // Filter articles based on search and selected threat types
  const filteredArticles = articles?.filter(article => {
    const matchesSearch = article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         article?.excerpt?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesThreatType = selectedThreatTypes?.length === 0 || 
                             selectedThreatTypes?.some(type => 
                               article?.category?.toLowerCase()?.includes(type?.toLowerCase())
                             );
    
    return matchesSearch && matchesThreatType;
  });

  useEffect(() => {
    document.title = 'Киберсигурност - Linaro News';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Security Alert Banner */}
      <SecurityAlertBanner alerts={securityAlerts} />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Shield" size={24} />
                  <span className="text-sm font-medium uppercase tracking-wide opacity-90">
                    Киберсигурност
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Защитете се от<br />
                  <span className="text-red-200">киберзаплахите</span>
                </h1>
                
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Актуални анализи, експертни препоръки и навременни предупреждения 
                  за най-новите киберзаплахи в България и света.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 font-semibold"
                    iconName="Bell"
                    iconPosition="left"
                  >
                    Абонирай се за предупреждения
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-red-600"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Изтегли security guide
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {threatLevels?.map((threat, index) => (
                  <ThreatLevelIndicator
                    key={index}
                    level={threat?.level}
                    count={threat?.count}
                    description={threat?.description}
                    trend={threat?.trend}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Search */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Търсене</h3>
                  <Input
                    type="search"
                    placeholder="Търси статии..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="mb-4"
                  />
                  
                  <Select
                    label="Сортиране"
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                  />
                </div>

                {/* Threat Type Filter */}
                <ThreatTypeFilter
                  selectedTypes={selectedThreatTypes}
                  onTypeChange={setSelectedThreatTypes}
                  threatCounts={threatCounts}
                />

                {/* Real-time Security Feed */}
                <RealTimeSecurityFeed />
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3 space-y-8">
                {/* Featured Articles */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Препоръчани статии</h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid' ?'bg-primary text-white' :'bg-muted text-text-secondary hover:text-foreground'
                        }`}
                      >
                        <Icon name="Grid3X3" size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list' ?'bg-primary text-white' :'bg-muted text-text-secondary hover:text-foreground'
                        }`}
                      >
                        <Icon name="List" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {featuredArticles?.map((article) => (
                      <SecurityArticleCard
                        key={article?.id}
                        article={article}
                        variant="featured"
                      />
                    ))}
                  </div>
                </div>

                {/* Regular Articles */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Всички статии</h2>
                  
                  {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredArticles?.map((article) => (
                        <SecurityArticleCard
                          key={article?.id}
                          article={article}
                          variant="default"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles?.map((article) => (
                        <SecurityArticleCard
                          key={article?.id}
                          article={article}
                          variant="list"
                        />
                      ))}
                    </div>
                  )}
                  
                  {filteredArticles?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Няма намерени статии
                      </h3>
                      <p className="text-text-secondary">
                        Опитайте с различни ключови думи или филтри
                      </p>
                    </div>
                  )}
                </div>

                {/* Load More */}
                {filteredArticles?.length > 0 && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Зареди още статии
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Threat Timeline */}
              <ThreatTimeline threats={threatTimelineData} />
              
              {/* Security Checklist */}
              <SecurityChecklist checklist={securityChecklistData} />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Icon name="Mail" size={48} className="mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Получавайте спешни предупреждения
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Абонирайте се за нашия newsletter и получавайте незабавни известия 
              за критични киберзаплахи и security updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Вашият имейл адрес"
                className="flex-1"
              />
              <Button
                variant="default"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                iconName="Send"
                iconPosition="right"
              >
                Абонирай се
              </Button>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              Ще получавате максимум 2-3 имейла седмично. Можете да се отпишете по всяко време.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CybersecurityCategory;