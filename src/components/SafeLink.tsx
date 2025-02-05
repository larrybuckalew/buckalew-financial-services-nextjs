import Link, { LinkProps } from 'next/link';
import { validateRoute, getSafeRoute } from '@/utils/route-validation';

interface SafeLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function SafeLink({ href, ...props }: SafeLinkProps) {
  const safeHref = getSafeRoute(href as string);

  if (safeHref !== href) {
    console.warn(`Redirecting from invalid route: ${href} to ${safeHref}`);
  }

  return <Link href={safeHref} {...props} />;
}
