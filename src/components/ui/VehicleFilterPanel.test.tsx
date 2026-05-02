import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VehicleFilterPanel from './VehicleFilterPanel';
import type { Vehicle } from '@/schemas/vehicle';

const makeVehicle = (overrides: Partial<Vehicle>): Vehicle => ({
  id: '1',
  slug: 'test-vehicle',
  brand: 'Tesla',
  model: 'Model S',
  year: 2024,
  category: 'electric-sedan',
  type: 'sale',
  price: { sale: 90000 },
  specs: { seats: 5, fuel: 'Electric' },
  image: '/vehicles/test.webp',
  featured: true,
  available: true,
  ...overrides,
});

const vehicles: Vehicle[] = [
  makeVehicle({ id: '1', brand: 'Tesla', model: 'Model S', category: 'electric-sedan', type: 'sale', price: { sale: 90000 } }),
  makeVehicle({ id: '2', slug: 'porsche-911', brand: 'Porsche', model: '911', category: 'sports-coupe', type: 'rent', price: { rent: 350 } }),
  makeVehicle({ id: '3', slug: 'range-rover', brand: 'Range Rover', model: 'Sport', category: 'luxury-suv', type: 'both', price: { sale: 150000, rent: 300 } }),
];

const labels = {
  brandLabel: 'Brand',
  categoryLabel: 'Category',
  maxPriceLabel: 'Max Price',
  clearFilters: 'Clear filters',
  noResults: 'No vehicles match your filters.',
  found: 'vehicles found',
  all: 'All',
};

function getResultCount() {
  return screen.getByTestId('result-count').textContent || '';
}

describe('VehicleFilterPanel', () => {
  it('renders all vehicles initially', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    expect(getResultCount()).toContain('3');
  });

  it('filters by brand', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.change(screen.getByLabelText('Brand'), { target: { value: 'Tesla' } });
    expect(getResultCount()).toContain('1');
  });

  it('filters by category', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'sports-coupe' } });
    expect(getResultCount()).toContain('1');
  });

  it('filters by max sale price', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.change(screen.getByLabelText('Max Price'), { target: { value: '100000' } });
    expect(getResultCount()).toContain('1');
  });

  it('shows empty state when no vehicles match', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    // Set max price below all vehicles (cheapest sale is 90000) → 0 results
    fireEvent.change(screen.getByLabelText('Max Price'), { target: { value: '1' } });
    expect(screen.getByTestId('empty-state').textContent).toBe('No vehicles match your filters.');
  });

  it('clear filters resets to all vehicles', () => {
    render(<VehicleFilterPanel vehicles={vehicles} locale="en" mode="sale" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.change(screen.getByLabelText('Brand'), { target: { value: 'Tesla' } });
    expect(getResultCount()).toContain('1');
    fireEvent.click(screen.getByText('Clear filters'));
    expect(getResultCount()).toContain('3');
  });
});
