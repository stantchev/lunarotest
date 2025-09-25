import React from 'react';
import Icon from '../../../components/AppIcon';

const ExpertiseSection = ({ expertise }) => {
  const expertiseDetails = {
    "Киберсигурност и пентестинг": {
      description: "Дълбоки познания в областта на информационната сигурност, пентестинг и анализ на заплахи.",
      skills: ["Пентестинг", "Форензика", "Анализ на уязвимости", "Incident Response"],
      icon: "Shield"
    },
    "SEO и дигитален маркетинг": {
      description: "Експертиза в SEO оптимизация, дигитален маркетинг и анализ на данни.",
      skills: ["Техническо SEO", "Content Strategy", "PPC реклами", "Analytics"],
      icon: "Search"
    },
    "Изкуствен интелект и машинно обучение": {
      description: "Познания в AI технологии, машинно обучение и автоматизация на процеси.",
      skills: ["ML алгоритми", "NLP", "Computer Vision", "AI етика"],
      icon: "Brain"
    },
    "Технически анализ и консултации": {
      description: "Консультантски услуги за технологична стратегия и дигитална трансформация.",
      skills: ["Архитектура", "Code Review", "Tech Due Diligence", "Strategy"],
      icon: "Settings"
    }
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
            Области на експертиза
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Дълбоки знания и практически опит в ключови технологични области
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {expertise?.map((area, index) => {
            const details = expertiseDetails?.[area];
            if (!details) return null;

            return (
              <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-cyber-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={details?.icon} size={24} color="white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-cta font-bold text-xl text-foreground mb-3">
                      {area}
                    </h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {details?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {details?.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;