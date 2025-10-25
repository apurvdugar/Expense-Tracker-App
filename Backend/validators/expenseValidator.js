import { z } from 'zod';

export const expensePayloadSchema = z.object({
  amount: z.number()
    .positive('Amount must be positive')
    .max(1000000, 'Amount cannot exceed 1,000,000')
    .refine(val => !isNaN(val), 'Amount must be a valid number'),
  category: z.string()
    .min(1, 'Category is required')
    .max(20, 'Category name too long')
    .refine(
      val => [ "Food", "Transport", "Shopping", "Utilities", "Education", "Medical", "Entertainment", "Other"].includes(val.toLowerCase()),'Invalid category'),
  description: z.string()
    .min(1, 'Description is required')
    .max(100, 'Description too long')
    .refine(val => val.trim().length > 0, 'Description cannot be empty')
    .refine(val => isNaN(val) && !/^\d+$/.test(val.trim()), 'Description cannot be a number')
    .refine(val => /^[a-zA-Z0-9\s\-_.,!?@#$%^&*()]+$/.test(val), 'Description contains invalid characters')
});
