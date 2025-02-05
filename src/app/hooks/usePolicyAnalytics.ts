import { useEffect } from 'react';
import { trackPageView, trackPolicySection, trackPrint } from '../lib/analytics';

export const usePolicyAnalytics = (pageType: 'privacy' | 'terms') => {
  // Track page view on mount
  useEffect(() => {
    trackPageView(pageType === 'privacy' ? '/privacy-policy' : '/terms-of-service');
  }, [pageType]);

  // Track section views
  const trackSection = (sectionName: string) => {
    trackPolicySection(`${pageType}_${sectionName}`);
  };

  // Track policy print
  const trackPolicyPrint = () => {
    trackPrint(pageType === 'privacy' ? 'privacy_policy' : 'terms_of_service');
  };

  return {
    trackSection,
    trackPolicyPrint,
  };
};