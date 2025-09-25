import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  const values = [
    {
      icon: "Target",
      title: "Мисия",
      description: `Да направим киберсигурността, SEO и AI достъпни за българските професионалисти и ентусиасти.\nДа служим като мост между сложните технологични развития и практическото разбиране.`,
      color: "text-cyber-green"
    },
    {
      icon: "Eye",
      title: "Визия",
      description: `Да станем водещият източник на технологични прозрения в България.\nДа изградим доверена общност от технологични професионалисти.`,
      color: "text-ai-blue"
    },
    {
      icon: "Heart",
      title: "Ценности",
      description: `Достоверност, прозрачност и редакционна независимост.\nТехническа експертиза с достъпна комуникация.\nКултурна обоснованост с глобална перспектива.`,
      color: "text-conversion-orange"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
            <Icon name="Compass" size={16} />
            <span className="font-mono text-sm font-medium">Нашите принципи</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Мисия, визия и ценности
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Linaro News е повече от новинарска платформа - ние сме общност от технологични експерти, 
            които вярват в силата на информираното решение.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values?.map((value, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${value?.color?.split('-')?.[1]}-500/10 to-${value?.color?.split('-')?.[1]}-600/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={value?.icon} size={28} className={value?.color} />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground mb-4">
                {value?.title}
              </h3>
              <p className="font-body text-text-secondary leading-relaxed whitespace-pre-line">
                {value?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Promise */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 via-ai-blue/5 to-cyber-green/5 rounded-2xl p-8 lg:p-12 text-center">
          <Icon name="Award" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-6">
            Нашето обещание
          </h3>
          <p className="font-body text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Ние се ангажираме да предоставяме точна, навременна и релевантна информация за технологичните 
            развития, които формират бъдещето на България. Всяка статия преминава през строг редакционен 
            процес и се основава на проверени източници и експертни анализи.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;