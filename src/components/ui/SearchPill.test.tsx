import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchPill from './SearchPill';

describe('SearchPill', () => {
  const props = {
    buyLabel: 'Buy',
    rentLabel: 'Rent',
    placeholder: 'Search...',
    filterLabel: 'Filter',
    onModeChange: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders correctly with initial mode', () => {
    render(<SearchPill {...props} />);
    expect(screen.getByText(/buy/i)).toBeDefined();
    expect(screen.getByText(/rent/i)).toBeDefined();
    expect(screen.getByPlaceholderText('Search...')).toBeDefined();
  });

  it('calls onModeChange when switching modes', () => {
    render(<SearchPill {...props} />);
    const rentButton = screen.getByText(/rent/i);
    fireEvent.click(rentButton);
    expect(props.onModeChange).toHaveBeenCalledWith('rent');
  });

  it('calls onSearch when typing', () => {
    render(<SearchPill {...props} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Tesla' } });
    expect(props.onSearch).toHaveBeenCalledWith('Tesla');
  });
});
