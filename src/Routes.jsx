import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { GoogleAnalyticsProvider } from "./hooks/useGoogleAnalytics";
import NotFound from "pages/NotFound";
import SingleArticle from './pages/single-article';
import CybersecurityCategory from './pages/cybersecurity-category';
import SearchAndArchive from './pages/search-and-archive';
import AICategoryPage from './pages/ai-category';
import AboutPage from './pages/about';
import SEOCategoryPage from './pages/seo-category';
import Homepage from './pages/homepage';
import TeamPage from './pages/team';
import EditorialPolicyPage from './pages/editorial-policy';
import EnhancedSearch from './pages/enhanced-search';
import ContactPage from './pages/contact';
import PrivacyPolicyPage from './pages/privacy-policy';
import TermsOfServicePage from './pages/terms-of-service';
import EthicsPolicyPage from './pages/ethics-policy';
import AIDictionaryPage from './pages/ai-dictionary';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <GoogleAnalyticsProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/single-article" element={<SingleArticle />} />
            <Route path="/cybersecurity-category" element={<CybersecurityCategory />} />
            <Route path="/search-and-archive" element={<SearchAndArchive />} />
            <Route path="/enhanced-search" element={<EnhancedSearch />} />
            <Route path="/ai-category" element={<AICategoryPage />} />
            <Route path="/ai-dictionary" element={<AIDictionaryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/seo-category" element={<SEOCategoryPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/ethics" element={<EthicsPolicyPage />} />
            <Route path="/ethics-policy" element={<EthicsPolicyPage />} />
            <Route path="/ethics-code" element={<EthicsPolicyPage />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </GoogleAnalyticsProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;