import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  action?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      subtitle,
      variant = 'default',
      padding = 'md',
      fullWidth = false,
      action,
      className = '',
      ...props
    },
    ref,
  ) => {
    const baseStyles = 'rounded-lg bg-white border transition-all';

    const variants = {
      default: 'border-gray-200 shadow-sm',
      elevated: 'border-gray-200 shadow-lg hover:shadow-xl',
      outlined: 'border-gray-300 shadow-none hover:shadow-sm',
    };

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${
          fullWidth ? 'w-full' : ''
        } ${className} relative`}
        {...props}
      >
        {action && <div className='absolute top-4 right-4 z-10'>{action}</div>}
        {(title || subtitle) && (
          <div className='mb-4 w-full'>
            {title && (
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                {title}
              </h3>
            )}
            {subtitle && <p className='text-sm text-gray-600'>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
