import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

// Mock blog post data (would typically come from a database)
const blogPosts = {
  '1': {
    id: '1',
    title: 'Understanding Medicare: A Comprehensive Guide',
    content: `
      Medicare can be complex, but understanding its basics is crucial for seniors planning their healthcare coverage.

      ## What is Medicare?
      Medicare is a federal health insurance program primarily for people who are 65 or older. It also covers some younger people with disabilities and those with specific conditions.

      ### Medicare Parts Explained
      1. **Part A (Hospital Insurance)**: Covers hospital stays, skilled nursing facility care, hospice care, and some home health care.
      
      2. **Part B (Medical Insurance)**: Covers certain doctors' services, outpatient care, medical supplies, and preventive services.
      
      3. **Part C (Medicare Advantage)**: An alternative to Original Medicare, offered by private companies approved by Medicare.
      
      4. **Part D (Prescription Drug Coverage)**: Helps cover the cost of prescription drugs.

      ## Enrollment Tips
      - Initial Enrollment Period starts 3 months before the month you turn 65
      - You can sign up during the Annual Enrollment Period
      - Late enrollment may result in penalties

      ## Choosing the Right Plan
      Consider factors like:
      - Your current health status
      - Prescription drug needs
      - Budget
      - Preferred healthcare providers

      ## Conclusion
      Navigating Medicare requires careful consideration. Consult with a financial advisor to make the best decision for your unique situation.
    `,
    author: 'John Doe',
    date: 'January 15, 2024',
    readTime: '5 min read',
    category: 'Medicare',
    imageUrl: '/images/medicare-blog.svg'
  },
  // Add other blog posts here
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts[params.id as keyof typeof blogPosts];
  
  return generatePageMetadata({
    title: post.title,
    description: post.content.substring(0, 160),
    keywords: [post.category, 'healthcare', 'insurance'],
    path: `/blog/${post.id}`
  });
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id as keyof typeof blogPosts];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {post.title}
          </h1>
          <div className="flex justify-center items-center space-x-4 text-gray-600">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <Image 
          src={post.imageUrl} 
          alt={post.title} 
          width={800} 
          height={400} 
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="prose lg:prose-xl">
          {/* Render markdown content */}
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.slice(3)}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.slice(4)}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return <ul key={index} className="list-disc pl-5 mb-4"><li>{paragraph.slice(2)}</li></ul>;
            }
            return <p key={index} className="mb-4">{paragraph}</p>;
          })}
        </div>
      </article>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.values(blogPosts)
            .filter(relatedPost => relatedPost.id !== post.id)
            .slice(0, 3)
            .map(relatedPost => (
              <Link 
                key={relatedPost.id} 
                href={`/blog/${relatedPost.id}`} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                <p className="text-sm text-gray-600">{relatedPost.category}</p>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  );
}

// Static params for blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map(id => ({ id }));
}
