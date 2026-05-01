import { describe, it, expect } from 'vitest';
import {
  getAllVehicles,
  getVehiclesByType,
  getFeaturedVehicles,
  filterVehicles,
  getUniqueBrands,
  getUniqueCategories,
  getVehiclePriceInfo,
} from './vehicles';
import type { Vehicle, VehicleType } from '../schemas/vehicle';


describe('getAllVehicles', () => {
  it('returns all 12 vehicles', () => {
    expect(getAllVehicles()).toHaveLength(12);
  });

  it('every vehicle has required fields', () => {
    for (const v of getAllVehicles()) {
      expect(v.id).toBeTruthy();
      expect(v.slug).toBeTruthy();
      expect(v.brand).toBeTruthy();
      expect(v.model).toBeTruthy();
      expect(v.image).toMatch(/^\/vehicles\/.+\.webp$/);
    }
  });
});

describe('getVehiclesByType', () => {
  it('sale — includes vehicles with type="sale"', () => {
    const result = getVehiclesByType('sale');
    expect(result.some((v) => v.type === 'sale')).toBe(true);
  });

  it('sale — includes vehicles with type="both"', () => {
    const result = getVehiclesByType('sale');
    expect(result.some((v) => v.type === 'both')).toBe(true);
  });

  it('sale — excludes vehicles with type="rent"', () => {
    const result = getVehiclesByType('sale');
    expect(result.every((v) => v.type !== 'rent')).toBe(true);
  });

  it('rent — includes vehicles with type="rent"', () => {
    const result = getVehiclesByType('rent');
    expect(result.some((v) => v.type === 'rent')).toBe(true);
  });

  it('rent — includes vehicles with type="both"', () => {
    const result = getVehiclesByType('rent');
    expect(result.some((v) => v.type === 'both')).toBe(true);
  });

  it('rent — excludes vehicles with type="sale"', () => {
    const result = getVehiclesByType('rent');
    expect(result.every((v) => v.type !== 'sale')).toBe(true);
  });

  it('sale + rent combined cover all vehicles exactly once', () => {
    const all = getAllVehicles();
    const saleIds = new Set(getVehiclesByType('sale').map((v) => v.id));
    const rentIds = new Set(getVehiclesByType('rent').map((v) => v.id));

    // Vehicles with type="both" must appear in both
    const bothVehicles = all.filter((v) => v.type === 'both');
    for (const v of bothVehicles) {
      expect(saleIds.has(v.id)).toBe(true);
      expect(rentIds.has(v.id)).toBe(true);
    }
  });
});

describe('getFeaturedVehicles', () => {
  it('default limit of 3 returns at most 3 featured vehicles', () => {
    const result = getFeaturedVehicles();
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('returns exactly 3 when there are at least 3 featured vehicles', () => {
    expect(getFeaturedVehicles(3)).toHaveLength(3);
  });

  it('all returned vehicles have featured=true', () => {
    expect(getFeaturedVehicles(10).every((v) => v.featured)).toBe(true);
  });

  it('custom limit is respected', () => {
    const result = getFeaturedVehicles(1);
    expect(result).toHaveLength(1);
    expect(result[0].featured).toBe(true);
  });
});

describe('filterVehicles', () => {
  const all = getAllVehicles();

  it('no filters returns all vehicles', () => {
    expect(filterVehicles(all, {})).toHaveLength(all.length);
  });

  it('type="sale" includes only sale and both', () => {
    const result = filterVehicles(all, { type: 'sale' });
    expect(result.every((v) => v.type === 'sale' || v.type === 'both')).toBe(true);
  });

  it('type="rent" includes only rent and both', () => {
    const result = filterVehicles(all, { type: 'rent' });
    expect(result.every((v) => v.type === 'rent' || v.type === 'both')).toBe(true);
  });

  it('search="tesla" returns only Tesla vehicles (case-insensitive)', () => {
    const result = filterVehicles(all, { search: 'Tesla' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.brand === 'Tesla')).toBe(true);
  });

  it('search is case-insensitive', () => {
    const upper = filterVehicles(all, { search: 'TESLA' });
    const lower = filterVehicles(all, { search: 'tesla' });
    expect(upper.map((v) => v.id)).toEqual(lower.map((v) => v.id));
  });

  it('search matches model name', () => {
    const result = filterVehicles(all, { search: 'raptor' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.model.toLowerCase().includes('raptor'))).toBe(true);
  });

  it('category filter returns only matching category', () => {
    const result = filterVehicles(all, { category: 'electric-sedan' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.category === 'electric-sedan')).toBe(true);
  });

  it('brand filter is case-insensitive', () => {
    const result = filterVehicles(all, { brand: 'bmw' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.brand === 'BMW')).toBe(true);
  });

  it('maxPricePerDay excludes vehicles without rent price', () => {
    const result = filterVehicles(all, { maxPricePerDay: 400 });
    expect(result.every((v) => v.price.rent !== undefined)).toBe(true);
  });

  it('maxPricePerDay filters by rent price ceiling', () => {
    const result = filterVehicles(all, { maxPricePerDay: 100 });
    expect(result.every((v) => (v.price.rent ?? Infinity) <= 100)).toBe(true);
  });

  it('maxPriceSale excludes vehicles without sale price', () => {
    const result = filterVehicles(all, { maxPriceSale: 200000 });
    expect(result.every((v) => v.price.sale !== undefined)).toBe(true);
  });

  it('maxPriceSale filters by sale price ceiling', () => {
    const result = filterVehicles(all, { maxPriceSale: 90000 });
    expect(result.every((v) => (v.price.sale ?? Infinity) <= 90000)).toBe(true);
  });

  it('multiple filters are applied together (AND logic)', () => {
    const result = filterVehicles(all, {
      type: 'rent',
      category: 'sports-coupe',
    });
    expect(result.length).toBeGreaterThan(0);
    for (const v of result) {
      expect(v.type === 'rent' || v.type === 'both').toBe(true);
      expect(v.category).toBe('sports-coupe');
    }
  });

  it('returns empty array when filters match nothing', () => {
    const result = filterVehicles(all, { search: 'doesnotexistxyz123' });
    expect(result).toHaveLength(0);
  });

  it('empty search string does not filter', () => {
    const result = filterVehicles(all, { search: '' });
    expect(result).toHaveLength(all.length);
  });

  it('whitespace-only search does not filter', () => {
    const result = filterVehicles(all, { search: '   ' });
    expect(result).toHaveLength(all.length);
  });
});

describe('getUniqueBrands', () => {
  const all = getAllVehicles();

  it('returns sorted unique brands', () => {
    const brands = getUniqueBrands(all);
    const sorted = [...brands].sort();
    expect(brands).toEqual(sorted);
  });

  it('contains no duplicates', () => {
    const brands = getUniqueBrands(all);
    expect(new Set(brands).size).toBe(brands.length);
  });

  it('every brand in the list exists in the data', () => {
    const brands = getUniqueBrands(all);
    const dataBrands = new Set(all.map((v) => v.brand));
    for (const b of brands) {
      expect(dataBrands.has(b)).toBe(true);
    }
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueBrands([])).toHaveLength(0);
  });
});

describe('getUniqueCategories', () => {
  const all = getAllVehicles();

  it('returns sorted unique categories', () => {
    const cats = getUniqueCategories(all);
    const sorted = [...cats].sort();
    expect(cats).toEqual(sorted);
  });

  it('contains no duplicates', () => {
    const cats = getUniqueCategories(all);
    expect(new Set(cats).size).toBe(cats.length);
  });

  it('every category in the list exists in the data', () => {
    const cats = getUniqueCategories(all);
    const dataCats = new Set(all.map((v) => v.category));
    for (const c of cats) {
      expect(dataCats.has(c as typeof all[number]['category'])).toBe(true);
    }
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueCategories([])).toHaveLength(0);
  });
});

describe('getVehiclePriceInfo', () => {
  const mockVehicle = (type: VehicleType, rent?: number, sale?: number): Vehicle => ({
    id: '1',
    slug: 'test',
    brand: 'Test',
    model: 'Test',
    year: 2024,
    category: 'electric-sedan',
    type,
    price: { rent, sale },
    specs: {},
    image: '/test.webp',
    featured: false,
    available: true,
  });


  it('returns rent price when type is "rent"', () => {
    const v = mockVehicle('rent', 100);
    const info = getVehiclePriceInfo(v);
    expect(info.price).toBe(100);
    expect(info.isRent).toBe(true);
  });

  it('returns sale price when type is "sale"', () => {
    const v = mockVehicle('sale', undefined, 50000);
    const info = getVehiclePriceInfo(v);
    expect(info.price).toBe(50000);
    expect(info.isRent).toBe(false);
  });

  it('returns sale price when type is "both" by default', () => {
    const v = mockVehicle('both', 100, 50000);
    const info = getVehiclePriceInfo(v);
    expect(info.price).toBe(50000);
    expect(info.isRent).toBe(false);
  });

  it('allows overriding type for "both" vehicles', () => {
    const v = mockVehicle('both', 100, 50000);
    const info = getVehiclePriceInfo(v, 'rent');
    expect(info.price).toBe(100);
    expect(info.isRent).toBe(true);
  });

  it('returns undefined if requested price is missing', () => {
    const v = mockVehicle('rent', undefined);
    const info = getVehiclePriceInfo(v);
    expect(info.price).toBeUndefined();
  });
});

