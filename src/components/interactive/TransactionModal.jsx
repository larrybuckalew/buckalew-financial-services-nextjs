import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateForm, transactionSchema } from '@/lib/validation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Select, SelectOption } from '../ui/Select';

const TransactionModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = {} 
}) => {
  const [transaction, setTransaction] = useState({
    amount: initialData.amount || '',
    type: initialData.type || 'expense',
    category: initialData.category || '',
    date: initialData.date || new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationResult = await validateForm(transactionSchema, transaction);
    
    if (validationResult.isValid) {
      onSubmit(transaction);
      onClose();
    } else {
      setErrors(validationResult.errors);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4">
            {initialData.id ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Amount</label>
              <Input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                step="0.01"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Type</label>
              <Select
                name="type"
                value={transaction.type}
                onChange={handleChange}
              >
                <SelectOption value="expense">Expense</SelectOption>
                <SelectOption value="income">Income</SelectOption>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <Input
                name="category"
                value={transaction.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Date</label>
              <Input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">
                {initialData.id ? 'Update' : 'Add'} Transaction
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionModal;