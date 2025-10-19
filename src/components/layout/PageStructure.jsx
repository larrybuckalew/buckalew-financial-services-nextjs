import React from 'react';
import { SEOUtility } from '@/lib/seo';

export const PageStructure = ({ children, title, description, keywords, heroContent }) => {
    // GEMINI_TEST_MARKER_12345
    const seoProps = SEOUtility.generatePageSEO({
        title,
        description,
        keywords
    });
    
    return (
        <>
            {/* <NextSeo {...seoProps} /> */}

            {heroContent && (
                <section 
                    className={`relative py-16 bg-cover bg-center text-white w-full overflow-hidden ${heroContent.className || ''}`}
                    style={{
                        backgroundImage: heroContent.backgroundImage
                            ? `url(${heroContent.backgroundImage})`
                            : 'linear-gradient(to right, #3182ce, #2c5282)'
                    }}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-w-7xl">
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

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl overflow-x-hidden">
                {children}
            </main>

            {/*
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(SEOUtility.generateBusinessSchema())
                }}
            />
            */}
        </>
    );
};
