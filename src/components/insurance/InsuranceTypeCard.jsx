import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export default function InsuranceTypeCard({ title, description, features, icon: Icon, link }) {
    return (<Card className="h-full flex flex-col">
      <CardHeader>
        <Icon className="w-12 h-12 text-blue-600 mb-4"/>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (<li key={index} className="flex items-start">
              <span className="mr-2 mt-1 text-blue-600">•</span>
              <span>{feature}</span>
            </li>))}
        </ul>
        <div className="mt-auto">
          <Link href={link}>
            <Button className="w-full">Learn More</Button>
          </Link>
        </div>
      </CardContent>
    </Card>);
}
