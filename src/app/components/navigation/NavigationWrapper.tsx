'use client';

import React from 'react';
import MainNav from './MainNav';

interface NavigationWrapperProps {
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
  } | null;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({ user }) => {
  return (
    <header className="sticky top-0 z-50">
      <MainNav user={user} />
    </header>
  );
};

export default NavigationWrapper;