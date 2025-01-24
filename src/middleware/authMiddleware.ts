// src/middleware/authMiddleware.ts
export const validateUserLogin = (req, res, next) => {
  // Your validation logic
  next();
};

export const checkAccountLockout = (req, res, next) => {
  // Your lockout check logic
  next();
};
