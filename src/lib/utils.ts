<<<<<<< HEAD
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
=======
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const searchProviders = <T>(
  data: T[], 
  searchTerm: string, 
  keys: (keyof T)[]
): T[] => {
  return data.filter(item => 
    keys.some(key => 
      String(item[key])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F, 
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
