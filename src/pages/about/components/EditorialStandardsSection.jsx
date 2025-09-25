import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EditorialStandardsSection = () => {
  const [activeStandard, setActiveStandard] = useState(0);

  const standards = [
    {
      icon: "Search",
      title: "Проверка на фактите",
      description: "Всяка информация се проверява от минимум два независими източника",
      details: [
        "Използваме само официални и проверени източници",
        "Всяка статистика се потвърждава от първоизточника",
        "Интервютата се записват и архивират",
        "Цитатите се проверяват преди публикуване"
      ],
      process: `1. Първоначално проучване и събиране на информация\n2. Проверка от минимум два независими източника\n3. Консултация с експерти в областта\n4. Редакторска проверка и одобрение\n5. Финална проверка преди публикуване`
    },
    {
      icon: "Link",
      title: "Атрибуция на източници",
      description: "Прозрачно посочване на всички използвани източници и референции",
      details: [
        "Директни линкове към оригиналните източници",
        "Ясно разграничаване между факти и мнения",
        "Посочване на дата и контекст на информацията",
        "Архивиране на всички референции"
      ],
      process: `1. Документиране на всички използвани източници\n2. Създаване на архивни копия на референциите\n3. Проверка на валидността на линковете\n4. Добавяне на контекстуална информация\n5. Регулярна актуализация на референциите`
    },
    {
      icon: "Shield",
      title: "Редакционна независимост",
      description: "Пълна независимост от външни влияния и търговски интереси",
      details: [
        "Ясно разделение между редакционно съдържание и реклами",
        "Декларация на потенциални конфликти на интереси",
        "Независимост от рекламодатели и спонсори",
        "Прозрачност относно финансирането"
      ],
      process: `1. Редакционният екип работи независимо от търговския\n2. Всички потенциални конфликти се декларират\n3. Рекламното съдържание се маркира ясно\n4. Редакционните решения се вземат само от екипа\n5. Регулярни одити за независимост`
    },
    {
      icon: "AlertTriangle",
      title: "Корекции и актуализации",
      description: "Бърза и прозрачна корекция на грешки с пълна отчетност",
      details: [
        "Корекциите се публикуват в рамките на 24 часа",
        "Ясно посочване на променената информация",
        "Запазване на оригиналната версия за прозрачност",
        "Уведомяване на читателите за значими промени"
      ],
      process: `1. Незабавно разследване на съобщените грешки\n2. Потвърждаване на необходимостта от корекция\n3. Подготовка на корекцията с обяснение\n4. Публикуване и уведомяване на читателите\n5. Анализ за предотвратяване на подобни грешки`
    }
  ];

  const metrics = [
    { label: "Точност на статиите", value: "99.2%", icon: "Target" },
    { label: "Време за корекция", value: "< 12ч", icon: "Clock" },
    { label: "Проверени източници", value: "2500+", icon: "Database" },
    { label: "Експертни консултации", value: "150+", icon: "Users" }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent rounded-full px-4 py-2 mb-6">
            <Icon name="FileCheck" size={16} />
            <span className="font-mono text-sm font-medium">Качество и стандарти</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Редакционни стандарти
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Нашите строги редакционни стандарти гарантират точност, прозрачност и надеждност 
            на всяко съдържание, което публикуваме.
          </p>
        </div>

        {/* Quality Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics?.map((metric, index) => (
            <div key={index} className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <Icon name={metric?.icon} size={32} className="text-primary mx-auto mb-4" />
              <div className="font-headline text-2xl font-bold text-foreground mb-2">
                {metric?.value}
              </div>
              <div className="font-cta text-sm text-text-secondary">
                {metric?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Standards Tabs */}
        <div className="bg-card rounded-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {standards?.map((standard, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStandard(index)}
                  className={`flex items-center space-x-3 px-6 py-4 font-cta font-medium text-sm whitespace-nowrap transition-colors ${
                    activeStandard === index
                      ? 'bg-primary text-white border-b-2 border-primary' :'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={standard?.icon} size={18} />
                  <span>{standard?.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Description and Details */}
              <div>
                <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
                  {standards?.[activeStandard]?.title}
                </h3>
                <p className="font-body text-lg text-text-secondary mb-8">
                  {standards?.[activeStandard]?.description}
                </p>

                <h4 className="font-cta font-semibold text-foreground mb-4">Ключови принципи:</h4>
                <ul className="space-y-3">
                  {standards?.[activeStandard]?.details?.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={20} className="text-cyber-green mt-0.5 flex-shrink-0" />
                      <span className="font-body text-text-secondary">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Flow */}
              <div>
                <h4 className="font-cta font-semibold text-foreground mb-6">Процес на изпълнение:</h4>
                <div className="bg-muted rounded-xl p-6">
                  <pre className="font-mono text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                    {standards?.[activeStandard]?.process}
                  </pre>
                </div>

                {/* Quality Badge */}
                <div className="mt-8 bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 rounded-xl p-6 text-center">
                  <Icon name="Award" size={40} className="text-primary mx-auto mb-4" />
                  <h5 className="font-headline text-lg font-bold text-foreground mb-2">
                    Сертифициран процес
                  </h5>
                  <p className="font-body text-sm text-text-secondary">
                    Нашите стандарти са одобрени от Българската асоциация за дигитална журналистика
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Policy CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-ai-blue/5 to-cyber-green/5 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="FileText" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
            Пълна редакционна политика
          </h3>
          <p className="font-body text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Прочетете нашата пълна редакционна политика за детайлна информация относно 
            стандартите, процесите и етичните принципи, които следваме.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/editorial-policy"
              className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary/90 transition-colors"
            >
              <Icon name="FileText" size={18} />
              <span>Редакционна политика</span>
            </a>
            <a 
              href="/ethics-code"
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="Shield" size={18} />
              <span>Етичен кодекс</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialStandardsSection;