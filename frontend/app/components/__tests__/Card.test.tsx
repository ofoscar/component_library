import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../Card';

describe('Card Component', () => {
  // Test 1: Rendering
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Card title='Card Title'>Content</Card>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with subtitle', () => {
      render(<Card subtitle='Card Subtitle'>Content</Card>);
      expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    });

    it('renders with both title and subtitle', () => {
      render(
        <Card title='Main Title' subtitle='Subtitle Text'>
          Content
        </Card>,
      );
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle Text')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Card className='custom-card'>Content</Card>,
      );
      expect(container.querySelector('.custom-card')).toBeInTheDocument();
    });

    it('renders all variant styles', () => {
      const { rerender, container } = render(
        <Card variant='default'>Default</Card>,
      );
      expect(container.querySelector('.shadow-sm')).toBeInTheDocument();

      rerender(<Card variant='elevated'>Elevated</Card>);
      expect(container.querySelector('.shadow-lg')).toBeInTheDocument();

      rerender(<Card variant='outlined'>Outlined</Card>);
      expect(container.querySelector('.shadow-none')).toBeInTheDocument();
    });

    it('renders all padding sizes', () => {
      const { rerender, container } = render(<Card padding='sm'>Small</Card>);
      expect(container.firstChild).toHaveClass('p-4');

      rerender(<Card padding='md'>Medium</Card>);
      expect(container.firstChild).toHaveClass('p-6');

      rerender(<Card padding='lg'>Large</Card>);
      expect(container.firstChild).toHaveClass('p-8');
    });

    it('renders with action element', () => {
      render(<Card action={<button>Action</button>}>Content</Card>);
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  // Test 2: Interactions
  describe('Interactions', () => {
    it('handles click events on the card', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      const { container } = render(
        <Card onClick={handleClick}>Clickable Card</Card>,
      );
      const card = container.firstChild as HTMLElement;

      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles action button clicks independently', async () => {
      const handleCardClick = jest.fn();
      const handleActionClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Card
          onClick={handleCardClick}
          action={<button onClick={handleActionClick}>Action</button>}
        >
          Content
        </Card>,
      );

      const actionButton = screen.getByText('Action');
      await user.click(actionButton);

      expect(handleActionClick).toHaveBeenCalled();
    });

    it('handles mouse enter and leave events', async () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();

      const { container } = render(
        <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover Card
        </Card>,
      );

      const card = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(card);
      expect(handleMouseEnter).toHaveBeenCalled();

      fireEvent.mouseLeave(card);
      expect(handleMouseLeave).toHaveBeenCalled();
    });

    it('supports keyboard navigation when interactive', () => {
      const { container } = render(<Card tabIndex={0}>Focusable Card</Card>);

      const card = container.firstChild as HTMLElement;
      card.focus();
      expect(card).toHaveFocus();
    });
  });

  // Test 3: Props
  describe('Props', () => {
    it('applies fullWidth prop correctly', () => {
      const { container } = render(<Card fullWidth>Full Width Card</Card>);
      expect(container.firstChild).toHaveClass('w-full');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Ref Card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom data attributes', () => {
      render(<Card data-testid='custom-card'>Content</Card>);
      expect(screen.getByTestId('custom-card')).toBeInTheDocument();
    });

    it('applies ARIA attributes', () => {
      render(<Card aria-label='Information Card'>Content</Card>);
      expect(screen.getByLabelText('Information Card')).toBeInTheDocument();
    });

    it('supports role attribute', () => {
      render(<Card role='article'>Article Content</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('combines multiple props correctly', () => {
      const { container } = render(
        <Card
          variant='elevated'
          padding='lg'
          fullWidth
          className='custom-class'
          title='Combined Props'
        >
          Content
        </Card>,
      );

      const card = container.firstChild;
      expect(card).toHaveClass('shadow-lg', 'p-8', 'w-full', 'custom-class');
      expect(screen.getByText('Combined Props')).toBeInTheDocument();
    });
  });

  // Test 4: Layout and Structure
  describe('Layout and Structure', () => {
    it('positions action element in top-right corner', () => {
      const { container } = render(
        <Card action={<button>Action</button>}>Content</Card>,
      );

      const actionContainer = container.querySelector(
        '.absolute.top-4.right-4',
      );
      expect(actionContainer).toBeInTheDocument();
    });

    it('renders children below header when title is present', () => {
      const { container } = render(
        <Card title='Title'>
          <p>Child Content</p>
        </Card>,
      );

      const title = screen.getByText('Title');
      const content = screen.getByText('Child Content');

      expect(
        title.compareDocumentPosition(content) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    });

    it('renders complex children structure', () => {
      render(
        <Card title='Complex Card'>
          <div>
            <h4>Subsection</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
            <button>Button</button>
          </div>
        </Card>,
      );

      expect(screen.getByText('Complex Card')).toBeInTheDocument();
      expect(screen.getByText('Subsection')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('applies correct base styles', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild;

      expect(card).toHaveClass(
        'rounded-lg',
        'bg-[#141414]',
        'border',
        'transition-all',
      );
    });

    it('has mb-4 spacing when header is present', () => {
      const { container } = render(<Card title='Title'>Content</Card>);
      const header = container.querySelector('.mb-4');

      expect(header).toBeInTheDocument();
    });

    it('renders without header when no title or subtitle', () => {
      const { container } = render(<Card>Content</Card>);
      const header = container.querySelector('.mb-4');

      expect(header).not.toBeInTheDocument();
    });
  });
});
