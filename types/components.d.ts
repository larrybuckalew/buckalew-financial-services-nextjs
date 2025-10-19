declare module '@/components/ui/tooltip' {
  import { ReactNode } from 'react';
  
  interface TooltipProps {
    children: ReactNode;
    content: string;
  }

  export const Tooltip: React.FC<TooltipProps>;
}

declare module '@/components/ui/popover' {
  import { ReactNode } from 'react';
  
  interface PopoverProps {
    children: ReactNode;
    content: ReactNode;
  }

  export const Popover: React.FC<PopoverProps>;
}

// Update Button types
declare module '@/components/ui/button' {
  import { ReactNode } from 'react';
  
  interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    variant?: 'default' | 'outline' | 'ghost' | 'icon';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }

  export const Button: React.FC<ButtonProps>;
}
