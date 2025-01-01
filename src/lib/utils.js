import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to conditionally merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper function to format currency
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

// Helper function to format date
export function formatDate(date, format = 'short') {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: format
  }).format(new Date(date));
}

// Generate unique ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}