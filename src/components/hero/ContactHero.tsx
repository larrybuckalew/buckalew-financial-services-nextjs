'use client'

export const ContactHero = () => {
  return (
    <section className="relative overflow-hidden min-h-[300px] flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-secondary-600 via-primary-600 to-primary-700 opacity-95"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Contact Us
          </h1>
          <p className="text-xl text-white/90">
            Let's discuss how we can help protect your future
          </p>
        </div>
      </div>
    </section>
  );
};