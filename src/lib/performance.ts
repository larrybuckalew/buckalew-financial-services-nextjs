import dynamic from 'next/dynamic';
import { ImageProps } from 'next/image';

export class PerformanceOptimizer {
  // Dynamic component loading with custom loading
  static dynamicImport(
    importFn: () => Promise<any>, 
    loadingComponent?: React.ComponentType
  ) {
    return dynamic(importFn, {
      loading: loadingComponent || (() => <div>Loading...</div>),
      ssr: false  // Disable server-side rendering for these components
    });
  }

  // Image optimization wrapper
  static optimizeImage(
    props: Omit<ImageProps, 'src'> & { 
      src: string, 
      placeholder?: 'blur' | 'empty' 
    }
  ) {
    const Image = dynamic(() => import('next/image'), { ssr: false });

    return (
      <Image 
        {...props}
        placeholder={props.placeholder || 'empty'}
        loading="lazy"
        quality={75}
      />
    );
  }

  // Lazy load images with intersection observer
  static lazyLoadImage(src: string, alt: string, className?: string) {
    return (
      <div className="lazy-image-container">
        <img 
          src="/placeholder.svg"
          data-src={src}
          alt={alt}
          className={`lazy-load ${className}`}
        />
      </div>
    );
  }
}

// Client-side script for lazy loading
export const setupLazyLoading = () => {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy-load');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('.lazy-load').forEach(img => {
      observer.observe(img);
    });
  }
};
