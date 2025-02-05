const VALID_ROUTES = [
  '/',
  '/quote',
  '/contact',
  '/consultation/medicare',
  '/health-insurance/medicare',
  '/health-insurance/medicare/advantage',
  '/health-insurance/medicare/supplement',
  '/health-insurance/medicare/part-d',
  '/drug-pricing',
  '/unauthorized'
];

export function validateRoute(route: string): boolean {
  return VALID_ROUTES.includes(route) || 
         VALID_ROUTES.some(validRoute => route.startsWith(validRoute + '/'));
}

export function getSafeRoute(route: string): string {
  return validateRoute(route) ? route : '/';
}
