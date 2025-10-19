import React from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fill = false, 
  width, 
  height, 
  className = '',
  priority = false 
}) => {
  // Check if the image is a placeholder path (doesn't actually exist)
  const isPlaceholder = src.includes('/images/') && !src.includes('.svg');
  
  if (isPlaceholder) {
    // Return a nice placeholder div with an icon
    return (
      <div className={`${fill ? 'absolute inset-0' : ''} ${className} bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center`}>
        <div className="text-center p-4">
          <svg 
            className="w-16 h-16 mx-auto text-blue-400 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-sm text-blue-600 font-medium">{alt}</p>
        </div>
      </div>
    );
  }
  
  // For actual images that exist, use Next.js Image component
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      priority={priority}
    />
  );
};