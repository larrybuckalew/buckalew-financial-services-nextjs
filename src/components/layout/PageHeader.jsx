import React from 'react';
import { cn } from '@/lib/utils';

const PageHeader = ({ 
  title, 
  description, 
  actions, 
  className 
}) => {
  return (
    <div className={cn('flex justify-between items-center mb-6', className)}>
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;