// Base site configuration
export const SITE_CONFIG = {
    name: 'Buckalew Financial Services',
    description: 'Comprehensive insurance and financial solutions tailored to your needs',
    domain: 'https://buckalewfinancial.com',
    defaultKeywords: [
        'insurance',
        'financial services',
        'medicare',
        'life insurance',
        'health insurance',
        'financial planning'
    ]
};
// SEO Metadata Generator - Export as named function
export const generatePageMetadata = (overrides) => {
    const { title, description = SITE_CONFIG.description, keywords = [], path, ...rest } = overrides;
    const fullTitle = `${title} | ${SITE_CONFIG.name}`;
    return {
        title: fullTitle,
        description: description,
        keywords: [...SITE_CONFIG.defaultKeywords, ...keywords],
        openGraph: {
            title: fullTitle,
            description: description,
            siteName: SITE_CONFIG.name,
            type: 'website',
            url: path ? `${SITE_CONFIG.domain}${path}` : SITE_CONFIG.domain,
            images: [{
                    url: `${SITE_CONFIG.domain}/og-image.jpg`
                }]
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: description,
            images: [`${SITE_CONFIG.domain}/twitter-image.jpg`]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        ...rest
    };
};
// Legacy export for backward compatibility
export const SEOUtility = {
    generatePageSEO: generatePageMetadata,
    generateBusinessSchema: () => {
        return {}; // Placeholder for now
    }
};
