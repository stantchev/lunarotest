import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import PolicySection from './components/PolicySection';
import Icon from '../../components/AppIcon';

const EditorialPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Общ преглед',
      icon: 'Eye',
      content: {
        title: 'Нашата мисия и принципи',
        description: 'Linaro News се ангажира да предоставя точна, навременна и обективна информация в областта на киберсигурността, SEO и изкуствения интелект.',
        points: [
          'Независимост и обективност във всички публикации',
          'Базиране на проверени факти и експертни анализи',
          'Прозрачност в източниците и методологиите',
          'Етично отношение към читателите и обществото',
          'Постоянно развитие и актуализация на съдържанието'
        ]
      }
    },
    {
      id: 'accuracy',
      title: 'Точност и проверка',
      icon: 'CheckCircle',
      content: {
        title: 'Стандарти за точност',
        description: 'Всяка публикация преминава през строг процес на проверка на фактите и валидиране на информацията.',
        points: [
          'Минимум два независими източника за всяка фактическа твърдения',
          'Проверка на техническите детайли от сертифицирани експерти',
          'Кръстосана проверка на данни и статистики',
          'Верификация на цитати и изявления на експерти',
          'Регулярна актуализация на архивни материали'
        ]
      }
    },
    {
      id: 'sources',
      title: 'Източници и цитиране',
      icon: 'BookOpen',
      content: {
        title: 'Използване на източници',
        description: 'Стриктни правила за използване и цитиrane на източници, с акцент върху авторитетни и проверими материали.',
        points: [
          'Приоритет на първични източници пред вторични',
          'Прозрачно посочване на всички използвани материали',
          'Избягване на анонимни източници освен при изключителни случаи',
          'Проверка на достоверността на онлайн източници',
          'Правилно форматиране и атрибуция на цитати'
        ]
      }
    },
    {
      id: 'corrections',
      title: 'Корекции и актуализации',
      icon: 'RefreshCw',
      content: {
        title: 'Процедури за корекции',
        description: 'Прозрачен и бърз процес за корекция на грешки и актуализация на информация.',
        points: [
          'Незабавна корекция при установяване на фактическа грешка',
          'Ясно маркиране на корекциите с дата и обяснение',
          'Уведомяване на читателите за значителни промени',
          'Запазване на оригиналния текст за прозрачност',
          'Периодична ревизия на архивни материали'
        ]
      }
    },
    {
      id: 'ethics',
      title: 'Етични стандарти',
      icon: 'Heart',
      content: {
        title: 'Етичен кодекс',
        description: 'Високи етични стандарти, които ръководят всички аспекти от нашата редакционна дейност.',
        points: [
          'Избягване на конфликт на интереси',
          'Независимост от външни влияния и натиск',
          'Уважение към личната неприкосновеност',
          'Отговорно третиране на сензитивна информация',
          'Справедливо представяне на всички страни в спорни въпроси'
        ]
      }
    },
    {
      id: 'feedback',
      title: 'Обратна връзка',
      icon: 'MessageCircle',
      content: {
        title: 'Процедури за обратна връзка',
        description: 'Механизми за получаване и обработка на отзиви, оплаквания и предложения от читателите.',
        points: [
          'Лесно достъпни форми за обратна връзка',
          'Отговор на всички оплаквания в рамките на 48 часа',
          'Прозрачен процес на разглеждане на възраженията',
          'Редовни проучвания сред читателите',
          'Интегриране на обратната връзка в редакционните процеси'
        ]
      }
    }
  ];

  const policies = [
    {
      title: 'Политика за конфиденциалност',
      description: 'Как събираме, използваме и защитаваме вашите лични данни',
      link: '/privacy'
    },
    {
      title: 'Условия за ползване',
      description: 'Правила и условия за използване на нашата платформа',
      link: '/terms'
    },
    {
      title: 'Етичен кодекс',
      description: 'Нашите етични принципи и стандарти за поведение',
      link: '/ethics-code'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Редакционна политика - Linaro News | Стандарти за качество и етика</title>
        <meta 
          name="description" 
          content="Запознайте се с редакционната политика на Linaro News - нашите стандарти за точност, етика и качество в технологичната журналистика." 
        />
        <meta name="keywords" content="редакционна политика, етични стандарти, качество съдържание, технологична журналистика, факти проверка" />
        <meta property="og:title" content="Редакционна политика - Linaro News" />
        <meta property="og:description" content="Нашите стандарти за качество, точност и етика в технологичната журналистика." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/editorial-policy" />
        <link rel="canonical" href="https://linaronews.bg/editorial-policy" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Редакционна политика",
            "description": "Стандарти за качество и етика в технологичната журналистика на Linaro News",
            "url": "https://linaronews.bg/editorial-policy",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Linaro News",
              "url": "https://linaronews.bg"
            },
            "about": {
              "@type": "Organization",
              "name": "Linaro News",
              "description": "Българска платформа за технологични новини"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon name="FileText" size={32} color="white" strokeWidth={2} />
                </div>
              </div>
              
              <h1 className="font-headline font-bold text-4xl lg:text-5xl text-foreground mb-6">
                <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Редакционна политика
                </span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Нашите стандарти за качество, точност и етика, които ръководят 
                всички аспекти от създаването и публикуването на съдържание.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <Icon name="Calendar" size={16} />
                  Последна актуализация: 24 Септември 2024
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Icon name="Users" size={16} />
                  Версия 2.1
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Icon name="CheckCircle" size={16} />
                  Одобрено от редакционния съвет
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-2">
                    <h3 className="font-cta font-semibold text-foreground mb-4 px-3">
                      Раздели
                    </h3>
                    {sections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => setActiveSection(section?.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-cta text-left transition-colors ${
                          activeSection === section?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-text-secondary hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={section?.icon} size={18} />
                        {section?.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  {sections?.map((section) => (
                    activeSection === section?.id && (
                      <PolicySection
                        key={section?.id}
                        section={section}
                      />
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Policies */}
          <section className="py-16 bg-muted/20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="font-headline font-bold text-3xl text-foreground text-center mb-12">
                Свързани политики
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {policies?.map((policy, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-cta font-bold text-lg text-foreground mb-3">
                      {policy?.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {policy?.description}
                    </p>
                    <a
                      href={policy?.link}
                      className="text-primary hover:text-primary/80 font-cta font-medium inline-flex items-center gap-2"
                    >
                      Прочети повече
                      <Icon name="ArrowRight" size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="font-headline font-bold text-3xl text-foreground mb-6">
                Имате въпроси за нашата политика?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Свържете се с нашия редакционен екип за разяснения или предложения
              </p>
              <a
                href="mailto:editorial@linaronews.bg"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-cta font-semibold hover:bg-primary/90 transition-colors"
              >
                <Icon name="Mail" size={20} />
                editorial@linaronews.bg
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default EditorialPolicyPage;