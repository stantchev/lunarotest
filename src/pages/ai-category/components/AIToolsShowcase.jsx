import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIToolsShowcase = () => {
  const [activeTab, setActiveTab] = useState('featured');

  const aiTools = {
    featured: [
      {
        id: 1,
        name: "ChatGPT",
        description: "Най-популярният AI чатбот за генериране на текст, отговори на въпроси и творческо писане.",
        category: "NLP",
        pricing: "Freemium",
        rating: 4.8,
        users: "100M+",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
        features: ["Текстово генериране", "Кодиране", "Анализ", "Превод"],
        pros: ["Лесен за използване", "Многофункционален", "Бърз отговор"],
        cons: ["Ограничения в безплатната версия", "Понякога неточни данни"],
        businessImpact: "Висок",
        complexity: "Ниска",
        roiScore: 9.2
      },
      {
        id: 2,
        name: "Midjourney",
        description: "AI инструмент за генериране на изображения от текстови описания с изключително качество.",
        category: "Image Generation",
        pricing: "Платен",
        rating: 4.7,
        users: "15M+",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop",
        features: ["Генериране на изображения", "Стилизация", "Upscaling", "Вариации"],
        pros: ["Високо качество", "Креативни резултати", "Активна общност"],
        cons: ["Само Discord интерфейс", "Скъпо за интензивна употреба"],
        businessImpact: "Среден",
        complexity: "Средна",
        roiScore: 8.5
      },
      {
        id: 3,
        name: "GitHub Copilot",
        description: "AI асистент за програмиране, който помага на разработчиците да пишат код по-бързо и ефективно.",
        category: "Code Generation",
        pricing: "Платен",
        rating: 4.6,
        users: "5M+",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
        features: ["Автодовършване на код", "Генериране на функции", "Документация", "Тестове"],
        pros: ["Увеличава продуктивността", "Поддържа много езици", "Интеграция с IDE"],
        cons: ["Изисква внимание при прегледа", "Месечна такса"],
        businessImpact: "Висок",
        complexity: "Ниска",
        roiScore: 9.0
      }
    ],
    business: [
      {
        id: 4,
        name: "Salesforce Einstein",
        description: "AI платформа за CRM с предиктивна аналитика и автоматизация на продажбите.",
        category: "Business Intelligence",
        pricing: "Enterprise",
        rating: 4.4,
        users: "150K+",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
        features: ["Предиктивна аналитика", "Lead scoring", "Автоматизация", "Персонализация"],
        pros: ["Мощна интеграция", "Скалируемост", "Корпоративно ниво"],
        cons: ["Сложна настройка", "Високи разходи"],
        businessImpact: "Много висок",
        complexity: "Висока",
        roiScore: 8.8
      },
      {
        id: 5,
        name: "Jasper AI",
        description: "AI платформа за маркетингово съдържание и копирайтинг за бизнес нужди.",
        category: "Content Marketing",
        pricing: "Платен",
        rating: 4.5,
        users: "1M+",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
        features: ["Маркетингов текст", "SEO оптимизация", "Социални медии", "Email кампании"],
        pros: ["Специализиран за маркетинг", "Множество шаблони", "Екипна работа"],
        cons: ["Ограничени безплатни опции", "Изисква редактиране"],
        businessImpact: "Висок",
        complexity: "Средна",
        roiScore: 8.3
      }
    ],
    development: [
      {
        id: 6,
        name: "TensorFlow",
        description: "Отворен код библиотека за машинно обучение и дълбоки невронни мрежи.",
        category: "ML Framework",
        pricing: "Безплатен",
        rating: 4.6,
        users: "10M+",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop",
        features: ["Невронни мрежи", "Computer Vision", "NLP", "Deployment"],
        pros: ["Безплатен", "Мощен", "Голяма общност"],
        cons: ["Стръмна крива на обучение", "Сложна настройка"],
        businessImpact: "Много висок",
        complexity: "Много висока",
        roiScore: 9.5
      },
      {
        id: 7,
        name: "Hugging Face",
        description: "Платформа за споделяне и използване на предварително обучени AI модели.",
        category: "Model Hub",
        pricing: "Freemium",
        rating: 4.7,
        users: "2M+",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=200&fit=crop",
        features: ["Предобучени модели", "Fine-tuning", "Deployment", "Datasets"],
        pros: ["Огромна библиотека", "Лесна интеграция", "Активна общност"],
        cons: ["Изисква техническо знание", "Ограничения в безплатната версия"],
        businessImpact: "Висок",
        complexity: "Висока",
        roiScore: 8.9
      }
    ]
  };

  const tabs = [
    { id: 'featured', label: 'Препоръчани', icon: 'Star' },
    { id: 'business', label: 'Бизнес', icon: 'Briefcase' },
    { id: 'development', label: 'Разработка', icon: 'Code' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Много висок': return 'text-green-700 bg-green-100';
      case 'Висок': return 'text-blue-700 bg-blue-100';
      case 'Среден': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Много висока': return 'text-red-700 bg-red-100';
      case 'Висока': return 'text-orange-700 bg-orange-100';
      case 'Средна': return 'text-yellow-700 bg-yellow-100';
      case 'Ниска': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <section className="bg-card border border-border rounded-2xl p-8 mb-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
          AI Инструменти и Платформи
        </h2>
        <p className="font-body text-text-secondary max-w-3xl mx-auto">
          Открийте най-добрите AI инструменти за вашия бизнес. Сравнете функции, цени и ROI 
          за да направите информирано решение.
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-cta font-medium text-sm transition-all ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {aiTools?.[activeTab]?.map((tool) => (
          <div key={tool?.id} className="bg-background border border-border rounded-xl p-6 hover-lift">
            {/* Tool Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={tool?.image}
                    alt={tool?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-foreground">
                    {tool?.name}
                  </h3>
                  <span className="font-cta text-sm text-text-secondary">
                    {tool?.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-sm">
                <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                <span className="font-cta font-medium text-foreground">{tool?.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-text-secondary mb-4 leading-relaxed">
              {tool?.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-headline font-bold text-lg text-foreground">
                  {tool?.users}
                </div>
                <div className="font-cta text-xs text-text-secondary">Потребители</div>
              </div>
              
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-headline font-bold text-lg text-ai-blue">
                  {tool?.roiScore}/10
                </div>
                <div className="font-cta text-xs text-text-secondary">ROI Score</div>
              </div>
            </div>

            {/* Impact & Complexity */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(tool?.businessImpact)}`}>
                  {tool?.businessImpact} въздействие
                </div>
              </div>
              
              <div className="text-center">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(tool?.complexity)}`}>
                  {tool?.complexity} сложност
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-cta font-medium text-sm text-foreground mb-2">
                Ключови функции:
              </h4>
              <div className="flex flex-wrap gap-1">
                {tool?.features?.slice(0, 4)?.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 bg-ai-blue/10 text-ai-blue text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={16} className="text-text-secondary" />
                <span className="font-cta font-medium text-foreground">{tool?.pricing}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                className="border-ai-blue text-ai-blue hover:bg-ai-blue hover:text-white"
              >
                Разгледай
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* CTA Section */}
      <div className="text-center mt-8 pt-8 border-t border-border">
        <h3 className="font-headline font-bold text-xl text-foreground mb-2">
          Нуждаете се от персонализирани препоръки?
        </h3>
        <p className="font-body text-text-secondary mb-4">
          Нашите експерти могат да ви помогнат да изберете правилните AI инструменти за вашия бизнес.
        </p>
        <Button
          variant="default"
          className="bg-gradient-to-r from-ai-blue to-cyber-green hover:from-ai-blue/90 hover:to-cyber-green/90 text-white font-cta font-semibold"
          iconName="MessageCircle"
          iconPosition="left"
          iconSize={16}
        >
          Свържете се с експерт
        </Button>
      </div>
    </section>
  );
};

export default AIToolsShowcase;