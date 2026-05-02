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

  it('toggles filter menu when clicking filter button', () => {
    render(<SearchPill {...props} />);
    const filterButton = screen.getByText(/filter/i);
    
    // Open
    fireEvent.click(filterButton);
    expect(screen.getByText(/^filters$/i)).toBeDefined();
    
    // Close
    fireEvent.click(filterButton);
    expect(screen.queryByText(/^filters$/i)).toBeNull();
  });

  it('calls onFilterChange when updating filters', () => {
    const onFilterChange = vi.fn();
    render(<SearchPill {...props} brands={['Tesla']} onFilterChange={onFilterChange} />);
    
    // Open menu
    fireEvent.click(screen.getByText(/filter/i));
    
    // Change brand
    const select = screen.getByLabelText(/brand/i);
    fireEvent.change(select, { target: { value: 'Tesla' } });
    
    expect(onFilterChange).toHaveBeenCalledWith({ brand: 'Tesla' });
  });
});
