import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div
        className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}
        style={{ gap: 'var(--spacing-xs)' }}
      >
        {label && (
          <label
            className='text-sm font-medium'
            style={{ color: 'var(--colors-textSecondary)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`text-white border backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className}`}
          style={{
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            borderColor: error
              ? 'var(--colors-accent-red-500)'
              : 'rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
            color: 'var(--colors-textPrimary)',
            ...props.style,
          }}
          {...props}
        />
        {error && (
          <span
            className='text-sm'
            style={{ color: 'var(--colors-accent-red-500)' }}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
