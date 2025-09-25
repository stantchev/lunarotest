import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Димитър Петров",
      role: "Главен редактор",
      expertise: "Киберсигурност, Технологичен анализ",
      bio: `Над 12 години опит в киберсигурността и технологичната журналистика.\nВодещ експерт по информационна сигурност в България.`,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/dimitar-petrov",
        twitter: "https://twitter.com/dpetrov_tech",
        email: "dimitar@linaronews.bg"
      },
      achievements: ["CISSP сертификат", "Автор на 500+ статии", "Говорител на Tech Summit Bulgaria"]
    },
    {
      id: 2,
      name: "Мария Георгиева",
      role: "SEO редактор",
      expertise: "SEO стратегии, Дигитален маркетинг",
      bio: `Специалист по SEO с 8 години опит в дигиталния маркетинг.\nПомогнала е на стотици български компании да подобрят онлайн присъствието си.`,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/maria-georgieva",
        twitter: "https://twitter.com/maria_seo_bg",
        email: "maria@linaronews.bg"
      },
      achievements: ["Google Analytics сертификат", "SEO експерт на годината 2023", "300+ успешни SEO кампании"]
    },
    {
      id: 3,
      name: "Александър Стоянов",
      role: "AI редактор",
      expertise: "Изкуствен интелект, Машинно обучение",
      bio: `PhD в компютърни науки със специализация в AI.\nИзследовател и практик в областта на машинното обучение.`,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/aleksandar-stoyanov",
        twitter: "https://twitter.com/alex_ai_bg",
        email: "aleksandar@linaronews.bg"
      },
      achievements: ["PhD в AI", "20+ научни публикации", "Консултант за AI стратегии"]
    },
    {
      id: 4,
      name: "Елена Николова",
      role: "Технически редактор",
      expertise: "Софтуерно развитие, DevOps",
      bio: `Старши софтуерен инженер с опит в големи технологични компании.\nЕксперт по облачни технологии и DevOps практики.`,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/elena-nikolova",
        twitter: "https://twitter.com/elena_dev_bg",
        email: "elena@linaronews.bg"
      },
      achievements: ["AWS Solutions Architect", "Kubernetes сертификат", "Tech lead в 3 стартъпа"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyber-green/10 text-cyber-green rounded-full px-4 py-2 mb-6">
            <Icon name="Users" size={16} />
            <span className="font-mono text-sm font-medium">Нашият екип</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-6">
            Експертите зад новините
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            Нашият екип се състои от признати експерти в областта на киберсигурността, SEO и изкуствения интелект, 
            които споделят страстта си към технологиите и качествената журналистика.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers?.map((member) => (
            <div key={member?.id} className="bg-card rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
              {/* Member Header */}
              <div className="flex items-start space-x-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted">
                    <Image 
                      src={member?.image} 
                      alt={member?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold text-foreground mb-1">
                    {member?.name}
                  </h3>
                  <p className="font-cta text-primary font-medium mb-2">
                    {member?.role}
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    {member?.expertise}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="font-body text-text-secondary mb-6 leading-relaxed whitespace-pre-line">
                {member?.bio}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="font-cta font-semibold text-foreground mb-3 text-sm">Постижения:</h4>
                <div className="space-y-2">
                  {member?.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Award" size={14} className="text-conversion-orange" />
                      <span className="font-body text-sm text-text-secondary">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <a 
                  href={member?.social?.linkedin}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors"
                  aria-label={`LinkedIn профил на ${member?.name}`}
                >
                  <Icon name="Linkedin" size={18} />
                </a>
                <a 
                  href={member?.social?.twitter}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-ai-blue hover:text-white transition-colors"
                  aria-label={`Twitter профил на ${member?.name}`}
                >
                  <Icon name="Twitter" size={18} />
                </a>
                <a 
                  href={`mailto:${member?.social?.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-cyber-green hover:text-white transition-colors"
                  aria-label={`Имейл до ${member?.name}`}
                >
                  <Icon name="Mail" size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/5 via-ai-blue/5 to-cyber-green/5 rounded-2xl p-8 lg:p-12">
          <Icon name="UserPlus" size={48} className="text-primary mx-auto mb-6" />
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-4">
            Присъединете се към нашия екип
          </h3>
          <p className="font-body text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Търсим талантливи журналисти и технологични експерти, които искат да споделят знанията си 
            с българската технологична общност.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@linaronews.bg"
              className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary/90 transition-colors"
            >
              <Icon name="Mail" size={18} />
              <span>Кариери</span>
            </a>
            <a 
              href="mailto:freelance@linaronews.bg"
              className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-cta font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <Icon name="Edit" size={18} />
              <span>Свободни автори</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;