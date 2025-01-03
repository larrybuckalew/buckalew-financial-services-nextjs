import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({ children, defaultValue, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsList) {
      return React.cloneElement(child, {
        activeTab,
        onTabChange: setActiveTab
      });
    }
    return child;
  });

  return (
    <div className={cn('w-full', className)} {...props}>
      {tabChildren}
    </div>
  );
};

const TabsList = ({ children, activeTab, onTabChange, className, ...props }) => {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange
          });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeTab, onTabChange, className, ...props }) => {
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
        'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-accent hover:text-accent-foreground',
        className
      )}
      onClick={() => onTabChange(value)}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, activeTab, className, ...props }) => {
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };