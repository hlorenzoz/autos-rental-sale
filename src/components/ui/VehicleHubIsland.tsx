import { useState, useMemo } from 'react';
import type { Vehicle } from '@/schemas/vehicle';
import type { Locale } from '@/i18n/utils';
import { filterVehicles } from '@/lib/vehicles';
import { formatCurrency } from '@/lib/formatters';
import SearchPill from './SearchPill';
import QuickFilterTags from './QuickFilterTags';

interface VehicleHubLabels {
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  filters: Array<{ label: string; value: string }>;
  noResults: string;
  clearFilters: string;
  found: string;
  bookNow: string;
  inquire: string;
}

interface VehicleHubIslandProps {
  vehicles: Vehicle[];
  locale: Locale;
  labels: VehicleHubLabels;
}

interface VehicleCardMiniProps {
  vehicle: Vehicle;
  locale: Locale;
  mode: 'buy' | 'rent';
  bookNow: string;
  inquire: string;
}

function VehicleCardMini({ vehicle, locale, mode, bookNow, inquire }: VehicleCardMiniProps) {
  const price = mode === 'rent' ? vehicle.price.rent : vehicle.price.sale;
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
          {mode === 'rent' ? bookNow : inquire}
        </a>
      </div>
    </article>
  );
}

export default function VehicleHubIsland({ vehicles, locale, labels }: VehicleHubIslandProps) {
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let result = filterVehicles(vehicles, {
      type: mode === 'buy' ? 'sale' : 'rent',
      search: query || undefined,
    });

    if (activeTags.length > 0) {
      const catSet = new Set<string>();
      let maxSale: number | undefined;
      let maxRent: number | undefined;

      for (const tag of activeTags) {
        if (tag === 'electric') catSet.add('electric-sedan');
        if (tag === 'suv') { catSet.add('suv'); catSet.add('luxury-suv'); }
        if (tag === 'luxury') { catSet.add('luxury-suv'); catSet.add('sports-coupe'); }
        if (tag === 'budget') { maxSale = 50000; maxRent = 150; }
      }

      result = result.filter((v) => {
        if (catSet.size > 0 && !catSet.has(v.category)) return false;
        if (maxSale !== undefined && mode === 'buy' && (v.price.sale === undefined || v.price.sale > maxSale)) return false;
        if (maxRent !== undefined && mode === 'rent' && (v.price.rent === undefined || v.price.rent > maxRent)) return false;
        return true;
      });
    }

    return result;
  }, [vehicles, mode, query, activeTags]);

  return (
    <div className="w-full">
      <SearchPill
        buyLabel={labels.buyLabel}
        rentLabel={labels.rentLabel}
        placeholder={labels.placeholder}
        filterLabel={labels.filterLabel}
        initialMode={mode}
        onModeChange={(m) => { setMode(m); }}
        onSearch={(q) => { setQuery(q); }}
      />

      <QuickFilterTags
        filters={labels.filters}
        onFilterChange={setActiveTags}
      />

      <p data-testid="result-count" className="text-body-sm text-on-surface-variant mt-lg mb-md">
        <span className="font-bold text-on-surface">{filtered.length}</span>{' '}
        {labels.found}
      </p>

      {filtered.length === 0 ? (
        <div className="py-xl text-center">
          <span className="material-symbols-outlined text-5xl text-outline/40 block mb-md">
            directions_car
          </span>
          <p data-testid="empty-state" className="text-body-lg text-on-surface-variant">
            {labels.noResults}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
          {filtered.map((vehicle, i) => (
            <div
              key={vehicle.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${String(i * 60)}ms` }}
            >
              <VehicleCardMini
                vehicle={vehicle}
                locale={locale}
                mode={mode}
                bookNow={labels.bookNow}
                inquire={labels.inquire}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
