import React from 'react';
import { cn } from '@/lib/utils';

const Select = React.forwardRef((
  { 
    className, 
    children, 
    ...props 
  }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background placeholder:text-muted-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

const SelectOption = React.forwardRef((
  { 
    className, 
    children, 
    ...props 
  }, ref) => {
  return (
    <option
      ref={ref}
      className={cn(
        'text-foreground bg-background',
        className
      )}
      {...props}
    >
      {children}
    </option>
  );
});

SelectOption.displayName = 'SelectOption';

export { Select, SelectOption };