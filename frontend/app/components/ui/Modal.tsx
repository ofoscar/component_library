'use client';

import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  footer,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'
      style={{
        padding: 'var(--spacing-md)',
        background: 'rgba(0,0,0,0.7)',
      }}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          transform transition-all duration-200 ease-out
          w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col
          ${className}
        `}
        style={{
          background: 'var(--colors-cardBg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--elevation-dialog)',
          border: '1px solid var(--colors-cardBorder)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between border-b ${headerClassName}`}
            style={{
              padding: 'var(--spacing-md)',
              borderColor: 'var(--colors-cardBorder)',
            }}
          >
            <div className='flex-1'>
              {title && (
                <h2
                  className='text-lg font-semibold pr-4'
                  style={{ color: 'var(--colors-textPrimary)' }}
                >
                  {title}
                </h2>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className='flex-shrink-0 transition-colors duration-200 rounded-full cursor-pointer hover:bg-gray-700'
                style={{
                  padding: 'var(--spacing-xs)',
                  color: 'var(--colors-muted)',
                }}
                aria-label='Close modal'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6L6 18M6 6L18 18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={`flex-1 overflow-y-auto ${contentClassName}`}
          style={{
            padding: 'var(--spacing-md)',
            color: 'var(--colors-textPrimary)',
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={`flex items-center justify-end border-t ${footerClassName}`}
            style={{
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              borderColor: 'var(--colors-cardBorder)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
