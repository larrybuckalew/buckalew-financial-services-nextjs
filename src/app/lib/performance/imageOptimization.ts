export const optimizeImage = (url: string, width: number) => {
  return {
    src: url,
    width,
    loader: 'cloudinary',
    quality: 75,
    format: 'webp',
  }
}

export const lazyLoadImage = (element: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        observer.unobserve(img);
      }
    });
  });

  observer.observe(element);
}