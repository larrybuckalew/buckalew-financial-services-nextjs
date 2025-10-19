"use client";
import React from 'react';
export function Card({ children, className = '' }) {
    return (<div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>);
}
export function CardHeader({ className = '', children }) {
    return <div className={`p-6 ${className}`}>{children}</div>;
}
export function CardTitle({ className = '', children }) {
    return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
}
export function CardDescription({ className = '', children }) {
    return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}
export function CardContent({ className = '', children }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
export function CardFooter({ className = '', children }) {
    return <div className={`p-6 pt-0 border-t ${className}`}>{children}</div>;
}
