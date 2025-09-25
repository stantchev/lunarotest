import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import TeamSection from './components/TeamSection';
import EditorialStandardsSection from './components/EditorialStandardsSection';
import TransparencySection from './components/TransparencySection';
import TestimonialsSection from './components/TestimonialsSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <MissionSection />
        <TeamSection />
        <EditorialStandardsSection />
        <TransparencySection />
        <TestimonialsSection />
      </main>
      {/* Footer */}
      <footer className="bg-dark-bg text-text-off-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyber-green to-ai-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <div className="font-headline font-bold text-lg text-text-off-white">
                    Linaro News
                  </div>
                  <div className="font-mono text-xs text-text-medium-gray">
                    Tech Intelligence
                  </div>
                </div>
              </div>
              <p className="font-body text-text-medium-gray text-sm leading-relaxed">
                Водещата българска платформа за технологични новини, киберсигурност и AI интелигентност.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-cta font-semibold text-text-off-white mb-4">Бързи връзки</h4>
              <ul className="space-y-2">
                <li><a href="/homepage" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">Начало</a></li>
                <li><a href="/cybersecurity-category" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">Киберсигурност</a></li>
                <li><a href="/seo-category" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">SEO</a></li>
                <li><a href="/ai-category" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">AI</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-cta font-semibold text-text-off-white mb-4">За нас</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">За Linaro News</a></li>
                <li><a href="/team" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">Нашият екип</a></li>
                <li><a href="/editorial-policy" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">Редакционна политика</a></li>
                <li><a href="/contact" className="font-body text-text-medium-gray hover:text-cyber-green transition-colors text-sm">Контакти</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-cta font-semibold text-text-off-white mb-4">Контакт</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-text-medium-gray text-sm">editorial@linaronews.bg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-text-medium-gray text-sm">+359 888 123 456</span>
                </div>
                <div className="flex space-x-3 mt-4">
                  <a href="#" className="w-8 h-8 bg-text-medium-gray/20 hover:bg-cyber-green rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-text-off-white text-sm">Li</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-text-medium-gray/20 hover:bg-ai-blue rounded-lg flex items-center justify-center transition-colors">
                    <span className="text-text-off-white text-sm">Tw</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-text-medium-gray/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="font-mono text-text-medium-gray text-sm">
              © {new Date()?.getFullYear()} Linaro News. Всички права запазени.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="font-mono text-text-medium-gray hover:text-cyber-green transition-colors text-sm">
                Поверителност
              </a>
              <a href="/terms" className="font-mono text-text-medium-gray hover:text-cyber-green transition-colors text-sm">
                Условия
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;