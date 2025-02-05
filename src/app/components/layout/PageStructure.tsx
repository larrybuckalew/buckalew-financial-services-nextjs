import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { SEOUtility } from '@/lib/seo';

interface PageStructureProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords?: string[];
  heroContent?: {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
  };
}

export const PageStructure: React.FC<PageStructureProps> = ({
  children,
  title,
  description,
  keywords,
  heroContent
}) => {
  const seoProps = SEOUtility.generatePageSEO({
    title,
    description,
    keywords
  });

  return (
    <>
      <NextSeo {...seoProps} />

      {heroContent && (
        <section 
          className="relative py-16 bg-cover bg-center text-white"
          style={{
            backgroundImage: heroContent.backgroundImage 
              ? `url(${heroContent.backgroundImage})`
              : 'linear-gradient(to right, #3182ce, #2c5282)'
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {heroContent.title}
            </h1>
            {heroContent.subtitle && (
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                {heroContent.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(SEOUtility.generateBusinessSchema())
        }}
      />
    </>
  );
};
