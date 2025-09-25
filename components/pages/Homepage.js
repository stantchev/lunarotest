'use client';

import React from 'react';
import Header from '../ui/Header';
import HeroSection from '../../src/pages/homepage/components/HeroSection';
import TrendingArticles from '../../src/pages/homepage/components/TrendingArticles';
import CategoryNavigation from '../../src/pages/homepage/components/CategoryNavigation';
import StatsSection from '../../src/pages/homepage/components/StatsSection';
import NewsletterSection from '../../src/pages/homepage/components/NewsletterSection';

const Homepage = () => {
  return (
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
  );
};

export default Homepage;