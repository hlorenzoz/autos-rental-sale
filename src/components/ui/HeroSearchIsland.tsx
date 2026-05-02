import { useState, useMemo, useRef, useEffect } from 'react';
import SearchPill from './SearchPill';
import data from '@/data/vehicles.json';

type Vehicle = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  type: string;
  image: string;
  price?: { sale?: number; rent?: number };
  available: boolean;
};

const vehicles = (data as { vehicles: Vehicle[] }).vehicles;

interface HeroSearchIslandProps {
  locale: string;
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  noResults: string;
  noResultsHint: string;
  perDay: string;
}

export default function HeroSearchIsland({
  locale,
  buyLabel,
  rentLabel,
  placeholder,
  filterLabel,
  noResults,
  noResultsHint,
  perDay,
}: HeroSearchIslandProps) {
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const showDropdown = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return vehicles
      .filter((v) => {
        if (mode === 'buy' && v.type === 'rent') return false;
        if (mode === 'rent' && v.type === 'sale') return false;
        const full = `${v.brand} ${v.model} ${v.category}`.toLowerCase();
        return full.includes(q);
      })
      .slice(0, 5);
  }, [query, mode]);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => { document.removeEventListener('mousedown', onOutside); };
  }, []);

  function formatPrice(v: Vehicle): string {
    if (mode === 'buy' && v.price?.sale) return `$${v.price.sale.toLocaleString()}`;
    if (mode === 'rent' && v.price?.rent) return `$${String(v.price.rent)} ${perDay}`;
    return '';
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <SearchPill
        buyLabel={buyLabel}
        rentLabel={rentLabel}
        placeholder={placeholder}
        filterLabel={filterLabel}
        onModeChange={setMode}
        onSearch={setQuery}
        initialMode="buy"
      />

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xl overflow-hidden z-50">
          {filtered.length === 0 ? (
            <div className="px-lg py-md text-center">
              <p className="text-on-surface font-semibold text-body-md">{noResults}</p>
              <p className="text-on-surface-variant text-body-sm mt-xs">{noResultsHint}</p>
            </div>
          ) : (
            <ul>
              {filtered.map((v) => {
                const p = formatPrice(v);
                return (
                  <li key={v.id}>
                    <a
                      href={`/${locale}/vehicles/${v.slug}`}
                      className="flex items-center gap-md px-lg py-sm hover:bg-surface-container transition-colors duration-150 group"
                      onClick={() => { setQuery(''); }}
                    >
                      <img
                        src={v.image}
                        alt={`${v.brand} ${v.model}`}
                        className="w-16 h-10 object-cover rounded-lg shrink-0 border border-outline-variant/20"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-on-surface font-semibold text-body-md truncate group-hover:text-primary transition-colors">
                          {v.year} {v.brand} {v.model}
                        </p>
                        <p className="text-on-surface-variant text-body-sm capitalize">
                          {v.category.replace(/-/g, ' ')}
                        </p>
                      </div>
                      {p && (
                        <span className="text-primary font-bold text-body-sm shrink-0">{p}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
