// Page view tracking
export const trackPageView = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
            page_path: url,
        });
    }
};
// Event tracking
export const trackEvent = ({ action, category, label, value, nonInteraction = false }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
            non_interaction: nonInteraction,
        });
    }
};
// Form submission tracking
export const trackFormSubmission = (formName, success) => {
    trackEvent({
        action: success ? 'form_submission_success' : 'form_submission_failure',
        category: 'Forms',
        label: formName,
    });
};
// Document download tracking
export const trackDownload = (documentName) => {
    trackEvent({
        action: 'download',
        category: 'Documents',
        label: documentName,
    });
};
// User interaction tracking
export const trackUserInteraction = (elementName, interactionType) => {
    trackEvent({
        action: interactionType,
        category: 'User Interaction',
        label: elementName,
    });
};
// Quote request tracking
export const trackQuoteRequest = (insuranceType, step) => {
    trackEvent({
        action: 'quote_request_step',
        category: 'Quotes',
        label: insuranceType,
        value: step,
    });
};
// Privacy policy section view tracking
export const trackPolicySection = (sectionName) => {
    trackEvent({
        action: 'view_policy_section',
        category: 'Policy',
        label: sectionName,
        nonInteraction: true,
    });
};
// Print tracking
export const trackPrint = (documentType) => {
    trackEvent({
        action: 'print',
        category: 'Documents',
        label: documentType,
    });
};
