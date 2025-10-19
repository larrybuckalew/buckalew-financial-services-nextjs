import dynamic from 'next/dynamic';
export class PerformanceOptimizer {
    // Dynamic component loading with custom loading
    static dynamicImport(importFn, loadingComponent) {
        return dynamic(importFn, {
            loading: loadingComponent || (() => Loading), .../div>
        }),
            ssr;
        false; // Disable server-side rendering for these components
    }
    ;
}
optimizeImage(props, (Omit) & {
    src: string,
    placeholder: 'blur' | 'empty'
});
{
    const Image = dynamic(() => import('next/image'), { ssr: false });
    return { ...props };
    placeholder = { props, : .placeholder || 'empty' };
    loading = "lazy";
    quality = { 75:  }
        /  >
    ;
    ;
}
lazyLoadImage(src, string, alt, string, className ?  : string);
{
    return className = "lazy-image-container" >
        src;
    "/placeholder.svg";
    data - src;
    {
        src;
    }
    alt = { alt };
    className = {} `lazy-load ${className}`;
}
/>
    < /div>;
;
// Client-side script for lazy loading
export const setupLazyLoading = () => {
    if (typeof window !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
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
