import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../ui/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  // Test 1: Rendering
  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Modal Content</p>
        </Modal>,
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <p>Modal Content</p>
        </Modal>,
      );
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders with title', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title='Test Modal'>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('renders close button by default', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );
      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} showCloseButton={false}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          footer={<button>Footer Button</button>}
        >
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByText('Footer Button')).toBeInTheDocument();
    });

    it('renders different sizes correctly', () => {
      const { rerender, container } = render(
        <Modal isOpen={true} onClose={mockOnClose} size='sm'>
          <p>Small</p>
        </Modal>,
      );
      expect(container.querySelector('.max-w-md')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={mockOnClose} size='md'>
          <p>Medium</p>
        </Modal>,
      );
      expect(container.querySelector('.max-w-lg')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={mockOnClose} size='lg'>
          <p>Large</p>
        </Modal>,
      );
      expect(container.querySelector('.max-w-2xl')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={mockOnClose} size='xl'>
          <p>Extra Large</p>
        </Modal>,
      );
      expect(container.querySelector('.max-w-4xl')).toBeInTheDocument();
    });
  });

  // Test 2: Interactions
  describe('Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} closeOnBackdropClick={true}>
          <p>Content</p>
        </Modal>,
      );

      const backdrop = container.querySelector('.fixed.inset-0');
      if (backdrop) {
        await user.click(backdrop);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it('does not close when backdrop is clicked if closeOnBackdropClick is false', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} closeOnBackdropClick={false}>
          <p>Content</p>
        </Modal>,
      );

      const backdrop = container.querySelector('.fixed.inset-0');
      if (backdrop) {
        await user.click(backdrop);
        expect(mockOnClose).not.toHaveBeenCalled();
      }
    });

    it('calls onClose when Escape key is pressed', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('does not close when clicking inside modal content', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content to click</p>
        </Modal>,
      );

      const content = screen.getByText('Content to click');
      await user.click(content);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('prevents body scroll when open', () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  // Test 3: Props
  describe('Props', () => {
    it('applies custom className to modal container', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} className='custom-modal'>
          <p>Content</p>
        </Modal>,
      );
      expect(container.querySelector('.custom-modal')).toBeInTheDocument();
    });

    it('applies custom headerClassName', () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          title='Test'
          headerClassName='custom-header'
        >
          <p>Content</p>
        </Modal>,
      );
      expect(container.querySelector('.custom-header')).toBeInTheDocument();
    });

    it('applies custom contentClassName', () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          contentClassName='custom-content'
        >
          <p>Content</p>
        </Modal>,
      );
      expect(container.querySelector('.custom-content')).toBeInTheDocument();
    });

    it('applies custom footerClassName', () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          footer={<button>Action</button>}
          footerClassName='custom-footer'
        >
          <p>Content</p>
        </Modal>,
      );
      expect(container.querySelector('.custom-footer')).toBeInTheDocument();
    });

    it('renders complex children correctly', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>
            <h3>Title</h3>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <button>Action Button</button>
          </div>
        </Modal>,
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
  });

  // Test 4: Edge Cases and Accessibility
  describe('Edge Cases and Accessibility', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      unmount();

      // After unmount, Escape should not trigger onClose
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('handles rapid open/close toggling', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByText('Content')).toBeInTheDocument();

      rerender(
        <Modal isOpen={false} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('has proper ARIA label on close button', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });

    it('renders without title but with close button', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <p>Content</p>
        </Modal>,
      );

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });
  });
});
