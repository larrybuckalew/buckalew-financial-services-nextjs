import * as yup from 'yup';

// Validation schemas
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    )
    .required('Password is required')
});

export const portfolioSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Portfolio name must be at least 3 characters')
    .max(50, 'Portfolio name cannot exceed 50 characters')
    .required('Portfolio name is required'),
  initialInvestment: yup
    .number()
    .positive('Investment must be a positive number')
    .min(100, 'Minimum investment is $100')
    .required('Initial investment is required'),
  investmentGoal: yup
    .string()
    .oneOf(
      ['retirement', 'education', 'home', 'other'], 
      'Invalid investment goal'
    )
});

export const transactionSchema = yup.object().shape({
  amount: yup
    .number()
    .positive('Amount must be a positive number')
    .required('Amount is required'),
  type: yup
    .string()
    .oneOf(['income', 'expense'], 'Invalid transaction type')
    .required('Transaction type is required'),
  category: yup
    .string()
    .required('Category is required'),
  date: yup
    .date()
    .max(new Date(), 'Date cannot be in the future')
    .required('Date is required')
});

// Validation utility
export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = err.inner.reduce((acc, error) => {
      return { ...acc, [error.path]: error.message };
    }, {});
    return { isValid: false, errors };
};