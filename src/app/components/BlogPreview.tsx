import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface BlogPreviewProps {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
}

export default function BlogPreview({ title, category, date, excerpt, slug }: BlogPreviewProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-600">{category}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{excerpt}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
