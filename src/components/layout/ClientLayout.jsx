'use client';
import React from 'react';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/AuthContext';
export default function ClientLayout({ children }) {
    return (<AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>);
}
