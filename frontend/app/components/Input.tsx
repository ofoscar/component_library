import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      fullWidth = false,
      startIcon,
      endIcon,
      className = '',
      ...props
    },
    ref,
  ) => {
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
        <div className='relative' style={{ width: '100%' }}>
          {startIcon && (
            <div
              className='absolute inset-y-0 left-0 flex items-center pointer-events-none z-10'
              style={{
                paddingLeft: 'var(--spacing-md)',
                color: error
                  ? 'var(--colors-accent-red-500)'
                  : success
                  ? 'var(--colors-accent-green-500)'
                  : 'var(--colors-muted)',
              }}
            >
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`text-white border focus:outline-none focus:ring-2 focus:border-transparent transition-all w-full ${className}`}
            style={{
              padding: 'var(--spacing-md)',
              paddingLeft: startIcon
                ? 'calc(var(--spacing-md) * 3)'
                : 'var(--spacing-md)',
              paddingRight: endIcon
                ? 'calc(var(--spacing-md) * 3)'
                : 'var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              borderColor: error
                ? 'var(--colors-accent-red-500)'
                : success
                ? 'var(--colors-accent-green-500)'
                : 'rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--colors-textPrimary)',
              ...props.style,
            }}
            {...props}
          />
          {endIcon && (
            <div
              className='absolute inset-y-0 right-0 flex items-center pointer-events-none z-10'
              style={{
                paddingRight: 'var(--spacing-md)',
                color: error
                  ? 'var(--colors-accent-red-500)'
                  : success
                  ? 'var(--colors-accent-green-500)'
                  : 'var(--colors-muted)',
              }}
            >
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <span
            className='text-sm'
            style={{ color: 'var(--colors-accent-red-500)' }}
          >
            {error}
          </span>
        )}
        {success && !error && (
          <span
            className='text-sm'
            style={{ color: 'var(--colors-accent-green-500)' }}
          >
            {success}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
