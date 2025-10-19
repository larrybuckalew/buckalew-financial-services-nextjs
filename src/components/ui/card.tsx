"use client";

import React from 'react';

interface BaseProps { children: React.ReactNode; className?: string }

export function Card({ children, className = '' }: BaseProps) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }: BaseProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }: BaseProps) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ className = '', children }: BaseProps) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}

export function CardContent({ className = '', children }: BaseProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardFooter({ className = '', children }: BaseProps) {
  return <div className={`p-6 pt-0 border-t ${className}`}>{children}</div>;
}
