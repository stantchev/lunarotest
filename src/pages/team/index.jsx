import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TeamMemberCard from './components/TeamMemberCard';
import ContactSection from './components/ContactSection';
import ExpertiseSection from './components/ExpertiseSection';

const TeamPage = () => {
  const teamMember = {
    id: 1,
    name: "Милен Станчев",
    role: "Главен редактор и основател",
    bio: "Експерт с над 10 години опит в областта на киберсигурността, SEO оптимизацията и изкуствения интелект. Сертифициран специалист по информационна сигурност (CISSP) и дигитален маркетинг консултант за водещи български компании.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&face&facepad=3",
    expertise: [
      "Киберсигурност и пентестинг",
      "SEO и дигитален маркетинг", 
      "Изкуствен интелект и машинно обучение",
      "Технически анализ и консултации"
    ],
    certifications: [
      "CISSP - Certified Information Systems Security Professional",
      "CEH - Certified Ethical Hacker",
      "Google Analytics Individual Qualification",
      "HubSpot Content Marketing Certified"
    ],
    socialMedia: {
      email: "milen@linaronews.bg",
      linkedin: "https://linkedin.com/in/milen-stanchev",
      twitter: "https://twitter.com/milenstanchev",
      github: "https://github.com/milenstanchev"
    },
    stats: {
      articlesWritten: 247,
      yearsExperience: 10,
      certificationsHeld: 8,
      companiesAdvised: 25
    }
  };

  const achievements = [
    {
      title: "Топ 10 киберсигурност експерт в България",
      source: "CyberSecurity Magazine BG",
      year: "2023",
      icon: "Award"
    },
    {
      title: "SEO консултант на годината",
      source: "Digital Marketing Awards",
      year: "2022",
      icon: "Trophy"
    },
    {
      title: "Говорител на 15+ международни конференции",
      source: "Tech Conference Circuit",
      year: "2020-2024",
      icon: "Mic"
    },
    {
      title: "Автор на 5 професионални ръководства",
      source: "Tech Publishing House",
      year: "2021-2024",
      icon: "BookOpen"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Екип - Милен Станчев | Linaro News</title>
        <meta 
          name="description" 
          content="Запознайте се с Милен Станчев - главният редактор и основател на Linaro News. Експерт по киберсигурност, SEO и изкуствен интелект с над 10 години опит." 
        />
        <meta name="keywords" content="Милен Станчев, киберсигурност експерт, SEO специалист, AI анализатор, технологичен журналист, CISSP, CEH" />
        <meta property="og:title" content="Екип - Милен Станчев | Linaro News" />
        <meta property="og:description" content="Запознайте се с експертния екип зад Linaro News - водещи специалисти в киберсигурността, SEO и AI технологиите." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/team" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=630&fit=crop&face&facepad=3" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Екип - Милен Станчев | Linaro News" />
        <meta name="twitter:description" content="Запознайте се с експертния екип зад Linaro News - водещи специалисти в киберсигурността, SEO и AI технологиите." />
        <link rel="canonical" href="https://linaronews.bg/team" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Милен Станчев",
            "jobTitle": "Главен редактор и основател",
            "worksFor": {
              "@type": "Organization",
              "name": "Linaro News"
            },
            "description": "Експерт по киберсигурност, SEO и изкуствен интелект с над 10 години опит",
            "url": "https://linaronews.bg/team",
            "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&face&facepad=3",
            "sameAs": [
              "https://linkedin.com/in/milen-stanchev",
              "https://twitter.com/milenstanchev",
              "https://github.com/milenstanchev"
            ],
            "hasCredential": [
              "CISSP - Certified Information Systems Security Professional",
              "CEH - Certified Ethical Hacker"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          
          {/* Team Member Profile */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <TeamMemberCard 
                member={teamMember}
                achievements={achievements}
              />
            </div>
          </section>

          <ExpertiseSection expertise={teamMember?.expertise} />
          <ContactSection member={teamMember} />
        </main>
      </div>
    </>
  );
};

export default TeamPage;