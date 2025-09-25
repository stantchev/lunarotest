import React from 'react';
import Icon from '../../../components/AppIcon';

const TransparencySection = () => {
  const transparencyAreas = [
    {
      icon: "DollarSign",
      title: "Финансиране",
      description: "Пълна прозрачност относно източниците на финансиране",
      details: [
        "Независимо финансиране чрез абонаменти и реклами",
        "Никакви скрити инвестиции или политически влияния",
        "Годишни финансови отчети достъпни за обществеността",
        "Ясно разделение между редакционно и рекламно съдържание"
      ]
    },
    {
      icon: "Users",
      title: "Собственост",
      description: "Информация за собствениците и управлението на платформата",
      details: [
        "Linaro News е собственост на Linaro Media EOOD",
        "Регистрирана в България с ЕИК: 206789123",
        "Управляван от независим редакционен съвет",
        "Никакви връзки с политически партии или организации"
      ]
    },
    {
      icon: "Globe",
      title: "Партньорства",
      description: "Открити партньорства с технологични организации",
      details: [
        "Партньорство с Българската асоциация за информационни технологии",
        "Член на Европейската мрежа за киберсигурност",
        "Сътрудничество с водещи университети в България",
        "Участие в международни технологични конференции"
      ]
    },
    {
      icon: "Database",
      title: "Данни и поверителност",
      description: "Как събираме, използваме и защитаваме данните на читателите",
      details: [
        "Пълно съответствие с GDPR регулациите",
        "Минимално събиране на лични данни",
        "Шифроване на всички потребителски данни",
        "Право на изтриване и преносимост на данните"
      ]
    }
  ];

  const certifications = [
    {
      name: "GDPR Compliance",
      issuer: "EU Data Protection",
      date: "2024",
      icon: "Shield"
    },
    {
      name: "Digital Journalism Ethics",
      issuer: "Bulgarian Media Association",
      date: "2023",
      icon: "Award"
    },
    {
      name: "Cybersecurity Standards",
      issuer: "ISO 27001",
      date: "2024",
      icon: "Lock"
    },
    {
      name: "Content Quality Assurance",
      issuer: "Tech Media Council",
      date: "2023",
      icon: "CheckCircle"
    }
  ];

  const contactInfo = [
    {
      type: "Редакция",
      email: "editorial@linaronews.bg",
      description: "За въпроси относно съдържанието и редакционната политика"
    },
    {
      type: "Бизнес запитвания",
      email: "business@linaronews.bg", 
      description: "За партньорства, реклами и бизнес възможности"
    },
    {
      type: "Технически въпроси",
      email: "tech@linaronews.bg",
      description: "За технически проблеми и предложения за подобрения"
    },
    {
      type: "Правни въпроси",
      email: "legal@linaronews.bg",
      description: "За правни въпроси, авторски права и жалби"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-ai-blue/10 text-ai-blue rounded-full px-4 py-2 mb-6">
            <Icon name="Eye" size={16} />
            <span className="font-mono text-sm font-medium">Прозрачност</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Пълна прозрачност
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Вярваме, че прозрачността е основата на доверието. Ето защо споделяме открито 
            информация за нашето финансиране, собственост и процеси.
          </p>
        </div>

        {/* Transparency Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {transparencyAreas?.map((area, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-ai-blue/10 to-ai-blue/20 rounded-xl flex items-center justify-center">
                  <Icon name={area?.icon} size={24} className="text-ai-blue" />
                </div>
                <h3 className="font-headline text-xl font-bold text-foreground">
                  {area?.title}
                </h3>
              </div>
              
              <p className="font-body text-text-secondary mb-6">
                {area?.description}
              </p>

              <ul className="space-y-3">
                {area?.details?.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-cyber-green mt-1 flex-shrink-0" />
                    <span className="font-body text-sm text-text-secondary">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="font-headline text-2xl font-bold text-foreground text-center mb-8">
            Сертификати и акредитации
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <Icon name={cert?.icon} size={32} className="text-primary mx-auto mb-4" />
                <h4 className="font-cta font-semibold text-foreground text-sm mb-2">
                  {cert?.name}
                </h4>
                <p className="font-mono text-xs text-text-secondary mb-1">
                  {cert?.issuer}
                </p>
                <p className="font-mono text-xs text-primary">
                  {cert?.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-primary/5 via-ai-blue/5 to-cyber-green/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-6" />
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
              Свържете се с нас
            </h3>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
              Имате въпроси, предложения или искате да споделите информация? 
              Ние сме тук, за да ви помогнем.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {contactInfo?.map((contact, index) => (
              <div key={index} className="bg-card rounded-xl p-6">
                <h4 className="font-cta font-semibold text-foreground mb-2">
                  {contact?.type}
                </h4>
                <a 
                  href={`mailto:${contact?.email}`}
                  className="font-mono text-primary hover:text-primary/80 transition-colors mb-3 block"
                >
                  {contact?.email}
                </a>
                <p className="font-body text-sm text-text-secondary">
                  {contact?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Contact Methods */}
          <div className="mt-12 text-center">
            <h4 className="font-cta font-semibold text-foreground mb-6">
              Други начини за контакт
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+359888123456"
                className="inline-flex items-center justify-center space-x-2 bg-card hover:bg-muted px-6 py-3 rounded-lg font-cta font-medium transition-colors"
              >
                <Icon name="Phone" size={18} />
                <span>+359 888 123 456</span>
              </a>
              <a 
                href="https://linkedin.com/company/linaro-news"
                className="inline-flex items-center justify-center space-x-2 bg-card hover:bg-muted px-6 py-3 rounded-lg font-cta font-medium transition-colors"
              >
                <Icon name="Linkedin" size={18} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://twitter.com/linaronews"
                className="inline-flex items-center justify-center space-x-2 bg-card hover:bg-muted px-6 py-3 rounded-lg font-cta font-medium transition-colors"
              >
                <Icon name="Twitter" size={18} />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;