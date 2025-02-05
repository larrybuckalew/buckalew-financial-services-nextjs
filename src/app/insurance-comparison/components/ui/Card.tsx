'use client';

import { forwardRef, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'normal' | 'large';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'normal',
  header,
  footer,
  className = '',
  children,
  ...props
}, ref) => {
  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md'
  };

  const paddingClasses = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  return (
    <div
      ref={ref}
      className={`
        rounded-lg
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b">
          {header}
        </div>
      )}

      <div className={paddingClasses[padding]}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
});