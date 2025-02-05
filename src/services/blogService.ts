import { PrismaClient, BlogPost } from '@prisma/client';
import { slugify } from '@/lib/utils/stringUtils';

const prisma = new PrismaClient();

export class BlogService {
  // Create a new blog post
  static async createPost(
    data: {
      title: string;
      content: string;
      excerpt: string;
      authorId: string;
      coverImage?: string;
      tags?: string[];
      isPublished?: boolean;
    }
  ): Promise<BlogPost> {
    const slug = slugify(data.title);

    // Check for existing slug
    const existingPost = await prisma.blogPost.findUnique({ where: { slug } });
    if (existingPost) {
      throw new Error('A post with this title already exists');
    }

    // Calculate read time (assuming average reading speed)
    const readTime = Math.ceil(data.content.split(' ').length / 200);

    return prisma.blogPost.create({
      data: {
        ...data,
        slug,
        readTime,
        publishedAt: data.isPublished ? new Date() : null
      }
    });
  }

  // Get all published blog posts
  static async getPosts(
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    posts: BlogPost[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: { author: { select: { name: true } } }
      }),
      prisma.blogPost.count({ where: { isPublished: true } })
    ]);

    return {
      posts,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  // Get a single blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return prisma.blogPost.findUnique({ 
      where: { slug, isPublished: true },
      include: { author: { select: { name: true } } }
    });
  }

  // Update a blog post
  static async updatePost(
    id: string, 
    data: Partial<BlogPost>
  ): Promise<BlogPost> {
    // If title is being updated, generate new slug
    if (data.title) {
      data.slug = slugify(data.title);
    }

    return prisma.blogPost.update({
      where: { id },
      data
    });
  }

  // Delete a blog post
  static async deletePost(id: string): Promise<void> {
    await prisma.blogPost.delete({ where: { id } });
  }

  // Search blog posts
  static async searchPosts(
    query: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    posts: BlogPost[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } }
          ]
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.blogPost.count({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } }
          ]
        }
      })
    ]);

    return {
      posts,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }
}

// Utility function for creating slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
