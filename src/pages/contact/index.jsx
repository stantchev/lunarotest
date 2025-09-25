import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    attachments: null,
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachments: e?.target?.files?.[0] || null
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        attachments: null,
        newsletter: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Електронна поща',
      description: 'За всички видове запитвания',
      contact: 'info@linaronews.bg',
      href: 'mailto:info@linaronews.bg'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      description: 'Работни дни 09:00-18:00',
      contact: '+359 888 123 456',
      href: 'tel:+359888123456'
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      description: 'Бързи съобщения и новини',
      contact: '@LinaroNews',
      href: 'https://t.me/LinaroNews'
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      description: 'София, България',
      contact: 'бул. Витоша 1А',
      href: 'https://maps.google.com/?q=София+България'
    }
  ];

  const teamMembers = [
    {
      name: 'Милен Станчев',
      role: 'Главен редактор',
      specialization: 'Киберсигурност',
      email: 'milen@linaronews.bg',
      expertise: ['Пентестинг', 'Threat Intelligence', 'Инцидентен мениджмент']
    },
    {
      name: 'Редакционен екип',
      role: 'SEO Специалисти',
      specialization: 'SEO & Google алгоритми',
      email: 'seo@linaronews.bg',
      expertise: ['Technical SEO', 'Content Strategy', 'Analytics']
    },
    {
      name: 'AI Експерти',
      role: 'Изследователски екип',
      specialization: 'Изкуствен интелект',
      email: 'ai@linaronews.bg',
      expertise: ['Machine Learning', 'NLP', 'AI Ethics']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Свържете се с нас - Linaro News | Контакти за киберсигурност, SEO и AI новини</title>
        <meta 
          name="description" 
          content="Свържете се с екипа на Linaro News за въпроси относно киберсигурност, SEO и AI новини. Професионална техническа поддръжка и експертни съвети от сертифицирани специалисти." 
        />
        <meta name="keywords" content="контакти, Linaro News, киберсигурност експерти, SEO консултации, AI въпроси, техническа поддръжка, България" />
        <meta property="og:title" content="Свържете се с нас - Linaro News | Експертни контакти" />
        <meta property="og:description" content="Директна връзка с експертите от Linaro News. Получете професионални съвети по киберсигурност, SEO и изкуствен интелект." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/contact" />
        <link rel="canonical" href="https://linaronews.bg/contact" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Linaro News Контакти",
            "url": "https://linaronews.bg/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Linaro News",
              "email": "info@linaronews.bg",
              "telephone": "+359888123456",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BG",
                "addressLocality": "София",
                "streetAddress": "бул. Витоша 1А"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-cyber-green/5 via-ai-blue/5 to-accent/5 py-16 lg:py-24">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 border border-cyber-green/20 rounded-full px-4 py-2 mb-8">
                  <Icon name="MessageCircle" size={16} className="text-cyber-green" />
                  <span className="text-sm font-medium text-cyber-green">Директна връзка с експертите</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-headline font-bold text-foreground mb-6">
                  Свържете се с{' '}
                  <span className="bg-gradient-to-r from-cyber-green to-ai-blue bg-clip-text text-transparent">
                    експертния екип
                  </span>
                </h1>
                
                <p className="text-xl text-text-secondary leading-relaxed mb-8">
                  Имате въпроси относно киберсигурността, SEO или изкуствения интелект? 
                  Нашият екип от сертифицирани специалисти е готов да ви помогне с професионални съвети и анализи.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm font-medium">Отговор до 24 часа</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cyber-green">
                    <Icon name="Shield" size={16} />
                    <span className="text-sm font-medium">Сигурни комуникации</span>
                  </div>
                  <div className="flex items-center space-x-2 text-ai-blue">
                    <Icon name="Award" size={16} />
                    <span className="text-sm font-medium">Експертни съвети</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-foreground mb-4">
                  Начини за връзка
                </h2>
                <p className="text-lg text-text-secondary">
                  Изберете най-удобния за вас начин за комуникация
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods?.map((method, index) => (
                  <a
                    key={index}
                    href={method?.href}
                    className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyber-green/10 to-ai-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon name={method?.icon} size={24} className="text-primary" />
                      </div>
                      
                      <h3 className="font-cta font-semibold text-foreground mb-2">
                        {method?.title}
                      </h3>
                      
                      <p className="text-sm text-text-secondary mb-3">
                        {method?.description}
                      </p>
                      
                      <p className="text-sm font-medium text-primary group-hover:text-primary/80">
                        {method?.contact}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-16 bg-muted/20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-foreground mb-4">
                  Изпратете запитване
                </h2>
                <p className="text-lg text-text-secondary">
                  Попълнете формата и ще се свържем с вас възможно най-скоро
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <p className="text-success font-medium">
                      Съобщението е изпратено успешно! Ще се свържем с вас до 24 часа.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-3">
                    <Icon name="AlertCircle" size={20} className="text-destructive" />
                    <p className="text-destructive font-medium">
                      Възникна грешка при изпращането. Моля, опитайте отново.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Име и фамилия"
                      name="name"
                      value={formData?.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Въведете вашето име"
                    />
                    
                    <Input
                      label="Имейл адрес"
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@domain.com"
                    />
                  </div>

                  <Input
                    label="Тема на запитването"
                    name="subject"
                    value={formData?.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Кратко описание на вашето запитване"
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Категория запитване <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleInputChange}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="general">Общи въпроси</option>
                      <option value="cybersecurity">Киберсигурност</option>
                      <option value="seo">SEO оптимизация</option>
                      <option value="ai">Изкуствен интелект</option>
                      <option value="partnership">Партньорство</option>
                      <option value="press">Медии и пресцентър</option>
                      <option value="technical">Технически проблеми</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Съобщение <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData?.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-vertical"
                      placeholder="Детайлно опишете вашето запитване..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Прикачени файлове (опционално)
                    </label>
                    <input
                      type="file"
                      name="attachments"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                    />
                    <p className="text-xs text-text-secondary">
                      Поддържани формати: PDF, DOC, DOCX, JPG, PNG (макс. 10MB)
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Input
                      type="checkbox"
                      name="newsletter"
                      checked={formData?.newsletter}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <label className="text-sm text-text-secondary">
                      Искам да получавам бюлетина с най-новите новини за киберсигурност, SEO и AI
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    className="bg-gradient-to-r from-cyber-green to-ai-blue hover:from-cyber-green/90 hover:to-ai-blue/90 text-white font-semibold"
                    iconName="Send"
                    iconPosition="left"
                  >
                    {isSubmitting ? 'Изпраща се...' : 'Изпрати съобщение'}
                  </Button>
                </form>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-headline font-bold text-foreground mb-4">
                  Нашият експертен екип
                </h2>
                <p className="text-lg text-text-secondary">
                  Свържете се директно със специалистите по съответната област
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {teamMembers?.map((member, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyber-green/20 to-ai-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="User" size={28} className="text-primary" />
                      </div>
                      
                      <h3 className="font-cta font-bold text-foreground mb-1">
                        {member?.name}
                      </h3>
                      
                      <p className="text-sm text-primary font-medium mb-2">
                        {member?.role}
                      </p>
                      
                      <p className="text-sm text-text-secondary">
                        {member?.specialization}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Експертни области:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member?.expertise?.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href={`mailto:${member?.email}`}
                        className="flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gradient-to-r from-cyber-green/10 to-ai-blue/10 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors group"
                      >
                        <Icon name="Mail" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary group-hover:text-primary/80">
                          {member?.email}
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Office Hours */}
          <section className="py-16 bg-gradient-to-r from-cyber-green/5 to-ai-blue/5">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-card/80 backdrop-blur border border-border/50 rounded-xl p-8">
                <Icon name="Clock" size={48} className="text-primary mx-auto mb-6" />
                
                <h2 className="text-2xl font-headline font-bold text-foreground mb-4">
                  Работно време
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-cta font-semibold text-foreground mb-3">Поддръжка:</h3>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>Понеделник - Петък: 09:00 - 18:00</p>
                      <p>Събота: 10:00 - 14:00</p>
                      <p>Неделя: Затворено</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-cta font-semibold text-foreground mb-3">Спешни случаи:</h3>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>Киберсигурност: 24/7</p>
                      <p>Критични проблеми: До 2 часа</p>
                      <p>Telegram: Бързо реагиране</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg">
                  <p className="text-sm text-cyber-green font-medium">
                    🚨 За спешни киберинциденти използвайте директния телефон или Telegram канал
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactPage;