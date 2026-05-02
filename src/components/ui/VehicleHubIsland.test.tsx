import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VehicleHubIsland from './VehicleHubIsland';
import type { Vehicle } from '@/schemas/vehicle';

const makeVehicle = (overrides: Partial<Vehicle>): Vehicle => ({
  id: '1',
  slug: 'test-vehicle',
  brand: 'Tesla',
  model: 'Model S',
  year: 2024,
  category: 'electric-sedan',
  type: 'both',
  price: { sale: 90000, rent: 299 },
  specs: { seats: 5, fuel: 'Electric' },
  image: '/vehicles/test.webp',
  featured: true,
  available: true,
  ...overrides,
});

const vehicles: Vehicle[] = [
  makeVehicle({ id: '1', brand: 'Tesla', model: 'Model S', category: 'electric-sedan', type: 'both', price: { sale: 90000, rent: 299 } }),
  makeVehicle({ id: '2', slug: 'porsche-911', brand: 'Porsche', model: '911 Turbo', category: 'sports-coupe', type: 'rent', price: { rent: 350 } }),
  makeVehicle({ id: '3', slug: 'range-rover', brand: 'Range Rover', model: 'Sport', category: 'luxury-suv', type: 'both', price: { sale: 150000, rent: 300 } }),
  makeVehicle({ id: '4', slug: 'toyota-rav4', brand: 'Toyota', model: 'RAV4', category: 'suv', type: 'sale', price: { sale: 35000 } }),
  makeVehicle({ id: '5', slug: 'honda-civic', brand: 'Honda', model: 'Civic', category: 'sedan', type: 'sale', price: { sale: 25000 } }),
];

const labels = {
  buyLabel: 'Buy',
  rentLabel: 'Rent',
  placeholder: 'Search…',
  filterLabel: 'Filter',
  filters: [
    { label: 'Electric', value: 'electric' },
    { label: 'SUV', value: 'suv' },
    { label: 'Luxury', value: 'luxury' },
    { label: 'Under $50k', value: 'budget' },
  ],
  noResults: 'No vehicles match your filters.',
  clearFilters: 'Clear filters',
  found: 'results',
  bookNow: 'Book Now',
  inquire: 'Inquire',
};

describe('VehicleHubIsland', () => {
  it('renders all sale/both vehicles initially in buy mode', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    // type both (1,3) + sale (4,5) = 4 vehicles
    expect(screen.getByTestId('result-count').textContent).toContain('4');
  });

  it('switching to rent mode shows rent-type vehicles only', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.click(screen.getByText('RENT'));
    // type both (1,3) + rent (2) = 3 vehicles
    expect(screen.getByTestId('result-count').textContent).toContain('3');
  });

  it('search query filters by brand/model text match', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'Tesla' } });
    expect(screen.getByTestId('result-count').textContent).toContain('1');
  });

  it('electric tag shows only electric-sedan vehicles', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.click(screen.getByText('Electric'));
    // buy mode (both+sale): 1,3,4,5 → electric-sedan only → 1
    expect(screen.getByTestId('result-count').textContent).toContain('1');
  });

  it('suv tag shows suv + luxury-suv vehicles', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.click(screen.getByText('SUV'));
    // buy mode: 1,3,4,5 → suv/luxury-suv → 3 (luxury-suv,both) + 4 (suv,sale) = 2
    expect(screen.getByTestId('result-count').textContent).toContain('2');
  });

  it('budget tag shows vehicles with sale price <= 50000 in buy mode', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    fireEvent.click(screen.getByText('Under $50k'));
    // buy mode: 1(90k), 3(150k), 4(35k✓), 5(25k✓) → 2 matches
    expect(screen.getByTestId('result-count').textContent).toContain('2');
  });

  it('empty state renders when no vehicles match', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'zzz_no_match' } });
    expect(screen.getByTestId('empty-state')).toBeDefined();
    expect(screen.getByText('No vehicles match your filters.')).toBeDefined();
  });

  it('multiple tags use OR logic on categories', () => {
    render(<VehicleHubIsland vehicles={vehicles} locale="en" labels={labels} vehiclesSlug="vehicles" />);
    // electric + suv → categories: electric-sedan OR suv OR luxury-suv
    fireEvent.click(screen.getByText('Electric'));
    fireEvent.click(screen.getByText('SUV'));
    // buy mode: 1,3,4,5 → electric-sedan(1) + suv/luxury-suv(3,4) = 3
    expect(screen.getByTestId('result-count').textContent).toContain('3');
  });
});
