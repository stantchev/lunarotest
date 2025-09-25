import React from 'react';
import Icon from '../../../components/AppIcon';

const PolicySection = ({ section }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={section?.icon} size={24} color="white" />
        </div>
        <div>
          <h2 className="font-headline font-bold text-2xl text-foreground mb-2">
            {section?.content?.title}
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {section?.content?.description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {section?.content?.points?.map((point, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
            </div>
            <p className="text-foreground leading-relaxed">
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Info based on section */}
      {section?.id === 'accuracy' && (
        <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Info" size={20} className="text-primary" />
            <h4 className="font-cta font-semibold text-primary">Процес на проверка</h4>
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            Всяка статия преминава през 3-етапен процес: първоначална проверка от автора, 
            факт-чекинг от редактора и финална проверка от експерт в съответната област.
          </p>
        </div>
      )}

      {section?.id === 'corrections' && (
        <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="AlertCircle" size={20} className="text-accent" />
            <h4 className="font-cta font-semibold text-accent">Съобщаване на грешки</h4>
          </div>
          <p className="text-foreground text-sm leading-relaxed mb-3">
            Открихте грешка в наша публикация? Свържете се с нас:
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Mail" size={16} className="text-accent" />
            <a href="mailto:corrections@linaronews.bg" className="text-accent hover:underline">
              corrections@linaronews.bg
            </a>
          </div>
        </div>
      )}

      {section?.id === 'feedback' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-cyber-green/10 border border-cyber-green/20 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="ThumbsUp" size={20} className="text-cyber-green" />
              <h4 className="font-cta font-semibold text-cyber-green">Похвали и предложения</h4>
            </div>
            <p className="text-foreground text-sm">
              feedback@linaronews.bg
            </p>
          </div>
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              <h4 className="font-cta font-semibold text-destructive">Оплаквания</h4>
            </div>
            <p className="text-foreground text-sm">
              complaints@linaronews.bg
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicySection;