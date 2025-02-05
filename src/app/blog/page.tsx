import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Insurance Blog | Insights & Tips',
  description: 'Stay informed with the latest insights and tips about insurance and financial planning.',
  path: '/blog'
});

// Blog Posts Data
const blogPosts = [
  {
    title: 'Understanding Medicare Options 🏥',
    excerpt: 'A comprehensive guide to Medicare plans and coverage options.',
    date: 'January 15, 2024',
    link: '/blog/understanding-medicare-options'
  },
  {
    title: 'Life Insurance: Term vs Whole Life 👨‍👩‍👧‍👦',
    excerpt: 'Compare different life insurance options to find the best fit for your needs.',
    date: 'January 10, 2024',
    link: '/blog/life-insurance-term-vs-whole-life'
  },
  {
    title: 'Health Insurance Open Enrollment ✨',
    excerpt: 'Important dates and tips for health insurance enrollment period.',
    date: 'January 5, 2024',
    link: '/blog/health-insurance-open-enrollment'
  },
  {
    title: 'How to Save on Health Insurance 💰',
    excerpt: 'Practical tips to reduce your health insurance premiums and out-of-pocket costs.',
    date: 'December 20, 2023',
    link: '/blog/save-on-health-insurance'
  },
  {
    title: 'Medicare Advantage vs Original Medicare 🆚',
    excerpt: 'Understand the differences between Medicare Advantage and Original Medicare.',
    date: 'December 10, 2023',
    link: '/blog/medicare-advantage-vs-original'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Insurance Blog</h1>
            <p className="text-xl mb-8">
              Stay informed with the latest insights and tips about insurance and financial planning.
            </p>
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-primary mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Published: {post.date}</span>
                    <Link
                      href={post.link}
                      className="text-secondary hover:text-secondary-dark font-medium transition duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Personalized Advice?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you navigate complex insurance topics and find the best solutions for your needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}