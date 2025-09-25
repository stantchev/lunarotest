import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TermsOfServicePage = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [acceptanceTracked, setAcceptanceTracked] = useState(false);
  
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const trackAcceptance = () => {
    setAcceptanceTracked(true);
    // In a real app, this would send tracking data to backend
    console.log('Terms acceptance tracked:', new Date()?.toISOString());
  };

  const termsData = {
    lastUpdated: "24 септември 2025",
    effectiveDate: "1 октомври 2025",
    sections: [
      {
        id: 'service-overview',
        title: '1. Общ преглед на услугата',
        content: [
          'Linaro News е специализирана платформа за технологични новини, фокусирана върху киберсигурност, SEO оптимизация и изкуствен интелект.',
          'Предоставяме актуална информация, експертни анализи и практически ръководства за технологични специалисти.',
          'Услугата е достъпна 24/7 с възможност за временни прекъсвания за поддръжка.'
        ]
      },
      {
        id: 'user-accounts',
        title: '2. Потребителски акаунти и отговорности',
        content: [
          'Потребителите могат да създават акаунти за персонализиран опит и достъп до разширени функции.',
          'Всеки потребител носи отговорност за сигурността на своя акаунт и паролата.',
          'Забранено е споделянето на акаунти между множество лица без изрично разрешение.',
          'Потребителите се задължават да предоставят точна информация при регистрация.'
        ]
      },
      {
        id: 'acceptable-use',
        title: '3. Приемливо използване',
        content: [
          'Забранени дейности включват: спам коментари, разпространение на злонамерен софтуер, хакерски атаки.',
          'Не е позволено автоматизирано събиране на данни (scraping) без предварително разрешение.',
          'Уважителна комуникация е задължителна във всички взаимодействия с общността.',
          'Споделянето на невярна информация или конспиративни теории е строго забранено.'
        ]
      },
      {
        id: 'content-licensing',
        title: '4. Лицензиране на съдържание',
        content: [
          'Всички статии са защитени от авторско право и се предоставят под Creative Commons лиценз.',
          'Позволено е споделяне с пълно цитиране на източника и връзка към оригиналната статия.',
          'Комерсиално използване изисква предварително писмено съгласие от редакцията.',
          'Потребителското съдържание (коментари) остава собственост на авторите с права за използване от платформата.'
        ]
      },
      {
        id: 'community-guidelines',
        title: '5. Указания за общността',
        content: [
          'Коментарите подлежат на модерация в съответствие с етичните стандарти на платформата.',
          'Насърчаваме конструктивни дискусии и споделяне на експертни мнения.',
          'Забранени са: обидни изказвания, дискриминация, заплахи и лични атаки.',
          'Спам коментари и нерелевантни връзки се премахват автоматично.'
        ]
      },
      {
        id: 'intellectual-property',
        title: '6. Интелектуална собственост',
        content: [
          'Всички търговски марки, логота и фирмени наименования са собственост на съответните притежатели.',
          'Съдържанието на Linaro News е защитено от българско и международно авторско право.',
          'Потребителите предоставят лиценз за използване на техните публични коментари и приносът им.',
          'При нарушения на авторските права се прилага процедура за уведомяване и премахване.'
        ]
      },
      {
        id: 'dispute-resolution',
        title: '7. Разрешаване на спорове',
        content: [
          'Първоначално разрешаване чрез пряко общуване с екипа на платформата.',
          'При неуспешно решение - медиация чрез Българската търговска камара.',
          'Приложимо е българското право с юрисдикция на съдилищата в София.',
          'Потребителите имат право на жалба в срок от 30 дни от възникване на спора.'
        ]
      },
      {
        id: 'liability-limitation',
        title: '8. Ограничение на отговорността',
        content: [
          'Linaro News не носи отговорност за индиректни или косвени щети.',
          'Максималната отговорност е ограничена до стойността на платените услуги.',
          'Не поемаме отговорност за съдържание от трети страни или външни връзки.',
          'Платформата се предоставя "както е" без гаранции за непрекъснато функциониране.'
        ]
      },
      {
        id: 'service-modifications',
        title: '9. Промени в услугата',
        content: [
          'Запазваме правото да модифицираме или прекратяваме услуги с 30-дневно предизвестие.',
          'Промени в условията влизат в сила след публикуване и уведомяване на потребителите.',
          'Критични промени се съобщават чрез email и банери на платформата.',
          'Продължаващото използване се счита за съгласие с новите условия.'
        ]
      },
      {
        id: 'contact-legal',
        title: '10. Правни въпроси и контакти',
        content: [
          'За правни въпроси: legal@linaro-news.bg',
          'Адрес за кореспонденция: ул. Витоша 1, София 1000, България',
          'Работно време за консултации: понеделник - петък, 9:00 - 17:00 ч.',
          'Отговор на запитвания в срок до 5 работни дни.'
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Общи условия - Linaro News</title>
        <meta name="description" content="Правни рамки, управляващи потребителските взаимодействия и правата за използване на съдържание в платформата Linaro News." />
        <meta name="keywords" content="общи условия, правни рамки, потребителски права, авторско право, технологични новини" />
        <meta property="og:title" content="Общи условия - Linaro News" />
        <meta property="og:description" content="Правни рамки за използване на платформата Linaro News" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://linaro-news.bg/terms-of-service" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="BookOpen" size={32} color="white" strokeWidth={2} />
                </div>
              </div>
              
              <h1 className="text-4xl font-headline font-bold text-foreground mb-4">
                Общи условия за ползване
              </h1>
              
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
                Правни рамки, управляващи потребителските взаимодействия и правата за използване на съдържание в платформата Linaro News
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Последно обновяване: {termsData?.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>В сила от: {termsData?.effectiveDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Navigation" size={20} />
                <span>Бърза навигация</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-2">
                {termsData?.sections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => document.getElementById(section?.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-left p-2 rounded-lg hover:bg-muted transition-colors text-sm text-text-secondary hover:text-foreground"
                  >
                    {section?.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6 mb-8">
              {termsData?.sections?.map((section) => (
                <div key={section?.id} id={section?.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(section?.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <h2 className="text-xl font-semibold text-foreground">
                      {section?.title}
                    </h2>
                    <Icon 
                      name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-secondary" 
                    />
                  </button>
                  
                  {expandedSections?.[section?.id] && (
                    <div className="px-6 pb-6 border-t border-border">
                      <div className="space-y-4 pt-4">
                        {section?.content?.map((paragraph, index) => (
                          <p key={index} className="text-text-secondary leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Terms Acceptance */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-border rounded-xl p-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" size={24} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Проследяване на съгласието
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Продължавайки да използвате платформата, вие се съгласявате с горепосочените условия и политики.
                  </p>
                  
                  {!acceptanceTracked ? (
                    <Button
                      onClick={trackAcceptance}
                      variant="default"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      iconName="Check"
                      iconPosition="left"
                    >
                      Приемам условията
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Icon name="CheckCircle2" size={20} />
                      <span className="font-medium">Условията са приети</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form for Legal Inquiries */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                <Icon name="MessageCircle" size={24} />
                <span>Правни запитвания</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Свържете се с нас</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={18} className="text-text-secondary" />
                      <span className="text-text-secondary">legal@linaro-news.bg</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={18} className="text-text-secondary" />
                      <span className="text-text-secondary">ул. Витоша 1, София 1000</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={18} className="text-text-secondary" />
                      <span className="text-text-secondary">Пон-Пет: 9:00-17:00 ч.</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Бърз достъп</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="FileText"
                      iconPosition="left"
                    >
                      Изтегли условията (PDF)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Globe"
                      iconPosition="left"
                    >
                      Английска версия
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Bell"
                      iconPosition="left"
                    >
                      Уведомления за промени
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfServicePage;