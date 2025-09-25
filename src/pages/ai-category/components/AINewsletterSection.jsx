import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AINewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    weeklyDigest: true,
    breakingNews: false,
    researchUpdates: false,
    toolReviews: false,
    businessInsights: true,
    tutorials: false
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subscriptionOptions = [
    {
      id: 'weeklyDigest',
      label: 'Седмичен дайджест',
      description: 'Най-важните AI новини и анализи всяка седмица',
      icon: 'Calendar',
      frequency: 'Седмично'
    },
    {
      id: 'breakingNews',
      label: 'Спешни новини',
      description: 'Незабавни уведомления за важни AI развития',
      icon: 'Zap',
      frequency: 'При необходимост'
    },
    {
      id: 'researchUpdates',
      label: 'Научни изследвания',
      description: 'Нови публикации и breakthrough в AI изследванията',
      icon: 'BookOpen',
      frequency: 'Двуседмично'
    },
    {
      id: 'toolReviews',
      label: 'Ревюта на инструменти',
      description: 'Детайлни анализи на нови AI инструменти и платформи',
      icon: 'Wrench',
      frequency: 'Месечно'
    },
    {
      id: 'businessInsights',
      label: 'Бизнес анализи',
      description: 'AI тенденции и възможности за българския бизнес',
      icon: 'TrendingUp',
      frequency: 'Двуседмично'
    },
    {
      id: 'tutorials',
      label: 'Практически ръководства',
      description: 'Стъпка по стъпка ръководства за AI технологии',
      icon: 'PlayCircle',
      frequency: 'Месечно'
    }
  ];

  const handlePreferenceChange = (preferenceId, checked) => {
    setPreferences(prev => ({
      ...prev,
      [preferenceId]: checked
    }));
  };

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const subscriberStats = [
    { label: 'Активни абонати', value: '12,847', icon: 'Users' },
    { label: 'Средна оценка', value: '4.8/5', icon: 'Star' },
    { label: 'Отворени имейли', value: '89%', icon: 'Mail' },
    { label: 'Месечен ръст', value: '+23%', icon: 'TrendingUp' }
  ];

  if (isSubscribed) {
    return (
      <section className="bg-gradient-to-br from-cyber-green/10 to-ai-blue/10 rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          
          <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
            Благодарим за абонамента!
          </h2>
          
          <p className="font-body text-text-secondary mb-6 leading-relaxed">
            Успешно се абонирахте за AI новините на Linaro News. Първият ви имейл ще получите в рамките на 24 часа.
          </p>
          
          <div className="bg-background border border-border rounded-xl p-6 mb-6">
            <h3 className="font-cta font-semibold text-foreground mb-3">Вашите предпочитания:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {subscriptionOptions?.filter(option => preferences?.[option?.id])?.map((option) => (
                <div key={option?.id} className="flex items-center space-x-2">
                  <Icon name={option?.icon} size={16} className="text-ai-blue" />
                  <span className="text-text-secondary">{option?.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Управление на предпочитанията
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-ai-blue/5 to-cyber-green/5 rounded-2xl p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-ai-blue/10 border border-ai-blue/20 rounded-full px-4 py-2 mb-4">
            <Icon name="Mail" size={16} className="text-ai-blue" />
            <span className="font-cta font-medium text-ai-blue text-sm">AI Intelligence Network</span>
          </div>
          
          <h2 className="font-headline font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Станете част от AI общността
          </h2>
          
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Получавайте персонализирани AI новини, експертни анализи и практически съвети 
            директно в пощенската си кутия. Присъединете се към хиляди професионалисти.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {subscriberStats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-background border border-border rounded-xl">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-ai-blue/10 rounded-lg mb-2">
                <Icon name={stat?.icon} size={20} className="text-ai-blue" />
              </div>
              <div className="font-headline font-bold text-lg text-foreground">
                {stat?.value}
              </div>
              <div className="font-cta text-xs text-text-secondary">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subscription Form */}
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-headline font-bold text-xl text-foreground mb-4">
              Абонирайте се сега
            </h3>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                label="Имейл адрес"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                required
                className="w-full"
              />
              
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <Icon name="Shield" size={20} className="text-green-600" />
                <div className="text-sm">
                  <div className="font-cta font-medium text-foreground">100% защита на данните</div>
                  <div className="text-text-secondary">Никога няма да споделим вашия имейл</div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                className="bg-gradient-to-r from-ai-blue to-cyber-green hover:from-ai-blue/90 hover:to-cyber-green/90 text-white font-cta font-semibold"
                iconName="Mail"
                iconPosition="left"
                iconSize={16}
              >
                {isLoading ? 'Абониране...' : 'Абонирай се безплатно'}
              </Button>
            </form>
          </div>

          {/* Preferences */}
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="font-headline font-bold text-xl text-foreground mb-4">
              Изберете предпочитания
            </h3>
            
            <div className="space-y-4">
              {subscriptionOptions?.map((option) => (
                <div key={option?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <Checkbox
                    checked={preferences?.[option?.id]}
                    onChange={(e) => handlePreferenceChange(option?.id, e?.target?.checked)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={option?.icon} size={16} className="text-ai-blue" />
                      <span className="font-cta font-medium text-foreground">
                        {option?.label}
                      </span>
                      <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                        {option?.frequency}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {option?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Content Preview */}
        <div className="mt-8 bg-background border border-border rounded-xl p-6">
          <h3 className="font-headline font-bold text-xl text-foreground mb-4 text-center">
            Примерно съдържание от нашия бюлетин
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-ai-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Newspaper" size={24} className="text-ai-blue" />
              </div>
              <h4 className="font-cta font-semibold text-foreground mb-2">Седмични новини</h4>
              <p className="text-sm text-text-secondary">
                Най-важните AI развития, обобщени и анализирани от нашите експерти.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-cyber-green/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Lightbulb" size={24} className="text-cyber-green" />
              </div>
              <h4 className="font-cta font-semibold text-foreground mb-2">Практически съвети</h4>
              <p className="text-sm text-text-secondary">
                Конкретни препоръки за внедряване на AI в българския бизнес контекст.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-accent" />
              </div>
              <h4 className="font-cta font-semibold text-foreground mb-2">Експертни интервюта</h4>
              <p className="text-sm text-text-secondary">
                Ексклузивни разговори с водещи AI специалисти и предприемачи.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AINewsletterSection;