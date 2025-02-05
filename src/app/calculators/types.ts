import { ReactNode } from 'react';

export interface CalculatorPageProps {
  children?: ReactNode;
}

export interface TabInfo {
  name: string;
  component: React.ComponentType;
  description: string;
}