import { useEffect } from 'react';
import { 
  trackPageView, 
  trackQuoteRequest, 
  trackFormSubmission,
  trackUserInteraction 
} from '../lib/analytics';

export const useQuoteAnalytics = (formStep: number, insuranceType: string | null) => {
  // Track page view on mount
  useEffect(() => {
    trackPageView('/quote');
  }, []);

  // Track form steps
  useEffect(() => {
    if (insuranceType) {
      trackQuoteRequest(insuranceType, formStep);
    }
  }, [formStep, insuranceType]);

  // Track form submission
  const trackSubmission = (success: boolean) => {
    trackFormSubmission('quote_request', success);
  };

  // Track quick quote interaction
  const trackQuickQuote = () => {
    trackUserInteraction('quick_quote', 'click');
  };

  // Track document upload
  const trackFileUpload = (fileName: string) => {
    trackUserInteraction('file_upload', fileName);
  };

  return {
    trackSubmission,
    trackQuickQuote,
    trackFileUpload,
  };
};