import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
export default function ServiceCard({ title, description, icon: Icon, link }) {
    return (<Link href={link}>
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="mb-4">
            <Icon className="w-12 h-12 text-blue-600"/>
          </div>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>);
}
