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
    const baseStyles = 'border transition-all';

    const variants = {
      default: 'shadow-sm',
      elevated: 'shadow-lg hover:shadow-xl',
      outlined: 'shadow-none hover:shadow-sm',
    };

    const paddingValues = {
      sm: 'var(--spacing-md)',
      md: 'var(--spacing-lg)',
      lg: 'var(--spacing-xl)',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${
          fullWidth ? 'w-full' : ''
        } ${className} relative`}
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'var(--colors-cardBg)',
          borderColor: 'var(--colors-cardBorder)',
          padding: paddingValues[padding],
          boxShadow:
            variant === 'elevated'
              ? 'var(--elevation-card)'
              : variant === 'default'
              ? '0 1px 3px rgba(0,0,0,0.3)'
              : 'none',
          color: 'var(--colors-textPrimary)',
          ...props.style,
        }}
        {...props}
      >
        {action && (
          <div
            className='absolute z-10'
            style={{ top: 'var(--spacing-md)', right: 'var(--spacing-md)' }}
          >
            {action}
          </div>
        )}
        {(title || subtitle) && (
          <div className='w-full' style={{ marginBottom: 'var(--spacing-md)' }}>
            {title && (
              <h3
                className='text-lg font-semibold'
                style={{
                  color: 'var(--colors-textPrimary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className='text-sm'
                style={{ color: 'var(--colors-textSecondary)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
