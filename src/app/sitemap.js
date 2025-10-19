export default function sitemap() {
    const baseUrl = 'https://buckalewfinancial.com';
    const staticRoutes = [
        { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/medicare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/life-insurance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/health-insurance`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ];
    // Dynamically generated routes could be added here
    // For example, if you have blog posts or dynamic services
    const dynamicRoutes = [
    // Example: 
    // { url: `${baseUrl}/blog/${post.slug}`, lastModified: post.updatedAt, changeFrequency: 'daily', priority: 0.5 }
    ];
    return [...staticRoutes, ...dynamicRoutes];
}
