import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  location: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({ name, location, content, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 text-yellow-400 fill-current" 
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4">"{content}"</p>
      </CardContent>
      <CardFooter className="border-t">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
