import React from 'react';

interface InputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  error,
  min,
  max,
  step = 1,
  placeholder
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input 
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3
        ${error ? 'border-red-500' : 'border-gray-300'}
        focus:ring-blue-500 focus:border-blue-500`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);