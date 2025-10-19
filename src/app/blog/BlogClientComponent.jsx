'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
// Placeholder component for missing images
const ImagePlaceholder = ({ title }) => (<div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center text-blue-600">
    <FileText className="w-12 h-12 mb-2"/>
    <span className="text-xs font-medium text-center px-2">{title.slice(0, 30)}...</span>
  </div>);
export default function BlogClientComponent({ blogPosts, categories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState('idle');
    const [newsletterMessage, setNewsletterMessage] = useState('');
    const [imageErrors, setImageErrors] = useState(new Set());
    // Handle image error
    const handleImageError = (postId) => {
        setImageErrors(prev => new Set(prev).add(postId));
    };
    // Search and filter logic
    const filteredPosts = blogPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) {
            setNewsletterStatus('error');
            setNewsletterMessage('Please enter your email address.');
            return;
        }
        setNewsletterStatus('loading');
        setNewsletterMessage('');
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newsletterEmail }),
            });
            const data = await response.json();
            if (response.ok) {
                setNewsletterStatus('success');
                setNewsletterMessage('Thank you! You\'ve been successfully subscribed to our newsletter.');
                setNewsletterEmail('');
            }
            else {
                throw new Error(data.error || 'Failed to subscribe');
            }
        }
        catch (error) {
            setNewsletterStatus('error');
            setNewsletterMessage('There was an error subscribing to the newsletter. Please try again.');
            console.error('Newsletter subscription error:', error);
        }
    };
    return (<>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input type="text" placeholder="Search blog posts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
      </div>

      <div className="grid md:grid-cols-[3fr,1fr] gap-8">
        {/* Main Blog Posts Section */}
        <section className="space-y-8">
          {filteredPosts.length > 0 ? (filteredPosts.map((post) => (<article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image Section */}
                  <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    {imageErrors.has(post.id) || !post.imageUrl || post.imageUrl.startsWith('/images/blog/') ? (<ImagePlaceholder title={post.title}/>) : (<Image src={post.imageUrl} alt={post.title} width={192} height={192} className="w-full h-full object-cover" onError={() => handleImageError(post.id)}/>)}
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-2">{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</span>
                      <span className="mr-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-primary hover:text-primary-dark transition">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>))) : (<div className="text-center text-gray-600 py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400"/>
              <p className="text-lg">No blog posts found matching your search.</p>
              <p className="text-sm mt-2">Try different keywords or browse our categories.</p>
            </div>)}
        </section>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (<li key={category}>
                  <Link href={`/blog/category/${category.toLowerCase().replace(' ', '-')}`} className="text-gray-700 hover:text-primary transition block py-1">
                    {category}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Stay updated with our latest financial insights
            </p>
            
            {/* Status Messages */}
            {newsletterStatus === 'success' && (<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0"/>
                <p className="text-green-700 text-sm">{newsletterMessage}</p>
              </div>)}
            
            {newsletterStatus === 'error' && (<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"/>
                <p className="text-red-700 text-sm">{newsletterMessage}</p>
              </div>)}
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input type="email" placeholder="Your email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" required/>
              <button type="submit" disabled={newsletterStatus === 'loading'} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                {newsletterStatus === 'loading' ? (<>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>) : ('Subscribe')}
              </button>
            </form>
          </div>

          {/* Popular Tags */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Medicare', 'Life Insurance', 'Retirement', 'Healthcare', 'Financial Planning'].map((tag) => (<Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-light hover:text-primary transition">
                  {tag}
                </Link>))}
            </div>
          </div>
        </aside>
      </div>
    </>);
}
