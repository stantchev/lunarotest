import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    cybersecurity: false,
    seo: false,
    ai: false,
    breaking: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  const handlePreferenceChange = (category) => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-cyber-green/10 via-ai-blue/10 to-conversion-orange/10 rounded-xl p-8 text-center border border-cyber-green/20">
        <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-cyber-green" />
        </div>
        <h3 className="font-headline font-bold text-xl text-foreground mb-2">
          Успешно се абонирахте!
        </h3>
        <p className="font-body text-text-secondary">
          Благодарим ви! Ще получавате най-новите технологични новини директно в пощенската си кутия.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 via-cyber-green/5 to-ai-blue/5 rounded-xl p-8 border border-primary/10">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-cyber-green to-ai-blue rounded-lg flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={24} color="white" />
        </div>
        <h3 className="font-headline font-bold text-xl text-foreground mb-2">
          Присъединете се към нашата мрежа
        </h3>
        <p className="font-body text-text-secondary">
          Получавайте най-важните технологични новини и анализи директно в пощенската си кутия
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          type="email"
          label="Имейл адрес"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
          className="mb-4"
        />

        {/* Preferences */}
        <div>
          <label className="block font-cta font-semibold text-foreground mb-4">
            Изберете интереси:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Checkbox
              label="Киберсигурност"
              checked={preferences?.cybersecurity}
              onChange={() => handlePreferenceChange('cybersecurity')}
            />
            <Checkbox
              label="SEO и Маркетинг"
              checked={preferences?.seo}
              onChange={() => handlePreferenceChange('seo')}
            />
            <Checkbox
              label="Изкуствен интелект"
              checked={preferences?.ai}
              onChange={() => handlePreferenceChange('ai')}
            />
            <Checkbox
              label="Спешни новини"
              checked={preferences?.breaking}
              onChange={() => handlePreferenceChange('breaking')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!email || isSubmitting}
          className="bg-gradient-to-r from-cyber-green to-ai-blue hover:from-cyber-green/90 hover:to-ai-blue/90 text-white font-cta font-semibold"
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Абониране...' : 'Абонирайте се безплатно'}
        </Button>

        {/* Privacy Notice */}
        <p className="text-xs text-text-secondary text-center">
          Като се абонирате, вие се съгласявате с нашите{' '}
          <a href="#" className="text-primary hover:underline">условия за ползване</a>{' '}
          и{' '}
          <a href="#" className="text-primary hover:underline">политика за поверителност</a>.
          Можете да се отпишете по всяко време.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;