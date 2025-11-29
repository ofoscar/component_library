import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Input from '../Input';

describe('Input Component', () => {
  // Test 1: Rendering
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label='Email Address' />);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input error='This field is required' />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder='Enter your email' />);
      expect(
        screen.getByPlaceholderText('Enter your email'),
      ).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Input className='custom-input' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input');
    });

    it('applies error border styling when error prop is present', () => {
      render(<Input error='Error message' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('applies default border styling when no error', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-white/30');
    });
  });

  // Test 2: Interactions
  describe('Interactions', () => {
    it('handles user input correctly', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test@example.com');
      expect(input).toHaveValue('test@example.com');
    });

    it('calls onChange handler', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus and blur events', async () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      const user = userEvent.setup();

      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();

      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not allow input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(input).toHaveValue('');
      expect(input).toBeDisabled();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.tab();
      expect(input).toHaveFocus();
    });
  });

  // Test 3: Props
  describe('Props', () => {
    it('applies fullWidth prop correctly', () => {
      const { container } = render(<Input fullWidth label='Test' />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('supports different input types', () => {
      const { rerender } = render(<Input type='text' />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

      rerender(<Input type='email' />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

      rerender(<Input type='password' />);
      const passwordInput = document.querySelector('input[type="password"]');
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('applies disabled state correctly', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies required attribute', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('applies maxLength attribute', () => {
      render(<Input maxLength={10} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '10');
    });

    it('supports defaultValue', () => {
      render(<Input defaultValue='Initial value' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Initial value');
    });

    it('supports controlled value', () => {
      const { rerender } = render(
        <Input value='Controlled' onChange={() => {}} />,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Controlled');

      rerender(<Input value='Updated' onChange={() => {}} />);
      expect(input).toHaveValue('Updated');
    });
  });

  // Test 4: Label and Error Display
  describe('Label and Error Display', () => {
    it('associates label with input correctly', () => {
      render(<Input label='Username' />);
      const label = screen.getByText('Username');
      const input = screen.getByRole('textbox');
      expect(label).toBeInTheDocument();
      // Check that they are in the same container
      expect(label.nextElementSibling).toBe(input);
    });

    it('displays error message in red', () => {
      render(<Input error='Invalid input' />);
      const errorMessage = screen.getByText('Invalid input');
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('shows both label and error simultaneously', () => {
      render(<Input label='Email' error='Invalid email format' />);
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('renders without label and error when not provided', () => {
      const { container } = render(<Input />);
      expect(container.querySelector('label')).not.toBeInTheDocument();
      expect(container.querySelector('.text-red-500')).not.toBeInTheDocument();
    });
  });
});
