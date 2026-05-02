import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuickFilterTags from './QuickFilterTags';

const defaultFilters = [
  { label: 'Electric', value: 'electric' },
  { label: 'SUV', value: 'suv' },
  { label: 'Luxury', value: 'luxury' },
  { label: 'Under $50k', value: 'budget' },
];

describe('QuickFilterTags', () => {
  it('renders all provided filter tags', () => {
    render(<QuickFilterTags filters={defaultFilters} />);
    expect(screen.getByText('Electric')).toBeDefined();
    expect(screen.getByText('SUV')).toBeDefined();
    expect(screen.getByText('Luxury')).toBeDefined();
    expect(screen.getByText('Under $50k')).toBeDefined();
  });

  it('starts with no active filters', () => {
    render(<QuickFilterTags filters={defaultFilters} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn.getAttribute('aria-pressed')).toBe('false');
    });
  });

  it('activates a filter on click', () => {
    render(<QuickFilterTags filters={defaultFilters} />);
    const electricBtn = screen.getByText('Electric').closest('button') as HTMLButtonElement;
    fireEvent.click(electricBtn);
    expect(electricBtn.getAttribute('aria-pressed')).toBe('true');
  });

  it('deactivates a filter on second click (toggle off)', () => {
    render(<QuickFilterTags filters={defaultFilters} />);
    const electricBtn = screen.getByText('Electric').closest('button') as HTMLButtonElement;
    fireEvent.click(electricBtn);
    fireEvent.click(electricBtn);
    expect(electricBtn.getAttribute('aria-pressed')).toBe('false');
  });

  it('allows multiple filters to be active simultaneously', () => {
    render(<QuickFilterTags filters={defaultFilters} />);
    const electricBtn = screen.getByText('Electric').closest('button') as HTMLButtonElement;
    const suvBtn = screen.getByText('SUV').closest('button') as HTMLButtonElement;
    fireEvent.click(electricBtn);
    fireEvent.click(suvBtn);
    expect(electricBtn.getAttribute('aria-pressed')).toBe('true');
    expect(suvBtn.getAttribute('aria-pressed')).toBe('true');
  });

  it('calls onFilterChange with current active filters when a tag is toggled', () => {
    const onFilterChange = vi.fn();
    render(<QuickFilterTags filters={defaultFilters} onFilterChange={onFilterChange} />);
    const electricBtn = screen.getByText('Electric').closest('button') as HTMLButtonElement;
    fireEvent.click(electricBtn);
    expect(onFilterChange).toHaveBeenCalledWith(['electric']);
  });

  it('calls onFilterChange with empty array when last filter is deactivated', () => {
    const onFilterChange = vi.fn();
    render(<QuickFilterTags filters={defaultFilters} onFilterChange={onFilterChange} />);
    const electricBtn = screen.getByText('Electric').closest('button') as HTMLButtonElement;
    fireEvent.click(electricBtn);
    fireEvent.click(electricBtn);
    expect(onFilterChange).toHaveBeenLastCalledWith([]);
  });
});
