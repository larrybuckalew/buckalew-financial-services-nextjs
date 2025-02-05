'use client';

import { StandardErrorBoundary } from '@/components/errors/StandardErrorBoundary';
import { CardGridSkeleton } from '@/components/loading/CardSkeleton';
import { useMedicareData } from '@/hooks/useMedicareData';
import Link from 'next/link';

const MedicareOptionCard = ({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link
      href={link}
      className="text-secondary hover:text-secondary-dark font-medium"
    >
      Learn More →
    </Link>
  </div>
);

export function MedicareOptions() {
  const { data, isLoading, error } = useMedicareData();

  if (isLoading) {
    return <CardGridSkeleton count={3} />;
  }

  if (error) {
    throw error; // This will be caught by the error boundary
  }

  if (!data) {
    return null;
  }

  return (
    <StandardErrorBoundary type="medicare">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Medicare Coverage Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.options.map((option, index) => (
              <MedicareOptionCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>
    </StandardErrorBoundary>
  );
}