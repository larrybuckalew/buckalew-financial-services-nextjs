import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Select, SelectOption } from '../ui/Select';

// Utility to generate dynamic form schema
const generateFormSchema = (fields) => {
  const schemaFields = {};

  fields.forEach(field => {
    let validator = yup;

    switch (field.type) {
      case 'text':
        validator = validator.string();
        break;
      case 'email':
        validator = validator.string().email('Invalid email format');
        break;
      case 'number':
        validator = validator.number().typeError('Must be a number');
        break;
      case 'select':
        validator = validator.string().oneOf(field.options, 'Invalid selection');
        break;
      case 'date':
        validator = validator.date();
        break;
    }

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    if (field.min) {
      validator = validator.min(field.min, `Minimum value is ${field.min}`);
    }

    if (field.max) {
      validator = validator.max(field.max, `Maximum value is ${field.max}`);
    }

    schemaFields[field.name] = validator;
  });

  return yup.object().shape(schemaFields);
};

const DynamicForm = ({ 
  fields, 
  onSubmit, 
  initialValues = {}, 
  submitLabel = 'Submit',
  className
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = generateFormSchema(fields);
      await schema.validate(formData, { abortEarly: false });
      onSubmit(formData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors = validationError.inner.reduce((acc, error) => ({
          ...acc,
          [error.path]: error.message
        }), {});
        setErrors(newErrors);
      }
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text'
      case 'email'
      case 'number'
      case 'date':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={errors[field.name] ? 'border-red-500' : ''}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        );
      
      case 'select':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className={errors[field.name] ? 'border-red-500' : ''}
            >
              <SelectOption value="">Select an option</SelectOption>
              {field.options.map(option => (
                <SelectOption key={option} value={option}>
                  {option}
                </SelectOption>
              ))}
            </Select>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="mb-4 flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {field.label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map(renderField)}
      
      <div className="mt-6">
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;