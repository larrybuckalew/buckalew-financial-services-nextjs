import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
export function APIError({ error, reset }) {
    return (<Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <p>{error.message || 'An error occurred while processing your request.'}</p>
          {reset && (<button onClick={reset} className="text-sm text-blue-600 hover:text-blue-500">
              Try again
            </button>)}
        </div>
      </AlertDescription>
    </Alert>);
}
