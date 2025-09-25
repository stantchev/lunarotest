import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Иван Петров",
      role: "CTO, TechCorp Bulgaria",
      company: "TechCorp Bulgaria",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      content: `Linaro News е нашият основен източник за актуална информация в областта на киберсигурността.\nТехните анализи ни помагат да вземаме информирани решения за защитата на нашата инфраструктура.`,
      rating: 5,
      category: "Киберсигурност"
    },
    {
      id: 2,
      name: "Мария Димитрова",
      role: "Digital Marketing Manager",
      company: "Sofia Digital Agency",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      content: `Статиите за SEO в Linaro News са изключително практични и актуални.\nБлагодарение на тях успяхме да подобрим значително резултатите на нашите клиенти.`,
      rating: 5,
      category: "SEO"
    },
    {
      id: 3,
      name: "Александър Георгиев",
      role: "AI Research Lead",
      company: "Bulgarian AI Institute",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      content: `Качеството на AI съдържанието в Linaro News е на световно ниво.\nТе успяват да обяснят сложни концепции по достъпен начин, без да губят техническата точност.`,
      rating: 5,
      category: "AI"
    },
    {
      id: 4,
      name: "Елена Стоянова",
      role: "IT Director",
      company: "Bulgarian Bank",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      content: `Редакционните стандарти на Linaro News са образцови.\nВинаги можем да разчитаме на точна и проверена информация, което е критично важно в нашата индустрия.`,
      rating: 5,
      category: "Редакционни стандарти"
    },
    {
      id: 5,
      name: "Георги Николов",
      role: "Cybersecurity Consultant",
      company: "SecureIT Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      content: `Linaro News е задължителна литература за всеки професионалист в областта на киберсигурността.\nТехните експертни анализи и прогнози са безценни за нашата работа.`,
      rating: 5,
      category: "Киберсигурност"
    },
    {
      id: 6,
      name: "Анна Петкова",
      role: "Tech Journalist",
      company: "Freelance",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      content: `Като колега журналист, възхищавам се на професионализма на екипа на Linaro News.\nТе задават стандарта за качествена технологична журналистика в България.`,
      rating: 5,
      category: "Журналистика"
    }
  ];

  const stats = [
    { label: "Доволни читатели", value: "98%", icon: "Heart" },
    { label: "Препоръки", value: "94%", icon: "ThumbsUp" },
    { label: "Връщащи се читатели", value: "87%", icon: "RotateCcw" },
    { label: "Споделяния", value: "15K+", icon: "Share2" }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-conversion-orange/10 text-conversion-orange rounded-full px-4 py-2 mb-6">
            <Icon name="MessageSquare" size={16} />
            <span className="font-mono text-sm font-medium">Отзиви</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Какво казват нашите читатели
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Доверието на нашите читатели е най-голямата ни награда. Ето какво споделят 
            професионалисти от различни области за нашата работа.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="bg-card rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <Icon name={stat?.icon} size={32} className="text-conversion-orange mx-auto mb-4" />
              <div className="font-headline text-2xl font-bold text-foreground mb-2">
                {stat?.value}
              </div>
              <div className="font-cta text-sm text-text-secondary">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-conversion-orange/10 to-transparent rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative">
            {/* Quote Icon */}
            <Icon name="Quote" size={48} className="text-conversion-orange/20 mb-6" />
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-1 mb-4">
                    {[...Array(testimonials?.[activeTestimonial]?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-conversion-orange fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-body text-lg lg:text-xl text-foreground leading-relaxed whitespace-pre-line">
                    "{testimonials?.[activeTestimonial]?.content}"
                  </blockquote>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted">
                    <Image 
                      src={testimonials?.[activeTestimonial]?.image} 
                      alt={testimonials?.[activeTestimonial]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold text-foreground">
                      {testimonials?.[activeTestimonial]?.name}
                    </h4>
                    <p className="font-cta text-primary font-medium">
                      {testimonials?.[activeTestimonial]?.role}
                    </p>
                    <p className="font-mono text-sm text-text-secondary">
                      {testimonials?.[activeTestimonial]?.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="lg:col-span-1 flex lg:flex-col items-center justify-center space-x-4 lg:space-x-0 lg:space-y-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-muted hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-colors"
                  aria-label="Предишен отзив"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  {testimonials?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeTestimonial ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`Отзив ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-muted hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-colors"
                  aria-label="Следващ отзив"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.slice(0, 6)?.map((testimonial, index) => (
            <div key={testimonial?.id} className="bg-card rounded-xl p-6 hover:shadow-md transition-shadow">
              {/* Category Badge */}
              <div className="inline-flex items-center space-x-1 bg-conversion-orange/10 text-conversion-orange rounded-full px-3 py-1 text-xs font-mono font-medium mb-4">
                <Icon name="Tag" size={12} />
                <span>{testimonial?.category}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-conversion-orange fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="font-body text-text-secondary text-sm leading-relaxed mb-4 whitespace-pre-line">
                "{testimonial?.content?.split('\n')?.[0]}..."
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted">
                  <Image 
                    src={testimonial?.image} 
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-cta font-semibold text-foreground text-sm">
                    {testimonial?.name}
                  </h5>
                  <p className="font-mono text-xs text-text-secondary">
                    {testimonial?.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-conversion-orange/5 via-primary/5 to-ai-blue/5 rounded-2xl p-8 lg:p-12">
          <Icon name="Users" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
            Станете част от нашата общност
          </h3>
          <p className="font-body text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Присъединете се към хиляди професионалисти, които разчитат на Linaro News 
            за актуална информация в областта на технологиите.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/newsletter"
              className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary/90 transition-colors"
            >
              <Icon name="Mail" size={18} />
              <span>Абонирайте се</span>
            </a>
            <a 
              href="/feedback"
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="MessageCircle" size={18} />
              <span>Споделете мнение</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;