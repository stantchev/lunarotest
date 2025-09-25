import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Skip initialization in development environments
    if (import.meta.env?.MODE === 'development') return;

    // Only initialize if we have a GA ID and it's not a placeholder
    const gaId = import.meta.env?.VITE_GOOGLE_ANALYTICS_ID;
    if (!gaId || gaId === 'your-google-analytics-id-here') return;

    // Initialize gtag.js if not already done
    if (!window.dataLayer) {
      // Load gtag.js script dynamically
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args) {
          window.dataLayer?.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', gaId, {
          page_title: document.title,
          page_location: window.location?.href,
        });
      };
      document.head?.appendChild(script);
    }

    // Send page_view event on route changes
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location?.href,
        page_path: location?.pathname + (location?.search || ''),
      });
    }
  }, [location]);

  // Return tracking function for components to use
  const trackEvent = (eventName, parameters = {}) => {
    const gaId = import.meta.env?.VITE_GOOGLE_ANALYTICS_ID;
    if (
      import.meta.env?.MODE === 'production' && 
      typeof window.gtag !== 'undefined' &&
      gaId && 
      gaId !== 'your-google-analytics-id-here'
    ) {
      window.gtag('event', eventName, {
        page_path: location?.pathname,
        ...parameters,
      });
    }
  };

  return { trackEvent };
}

// Analytics component to be used inside Router context
export function GoogleAnalyticsProvider({ children }) {
  useGoogleAnalytics();
  return children;
}