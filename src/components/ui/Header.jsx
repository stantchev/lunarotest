import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Начало', path: '/', icon: 'Home' },
    { name: 'Киберсигурност', path: '/cybersecurity-category', icon: 'Shield' },
    { name: 'SEO', path: '/seo-category', icon: 'Search' },
    { name: 'AI', path: '/ai-category', icon: 'Brain' },
    { name: 'Архив', path: '/search-and-archive', icon: 'Archive' },
  ];

  const secondaryItems = [
    { name: 'За нас', path: '/about', icon: 'Info' },
    { name: 'Екип', path: '/team', icon: 'Users' },
    { name: 'Контакт', path: '/contact', icon: 'Mail' },
    { name: 'Редакционна политика', path: '/editorial-policy', icon: 'FileText' },
    { name: 'Поверителност', path: '/privacy', icon: 'Shield' },
    { name: 'Общи условия', path: '/terms', icon: 'BookOpen' },
    { name: 'Етика', path: '/ethics-code', icon: 'Heart' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-green to-ai-blue rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-foreground leading-none">
                Linaro News
              </span>
              <span className="font-mono text-xs text-text-secondary leading-none">
                Tech Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>Още</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-96 overflow-y-auto">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors ${
                        isActivePath(item?.path)
                          ? 'bg-accent/10 text-accent' :'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Newsletter CTA */}
            <Button
              variant="default"
              size="sm"
              className="hidden md:flex bg-gradient-to-r from-cyber-green to-ai-blue hover:from-cyber-green/90 hover:to-ai-blue/90 text-white font-cta font-semibold shadow-cyber"
              iconName="Mail"
              iconPosition="left"
              iconSize={16}
            >
              Присъедини се
            </Button>

            {/* Breaking News Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs font-mono font-medium text-accent">НА ЖИВО</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md max-h-[70vh] overflow-y-auto">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-border my-4"></div>
              
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-accent/10 text-accent' :'text-text-secondary hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="default"
                  size="default"
                  fullWidth
                  className="bg-gradient-to-r from-cyber-green to-ai-blue hover:from-cyber-green/90 hover:to-ai-blue/90 text-white font-cta font-semibold shadow-cyber"
                  iconName="Mail"
                  iconPosition="left"
                  iconSize={18}
                >
                  Join Intelligence Network
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;