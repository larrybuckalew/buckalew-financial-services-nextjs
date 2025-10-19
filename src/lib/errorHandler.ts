export function handleClientError(error: Error) {
  // Log error to console
  console.error('Unhandled client-side error:', error);

  // You can add additional error logging or reporting here
  try {
    // Optional: Send error to a logging service
    // window.logService.sendError(error);
  } catch (logError) {
    console.error('Error logging failed', logError);
  }
}
