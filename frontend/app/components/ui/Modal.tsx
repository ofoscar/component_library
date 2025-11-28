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
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm'
      onClick={handleBackdropClick}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-out
          w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between p-4 border-b border-gray-200 ${headerClassName}`}
          >
            <div className='flex-1'>
              {title && (
                <h2 className='text-lg font-semibold text-gray-900 pr-4'>
                  {title}
                </h2>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className='flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100'
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
        <div className={`flex-1 overflow-y-auto p-4 ${contentClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={`flex items-center justify-end gap-3 p-4 border-t border-gray-200 ${footerClassName}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
