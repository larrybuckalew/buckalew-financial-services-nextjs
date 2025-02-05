import React, { useState } from 'react';
import BlogPostCard, { BlogPost } from './BlogPostCard';

interface BlogListProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  postsPerPage = 6 
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Financial Insights & News
      </h1>
      
      {currentPosts.length === 0 ? (
        <div className="text-center text-gray-600">
          No blog posts available at the moment.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`
                    px-4 py-2 border 
                    ${currentPage === i + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
