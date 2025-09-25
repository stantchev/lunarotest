import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [frequency, setFrequency] = useState('weekly');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    {
      id: 'cybersecurity',
      name: 'Киберсигурност',
      description: 'Заплахи, защита и анализи',
      icon: 'Shield',
      color: 'text-cyber-green'
    },
    {
      id: 'seo',
      name: 'SEO',
      description: 'Алгоритми и оптимизация',
      icon: 'Search',
      color: 'text-conversion-orange'
    },
    {
      id: 'ai',
      name: 'AI',
      description: 'Изкуствен интелект и ML',
      icon: 'Brain',
      color: 'text-ai-blue'
    }
  ];

  const frequencies = [
    { id: 'daily', name: 'Ежедневно', description: 'Най-важните новини всеки ден' },
    { id: 'weekly', name: 'Седмично', description: 'Обобщение на седмицата всеки петък' },
    { id: 'monthly', name: 'Месечно', description: 'Дълбочинни анализи веднъж месечно' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleCategoryChange = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev?.filter(id => id !== categoryId));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Имейлът е задължителен';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Моля, въведете валиден имейл адрес';
    }

    if (selectedCategories?.length === 0) {
      newErrors.categories = 'Моля, изберете поне една категория';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubscribed(true);
    } catch (error) {
      setErrors({ submit: 'Възникна грешка. Моля, опитайте отново.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-success/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="w-20 h-20 bg-success/20 border-2 border-success rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground">
                Успешно се абонирахте!
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Благодарим ви! Ще получавате най-актуалните новини от избраните категории на адрес <strong>{email}</strong>
              </p>
            </div>

            <div className="bg-background/50 border border-border rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-foreground mb-4">Вашите предпочитания:</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div>Категории: {selectedCategories?.map(id => categories?.find(c => c?.id === id)?.name)?.join(', ')}</div>
                <div>Честота: {frequencies?.find(f => f?.id === frequency)?.name}</div>
              </div>
            </div>

            <Button
              variant="outline"
              size="default"
              onClick={() => {
                setIsSubscribed(false);
                setEmail('');
                setSelectedCategories([]);
                setFrequency('weekly');
              }}
              iconName="Settings"
              iconPosition="left"
            >
              Промени настройките
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyber-green to-ai-blue rounded-xl flex items-center justify-center">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-cyber-green to-ai-blue rounded-full"></div>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-headline font-bold text-foreground leading-tight">
                Присъединете се към <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Intelligence Network</span>
              </h2>
              
              <p className="text-xl text-text-secondary leading-relaxed">
                Получавайте експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект директно в пощата си.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Защо да се абонирате:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: 'Zap', text: 'Първи научавайте за важни новини' },
                  { icon: 'Users', text: 'Експертни анализи от професионалисти' },
                  { icon: 'Filter', text: 'Персонализирано съдържание' },
                  { icon: 'Shield', text: 'Без спам, лесно отписване' }
                ]?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={benefit?.icon} size={16} className="text-primary" />
                    </div>
                    <span className="text-text-secondary">{benefit?.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6 border-t border-border">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5]?.map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background flex items-center justify-center text-white text-sm font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-text-secondary">
                <div className="font-semibold text-foreground">12,847+ абонати</div>
                <div className="text-sm">се доверяват на нашите анализи</div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-background border border-border rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <Input
                  type="email"
                  label="Имейл адрес"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  error={errors?.email}
                  required
                  className="text-lg"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Избери категории *
                  </h3>
                  {errors?.categories && (
                    <p className="text-sm text-destructive mb-3">{errors?.categories}</p>
                  )}
                </div>
                
                <div className="grid gap-3">
                  {categories?.map((category) => (
                    <div
                      key={category?.id}
                      className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={selectedCategories?.includes(category?.id)}
                        onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                      />
                      <div className={`w-10 h-10 bg-${category?.color?.split('-')?.[1]}/10 rounded-lg flex items-center justify-center`}>
                        <Icon name={category?.icon} size={20} className={category?.color} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{category?.name}</div>
                        <div className="text-sm text-text-secondary">{category?.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Честота на съобщенията</h3>
                <div className="space-y-2">
                  {frequencies?.map((freq) => (
                    <label
                      key={freq?.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={freq?.id}
                        checked={frequency === freq?.id}
                        onChange={(e) => setFrequency(e?.target?.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{freq?.name}</div>
                        <div className="text-sm text-text-secondary">{freq?.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg"
                iconName="Send"
                iconPosition="right"
              >
                {isLoading ? 'Абониране...' : 'Абонирай се безплатно'}
              </Button>

              {errors?.submit && (
                <p className="text-sm text-destructive text-center">{errors?.submit}</p>
              )}

              {/* Privacy Notice */}
              <p className="text-xs text-text-secondary text-center leading-relaxed">
                Абонирайки се, вие се съгласявате с нашите{' '}
                <a href="#" className="text-primary hover:underline">Условия за ползване</a>{' '}
                и{' '}
                <a href="#" className="text-primary hover:underline">Политика за поверителност</a>.
                Можете да се отпишете по всяко време.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;