import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = ({ member }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Show success message (in real app, show toast)
    alert('Съобщението беше изпратено успешно!');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-headline font-bold text-3xl text-foreground mb-6">
              Свържете се с {member?.name?.split(' ')?.[0]}
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Имате въпроси за киберсигурността, SEO или AI? Милен е на разположение за 
              консултации, интервюта и технически дискусии.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-cta font-semibold text-foreground">Email</h4>
                  <a 
                    href={`mailto:${member?.socialMedia?.email}`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {member?.socialMedia?.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Linkedin" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-cta font-semibold text-foreground">LinkedIn</h4>
                  <a 
                    href={member?.socialMedia?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    /in/milen-stanchev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-cta font-semibold text-foreground">Време за отговор</h4>
                  <p className="text-text-secondary">Обикновено в рамките на 24 часа</p>
                </div>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="mt-8 p-6 bg-card border border-border rounded-lg">
              <h4 className="font-cta font-semibold text-foreground mb-3">Теми за дискусия:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Киберсигурност",
                  "Пентестинг", 
                  "SEO стратегии",
                  "AI в бизнеса",
                  "Tech консултации",
                  "Дигитална трансформация"
                ]?.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="font-cta font-bold text-xl text-foreground mb-6">
              Изпратете съобщение
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Вашето име"
                  value={formData?.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email адрес"
                  value={formData?.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                type="text"
                name="subject"
                placeholder="Тема на съобщението"
                value={formData?.subject}
                onChange={handleInputChange}
                required
              />

              <div>
                <textarea
                  name="message"
                  placeholder="Вашето съобщение..."
                  value={formData?.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90"
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? 'Изпращане...' : 'Изпрати съобщение'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="inline mr-2" />
                Вашите данни са защитени и няма да бъдат споделени с трети страни.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;