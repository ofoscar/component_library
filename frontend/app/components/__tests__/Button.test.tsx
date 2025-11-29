import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from '../Button';

describe('Button Component', () => {
  // Test 1: Rendering
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Button className='custom-class'>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders loading state correctly', () => {
      render(<Button isLoading>Submit</Button>);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });

    it('renders all variant styles', () => {
      const { rerender } = render(<Button variant='primary'>Primary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button variant='secondary'>Secondary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button variant='outline'>Outline</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Button variant='danger'>Danger</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders all sizes correctly', () => {
      const { rerender } = render(<Button size='sm'>Small</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        'px-3',
        'py-1.5',
        'text-sm',
      );

      rerender(<Button size='md'>Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        'px-4',
        'py-2',
        'text-base',
      );

      rerender(<Button size='lg'>Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  // Test 2: Interactions
  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger click when loading', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard navigation', () => {
      render(<Button>Press me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  // Test 3: Props
  describe('Props', () => {
    it('applies fullWidth prop correctly', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('applies disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('applies aria attributes', () => {
      render(<Button aria-label='Custom Label'>Button</Button>);
      expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
    });

    it('applies type attribute', () => {
      render(<Button type='submit'>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('combines variant and size classes correctly', () => {
      render(
        <Button variant='danger' size='lg'>
          Large Danger
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600', 'px-6', 'py-3', 'text-lg');
    });
  });

  // Test 4: Edge Cases
  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Button>{''}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays loading spinner when isLoading is true', () => {
      render(<Button isLoading>Test</Button>);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('is disabled when isLoading is true', () => {
      render(<Button isLoading>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
