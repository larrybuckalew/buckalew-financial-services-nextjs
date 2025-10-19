import {
  getAllPosts,
  getFeaturedPosts,
  getPostBySlug,
  getPostById,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
  getRelatedPosts,
  blogPosts,
  blogCategories
} from '../blog';

describe('Blog Library Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return all published posts', () => {
      const posts = getAllPosts();
      
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      
      // All posts should be published
      posts.forEach(post => {
        expect(post.status).toBe('published');
      });
    });

    it('should not return draft or archived posts', () => {
      const posts = getAllPosts();
      
      posts.forEach(post => {
        expect(post.status).not.toBe('draft');
        expect(post.status).not.toBe('archived');
      });
    });
  });

  describe('getFeaturedPosts', () => {
    it('should return only featured and published posts', () => {
      const featuredPosts = getFeaturedPosts();
      
      expect(Array.isArray(featuredPosts)).toBe(true);
      
      featuredPosts.forEach(post => {
        expect(post.featured).toBe(true);
        expect(post.status).toBe('published');
      });
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post when given a valid slug', () => {
      const testSlug = 'understanding-medicare-comprehensive-guide-2024';
      const post = getPostBySlug(testSlug);
      
      expect(post).toBeDefined();
      expect(post?.slug).toBe(testSlug);
      expect(post?.status).toBe('published');
    });

    it('should return undefined for non-existent slug', () => {
      const post = getPostBySlug('non-existent-slug');
      expect(post).toBeUndefined();
    });

    it('should return undefined for draft posts', () => {
      // This test assumes there are no draft posts in our mock data
      // but verifies the function would handle them correctly
      const allPosts = blogPosts.filter(post => post.status === 'draft');
      
      if (allPosts.length > 0) {
        const draftPost = allPosts[0];
        const result = getPostBySlug(draftPost.slug);
        expect(result).toBeUndefined();
      }
    });
  });

  describe('getPostById', () => {
    it('should return a post when given a valid ID', () => {
      const testId = '1';
      const post = getPostById(testId);
      
      expect(post).toBeDefined();
      expect(post?.id).toBe(testId);
      expect(post?.status).toBe('published');
    });

    it('should return undefined for non-existent ID', () => {
      const post = getPostById('999');
      expect(post).toBeUndefined();
    });
  });

  describe('getPostsByCategory', () => {
    it('should return posts from the specified category', () => {
      const category = 'Medicare';
      const posts = getPostsByCategory(category);
      
      expect(Array.isArray(posts)).toBe(true);
      
      posts.forEach(post => {
        expect(post.category.toLowerCase()).toBe(category.toLowerCase());
        expect(post.status).toBe('published');
      });
    });

    it('should return empty array for non-existent category', () => {
      const posts = getPostsByCategory('Non-Existent Category');
      expect(posts).toEqual([]);
    });

    it('should be case insensitive', () => {
      const postsLower = getPostsByCategory('medicare');
      const postsUpper = getPostsByCategory('MEDICARE');
      const postsMixed = getPostsByCategory('Medicare');
      
      expect(postsLower.length).toBe(postsUpper.length);
      expect(postsLower.length).toBe(postsMixed.length);
    });
  });

  describe('getPostsByTag', () => {
    it('should return posts with the specified tag', () => {
      const tag = 'Medicare';
      const posts = getPostsByTag(tag);
      
      expect(Array.isArray(posts)).toBe(true);
      
      posts.forEach(post => {
        expect(post.tags.some(postTag => 
          postTag.toLowerCase() === tag.toLowerCase()
        )).toBe(true);
        expect(post.status).toBe('published');
      });
    });

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('NonExistentTag');
      expect(posts).toEqual([]);
    });
  });

  describe('searchPosts', () => {
    it('should find posts by title', () => {
      const searchTerm = 'Medicare';
      const posts = searchPosts(searchTerm);
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      
      const hasMatchInTitle = posts.some(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(hasMatchInTitle).toBe(true);
    });

    it('should find posts by excerpt', () => {
      const searchTerm = 'financial';
      const posts = searchPosts(searchTerm);
      
      expect(Array.isArray(posts)).toBe(true);
      
      const hasMatchInExcerpt = posts.some(post => 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(hasMatchInExcerpt).toBe(true);
    });

    it('should find posts by content', () => {
      const searchTerm = 'insurance';
      const posts = searchPosts(searchTerm);
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should find posts by tags', () => {
      const searchTerm = 'Financial Planning';
      const posts = searchPosts(searchTerm);
      
      expect(Array.isArray(posts)).toBe(true);
      
      const hasMatchInTags = posts.some(post => 
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      expect(hasMatchInTags).toBe(true);
    });

    it('should find posts by keywords', () => {
      const searchTerm = 'retirement';
      const posts = searchPosts(searchTerm);
      
      expect(Array.isArray(posts)).toBe(true);
      
      const hasMatchInKeywords = posts.some(post => 
        post.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      expect(hasMatchInKeywords).toBe(true);
    });

    it('should return empty array for no matches', () => {
      const posts = searchPosts('xyznomatches');
      expect(posts).toEqual([]);
    });

    it('should be case insensitive', () => {
      const postsLower = searchPosts('medicare');
      const postsUpper = searchPosts('MEDICARE');
      
      expect(postsLower.length).toBe(postsUpper.length);
    });
  });

  describe('getRelatedPosts', () => {
    it('should return related posts based on category', () => {
      const testPostId = '1';
      const relatedPosts = getRelatedPosts(testPostId, 5);
      
      expect(Array.isArray(relatedPosts)).toBe(true);
      expect(relatedPosts.length).toBeLessThanOrEqual(5);
      
      // Should not include the original post
      const includesOriginal = relatedPosts.some(post => post.id === testPostId);
      expect(includesOriginal).toBe(false);
      
      // All returned posts should be published
      relatedPosts.forEach(post => {
        expect(post.status).toBe('published');
      });
    });

    it('should return empty array for non-existent post', () => {
      const relatedPosts = getRelatedPosts('999');
      expect(relatedPosts).toEqual([]);
    });

    it('should respect the limit parameter', () => {
      const testPostId = '1';
      const limit = 2;
      const relatedPosts = getRelatedPosts(testPostId, limit);
      
      expect(relatedPosts.length).toBeLessThanOrEqual(limit);
    });

    it('should return posts with matching category or tags', () => {
      const testPostId = '1';
      const testPost = getPostById(testPostId);
      const relatedPosts = getRelatedPosts(testPostId, 5);
      
      if (testPost && relatedPosts.length > 0) {
        relatedPosts.forEach(post => {
          const hasSameCategory = post.category === testPost.category;
          const hasCommonTag = post.tags.some(tag => testPost.tags.includes(tag));
          
          expect(hasSameCategory || hasCommonTag).toBe(true);
        });
      }
    });
  });

  describe('Blog Data Structure', () => {
    it('should have valid blog categories', () => {
      expect(Array.isArray(blogCategories)).toBe(true);
      expect(blogCategories.length).toBeGreaterThan(0);
      
      blogCategories.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('slug');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('color');
        
        expect(typeof category.id).toBe('string');
        expect(typeof category.name).toBe('string');
        expect(typeof category.slug).toBe('string');
        expect(typeof category.description).toBe('string');
        expect(typeof category.color).toBe('string');
      });
    });

    it('should have valid blog posts structure', () => {
      expect(Array.isArray(blogPosts)).toBe(true);
      expect(blogPosts.length).toBeGreaterThan(0);
      
      blogPosts.forEach(post => {
        // Required fields
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('excerpt');
        expect(post).toHaveProperty('content');
        expect(post).toHaveProperty('author');
        expect(post).toHaveProperty('publishedAt');
        expect(post).toHaveProperty('readTime');
        expect(post).toHaveProperty('category');
        expect(post).toHaveProperty('tags');
        expect(post).toHaveProperty('keywords');
        expect(post).toHaveProperty('imageUrl');
        expect(post).toHaveProperty('featured');
        expect(post).toHaveProperty('status');
        
        // Type checks
        expect(typeof post.id).toBe('string');
        expect(typeof post.title).toBe('string');
        expect(typeof post.slug).toBe('string');
        expect(typeof post.excerpt).toBe('string');
        expect(typeof post.content).toBe('string');
        expect(typeof post.author).toBe('string');
        expect(typeof post.publishedAt).toBe('string');
        expect(typeof post.readTime).toBe('string');
        expect(typeof post.category).toBe('string');
        expect(Array.isArray(post.tags)).toBe(true);
        expect(Array.isArray(post.keywords)).toBe(true);
        expect(typeof post.imageUrl).toBe('string');
        expect(typeof post.featured).toBe('boolean');
        expect(['draft', 'published', 'archived']).toContain(post.status);
        
        // Validate dates
        expect(new Date(post.publishedAt)).toBeInstanceOf(Date);
        expect(isNaN(new Date(post.publishedAt).getTime())).toBe(false);
        
        if (post.updatedAt) {
          expect(new Date(post.updatedAt)).toBeInstanceOf(Date);
          expect(isNaN(new Date(post.updatedAt).getTime())).toBe(false);
        }
      });
    });
  });
});