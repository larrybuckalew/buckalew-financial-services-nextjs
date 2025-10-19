import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  coverImage?: string;
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            className="hover:scale-105 transition-transform"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <time>{post.publishedDate}</time>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
