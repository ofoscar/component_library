import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'text-[#0B090A] hover:opacity-90 focus:ring-blue-500',
      secondary: 'hover:opacity-90 focus:ring-gray-500',
      outline: 'bg-transparent border-2 hover:opacity-80 focus:ring-blue-500',
      danger: 'text-white hover:opacity-90 focus:ring-red-500',
    };

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        style={{
          borderRadius:
            variant === 'primary' ? 'var(--radius-pill)' : 'var(--radius-md)',
          padding:
            size === 'sm'
              ? 'var(--spacing-sm) var(--spacing-md)'
              : size === 'lg'
              ? 'var(--spacing-md) var(--spacing-xl)'
              : 'var(--spacing-sm) var(--spacing-lg)',
          background:
            variant === 'primary'
              ? '#FFFFFF'
              : variant === 'secondary'
              ? 'var(--colors-cardBg)'
              : variant === 'danger'
              ? 'var(--colors-accent-red-500)'
              : 'transparent',
          color:
            variant === 'primary'
              ? 'var(--colors-surface)'
              : 'var(--colors-textPrimary)',
          borderColor:
            variant === 'outline'
              ? 'var(--colors-accent-blue-500)'
              : 'transparent',
          boxShadow: variant === 'primary' ? 'var(--elevation-card)' : 'none',
          ...props.style,
        }}
        {...props}
      >
        {isLoading ? (
          <span className='flex items-center justify-center gap-2'>
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
