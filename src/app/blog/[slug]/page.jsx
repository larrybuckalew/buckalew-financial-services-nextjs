import Image from 'next/image';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog';
import BlogContentRenderer from '@/components/blog/BlogContentRenderer';
import { PageStructure } from '@/components/layout/PageStructure';
// Image Placeholder Component
const BlogImagePlaceholder = ({ title, className }) => (<div className={`bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center text-blue-600 ${className || ''}`}>
    <FileText className="w-20 h-20 mb-4"/>
    <span className="text-lg font-medium text-center px-4">{title}</span>
  </div>);
export async function generateMetadata({ params }) {
    const post = getPostBySlug(params.slug);
    if (!post) {
        return {
            title: 'Post Not Found | Buckalew Financial Services',
            description: 'The requested blog post could not be found.'
        };
    }
    return {
        title: post.seo?.metaTitle || `${post.title} | Buckalew Financial Services`,
        description: post.seo?.metaDescription || post.excerpt,
        keywords: post.keywords,
        openGraph: {
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
        },
        authors: [{ name: post.author }],
        ...(post.seo?.canonicalUrl && { alternates: { canonical: post.seo.canonicalUrl } })
    };
}
export default function BlogPostPage({ params }) {
    const post = getPostBySlug(params.slug);
    if (!post) {
        return (<PageStructure title="Post Not Found" description="The requested blog post could not be found.">
        <div className="text-center py-12">
          <FileText className="w-24 h-24 mx-auto mb-6 text-gray-400"/>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Back to Blog
          </Link>
        </div>
      </PageStructure>);
    }
    const relatedPosts = getRelatedPosts(post.id, 3);
    const hasValidImage = post.imageUrl && !post.imageUrl.startsWith('/images/blog/');
    return (<PageStructure title={post.title} description={post.excerpt} heroContent={{
            title: post.title,
            subtitle: post.excerpt
        }}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center space-x-4 text-gray-600 mb-4">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          {post.authorBio && (<p className="text-sm text-gray-500 italic max-w-2xl mx-auto">{post.authorBio}</p>)}
          
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (<span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 overflow-hidden">
          {hasValidImage ? (<Image src={post.imageUrl} alt={post.title} width={800} height={400} className="w-full h-full object-cover" priority/>) : (<BlogImagePlaceholder title={post.title} className="w-full h-full"/>)}
        </div>

        <div className="prose lg:prose-xl max-w-none">
          <BlogContentRenderer content={post.content}/>
        </div>
      </article>

      {relatedPosts.length > 0 && (<section className="mt-16 border-t pt-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => {
                const hasRelatedImage = relatedPost.imageUrl && !relatedPost.imageUrl.startsWith('/images/blog/');
                return (<Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    {hasRelatedImage ? (<Image src={relatedPost.imageUrl} alt={relatedPost.title} width={300} height={160} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>) : (<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
                        <FileText className="w-12 h-12"/>
                      </div>)}
                  </div>
                  <span className="bg-primary-light text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {relatedPost.category}
                  </span>
                  <h3 className="font-semibold mt-3 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-3">
                    <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </Link>);
            })}
          </div>
        </section>)}
      
      {/* Call to Action */}
      <section className="mt-16 bg-primary text-white rounded-lg p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Need Personalized Financial Guidance?</h2>
        <p className="text-primary-light mb-6 max-w-2xl mx-auto">
          Our experienced advisors are here to help you make informed decisions about your financial future. 
          Get expert advice tailored to your unique situation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Free Quote
          </Link>
          <Link href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </PageStructure>);
}
// Static params for blog posts
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map(post => ({ slug: post.slug }));
}
