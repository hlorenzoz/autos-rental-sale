import { useState, useMemo } from 'react';
import type { Vehicle } from '@/schemas/vehicle';
import type { Locale } from '@/i18n/utils';
import {
  filterVehicles,
  getUniqueBrands,
  getUniqueCategories,
} from '@/lib/vehicles';
import { formatCurrency } from '@/lib/formatters';

interface FilterPanelLabels {
  brandLabel: string;
  categoryLabel: string;
  maxPriceLabel: string;
  clearFilters: string;
  noResults: string;
  found: string;
  all: string;
}

interface VehicleFilterPanelProps {
  vehicles: Vehicle[];
  locale: Locale;
  mode: 'sale' | 'rent';
  labels: FilterPanelLabels;
}

interface VehicleCardMiniProps {
  vehicle: Vehicle;
  locale: Locale;
  mode: 'sale' | 'rent';
}

function VehicleCardMini({ vehicle, locale, mode }: VehicleCardMiniProps) {
  const price =
    mode === 'rent' ? vehicle.price.rent : vehicle.price.sale;
  const formatted = price ? formatCurrency(price, locale) : '—';
  const suffix = mode === 'rent' ? ' / day' : '';

  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:atmospheric-shadow hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {!vehicle.available && (
          <div className="absolute inset-0 bg-surface/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-4 py-1 rounded-full bg-surface/80 text-on-surface text-xs font-bold uppercase tracking-wider">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <div className="p-md flex flex-col gap-sm">
        <div className="flex justify-between items-start gap-xs">
          <div>
            <p className="text-label-caps text-on-surface-variant font-medium tracking-wider mb-xs">
              {vehicle.year} · {vehicle.brand}
            </p>
            <h3 className="text-h3 font-display font-bold text-on-surface leading-tight">
              {vehicle.model}
            </h3>
          </div>
          <p className="text-h3 font-display font-bold text-primary text-right">
            {formatted}
            <span className="text-body-sm font-body font-normal text-on-surface-variant">
              {suffix}
            </span>
          </p>
        </div>
        <a
          href={`/${locale}/vehicles/${vehicle.slug}`}
          className="mt-xs block text-center bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95"
        >
          {mode === 'rent' ? 'Book Now' : 'Inquire'}
        </a>
      </div>
    </article>
  );
}

export default function VehicleFilterPanel({
  vehicles,
  locale,
  mode,
  labels,
}: VehicleFilterPanelProps) {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const brands = useMemo(() => getUniqueBrands(vehicles), [vehicles]);
  const categories = useMemo(() => getUniqueCategories(vehicles), [vehicles]);

  const filtered = useMemo(() => {
    return filterVehicles(vehicles, {
      brand: brand || undefined,
      category: category || undefined,
      ...(mode === 'rent' && maxPrice
        ? { maxPricePerDay: Number(maxPrice) }
        : {}),
      ...(mode === 'sale' && maxPrice
        ? { maxPriceSale: Number(maxPrice) }
        : {}),
    });
  }, [vehicles, brand, category, maxPrice, mode]);

  function clearFilters() {
    setBrand('');
    setCategory('');
    setMaxPrice('');
  }

  const hasActiveFilters = brand !== '' || category !== '' || maxPrice !== '';

  return (
    <div className="w-full">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-sm mb-lg p-md bg-surface-container rounded-xl border border-outline-variant/20">
        <div className="flex-1 flex flex-col gap-xs">
          <label
            htmlFor="filter-brand"
            className="text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
          >
            {labels.brandLabel}
          </label>
          <select
            id="filter-brand"
            aria-label={labels.brandLabel}
            value={brand}
            onChange={(e) => { setBrand(e.target.value); }}
            className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-sm py-xs text-on-surface text-body-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">{labels.all}</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col gap-xs">
          <label
            htmlFor="filter-category"
            className="text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
          >
            {labels.categoryLabel}
          </label>
          <select
            id="filter-category"
            aria-label={labels.categoryLabel}
            value={category}
            onChange={(e) => { setCategory(e.target.value); }}
            className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-sm py-xs text-on-surface text-body-sm focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">{labels.all}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col gap-xs">
          <label
            htmlFor="filter-price"
            className="text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
          >
            {labels.maxPriceLabel}
          </label>
          <input
            id="filter-price"
            aria-label={labels.maxPriceLabel}
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); }}
            placeholder={mode === 'rent' ? '350' : '200000'}
            className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-sm py-xs text-on-surface text-body-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              className="px-md py-xs rounded-lg border border-outline text-on-surface-variant text-label-caps uppercase tracking-wider hover:bg-surface-container-high transition-colors"
            >
              {labels.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* Results count */}
      <p data-testid="result-count" className="text-body-sm text-on-surface-variant mb-md">
        <span className="font-bold text-on-surface">{filtered.length}</span>{' '}
        {labels.found}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="py-xl text-center">
          <span className="material-symbols-outlined text-5xl text-outline/40 block mb-md">
            directions_car
          </span>
          <p data-testid="empty-state" className="text-body-lg text-on-surface-variant">{labels.noResults}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-md text-primary text-body-sm font-semibold hover:underline"
          >
            {labels.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
          {filtered.map((vehicle) => (
            <div
              key={vehicle.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
            >
              <VehicleCardMini vehicle={vehicle} locale={locale} mode={mode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
