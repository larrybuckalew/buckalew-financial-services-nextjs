export function generateMetadata({ title, description, keywords = [], canonical, }) {
    return {
        title: `${title} | Buckalew Financial Services`,
        description,
        keywords: keywords.join(', '),
        alternates: {
            canonical: canonical || undefined,
        },
        openGraph: {
            title,
            description,
            siteName: 'Buckalew Financial Services',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}
