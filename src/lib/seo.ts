interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

export function generatePageMetadata({ title, description, path = '', keywords = [] }: MetadataProps) {
  return {
    title: `${title} | Buckalew Financial Services`,
    description,
    keywords: [
      'insurance',
      'financial services',
      'medicare',
      'health insurance',
      'life insurance',
      ...keywords
    ].join(', '),
    metadataBase: new URL('https://buckalew-financial.com'),
    canonical: `https://buckalew-financial.com${path}`,
  };
}