import React from 'react';
import Button from '../ui/Button';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md">
      {Icon && <Icon className="w-20 h-20 text-primary mb-6" />}
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;