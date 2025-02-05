'use client'

export const AboutHero = () => {
  return (
    <section className="relative overflow-hidden min-h-[400px] flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-700 via-primary-600 to-secondary-600 opacity-95"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            About Buckalew Financial Services
          </h1>
          <p className="text-xl text-white/90">
            Your trusted partner in insurance and financial planning since 1998
          </p>
        </div>
      </div>
    </section>
  );
};