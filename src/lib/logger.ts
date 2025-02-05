<<<<<<< HEAD
export const logger = {
  info: (message: string) => console.log(message),
  error: (message: string) => console.error(message)
};
=======
// src/lib/logger.ts
export const logger = {
  info: (message: string) => console.log(`INFO: ${message}`),
  error: (message: string) => console.error(`ERROR: ${message}`)
};
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
