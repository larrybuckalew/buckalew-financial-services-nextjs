export const optimizeImage = (url, width) => {
    return {
        src: url,
        width,
        loader: 'cloudinary',
        quality: 75,
        format: 'webp',
    };
};
export const lazyLoadImage = (element) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || '';
                observer.unobserve(img);
            }
        });
    });
    observer.observe(element);
};
