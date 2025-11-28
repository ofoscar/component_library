import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className='text-sm font-medium text-gray-700'>{label}</label>
        )}
        <input
          ref={ref}
          className={`p-4 text-gray-800 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-800'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
          {...props}
        />
        {error && <span className='text-sm text-red-500'>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
