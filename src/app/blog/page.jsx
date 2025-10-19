import Link from 'next/link';
import BlogClientComponent from './BlogClientComponent';
import { getAllPosts, blogCategories } from '@/lib/blog';
import { PageStructure } from '../../components/layout/PageStructure';
export const metadata = {
    title: 'Financial Insights Blog | Buckalew Financial Services',
    description: 'Expert articles and insights on insurance, financial planning, and wealth management from our experienced team of financial advisors.',
    keywords: ['financial blog', 'insurance advice', 'retirement planning', 'medicare guidance', 'financial education'],
    openGraph: {
        title: 'Financial Insights Blog | Buckalew Financial Services',
        description: 'Expert articles and insights on insurance, financial planning, and wealth management from our experienced team of financial advisors.',
        type: 'website'
    }
};
export default function BlogPage() {
    const blogPosts = getAllPosts();
    const categories = blogCategories.map(cat => cat.name);
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Financial Insights Blog',
            subtitle: 'Expert advice, industry insights, and practical tips to help you make informed financial decisions.'
        }}>
      <BlogClientComponent blogPosts={blogPosts} categories={categories}/>

      <section className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Want to Contribute?
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Are you a financial expert with insights to share? 
          We welcome guest contributions that can help our readers make informed financial decisions.
        </p>
        <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
          Become a Contributor
        </Link>
      </section>
    </PageStructure>);
}
