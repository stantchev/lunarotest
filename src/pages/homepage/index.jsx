import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrendingArticles from './components/TrendingArticles';
import CategoryNavigation from './components/CategoryNavigation';
import StatsSection from './components/StatsSection';
import NewsletterSection from './components/NewsletterSection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Linaro News - Българска платформа за киберсигурност, SEO и AI новини</title>
        <meta 
          name="description" 
          content="Водещата българска платформа за технологични новини. Експертни анализи в областта на киберсигурността, SEO оптимизация и изкуствен интелект от сертифицирани специалисти." 
        />
        <meta name="keywords" content="киберсигурност, SEO, изкуствен интелект, AI, технологични новини, България, IT новини, хакерски атаки, Google алгоритми" />
        <meta property="og:title" content="Linaro News - Българска платформа за киберсигурност, SEO и AI новини" />
        <meta property="og:description" content="Експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект. Присъединете се към 28,400+ професионалисти." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linaronews.bg/homepage" />
        <meta property="og:image" content="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Linaro News - Българска платформа за киберсигурност, SEO и AI новини" />
        <meta name="twitter:description" content="Експертни анализи и актуални новини от света на киберсигурността, SEO и изкуствения интелект." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200" />
        <link rel="canonical" href="https://linaronews.bg/homepage" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="bg" />
        <meta name="geo.region" content="BG" />
        <meta name="geo.country" content="Bulgaria" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            "name": "Linaro News",
            "url": "https://linaronews.bg",
            "logo": "https://linaronews.bg/logo.png",
            "description": "Българска платформа за технологични новини със специализация в киберсигурност, SEO и изкуствен интелект",
            "foundingDate": "2024",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BG",
              "addressLocality": "София"
            },
            "sameAs": [
              "https://facebook.com/linaronews",
              "https://twitter.com/linaronews",
              "https://linkedin.com/company/linaronews"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <TrendingArticles />
          <CategoryNavigation />
          <StatsSection />
          <NewsletterSection />
        </main>
      </div>
    </>
  );
};

export default Homepage;