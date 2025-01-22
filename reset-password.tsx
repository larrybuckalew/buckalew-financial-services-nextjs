try {
  // Your code here
} catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Unknown error');
  }
}
