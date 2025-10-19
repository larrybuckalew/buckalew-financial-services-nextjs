import Image from 'next/image';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component for consistent image handling
 * 
 * @param {string} src - Path to image (e.g., "/images/hero/banner.jpg")
 * @param {string} alt - Alt text for accessibility (REQUIRED)
 * @param {number} width - Image width in pixels
 * @param {number} height - Image height in pixels
 * @param {string} className - Additional CSS classes
 * @param {string} priority - Load image with high priority (for above-fold images)
 * @param {string} sizes - Responsive sizes attribute
 * @param {boolean} fill - Make image fill the parent container
 * @param {string} objectFit - How the image should fit (cover, contain, fill, none, scale-down)
 */
const OptimizedImage = ({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    sizes,
    fill = false,
    objectFit = 'cover',
    ...props
}) => {
    // If using fill mode
    if (fill) {
        return (
            <div className={`relative ${className}`}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit }}
                    priority={priority}
                    sizes={sizes || '100vw'}
                    {...props}
                />
            </div>
        );
    }

    // Standard mode with width and height
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            sizes={sizes}
            style={{ objectFit }}
            {...props}
        />
    );
};

export default OptimizedImage;
