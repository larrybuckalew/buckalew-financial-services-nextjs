'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className={`block text-sm font-medium ${
            error ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </label>

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={`
              block w-full rounded-lg border
              focus:ring-2 focus:ring-primary focus:border-primary
              ${error ? 'border-red-300' : 'border-gray-300'}
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${id}-error ${id}-hint`.trim()}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {hint && !error && (
          <p 
            id={`${id}-hint`}
            className="text-sm text-gray-500"
          >
            {hint}
          </p>
        )}

        {error && (
          <p 
            id={`${id}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);