import { useState, useMemo, useRef, useEffect } from 'react';
import SearchPill from './SearchPill';
import { 
  getUniqueBrands, 
  getUniqueCategories 
} from '@/lib/vehicles';

interface SearchableVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  slug: string;
  image: string;
  type: 'sale' | 'rent' | 'both';
  price: {
    sale?: number;
    rent?: number;
  };
}

interface HeroSearchIslandProps {
  locale: string;
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  noResults: string;
  noResultsHint: string;
  perDay: string;
  vehiclesSlug: string;
  vehicles: SearchableVehicle[];
}

interface FilterState {
  brand?: string;
  category?: string;
  maxPrice?: number;
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
  vehiclesSlug,
  vehicles,
}: HeroSearchIslandProps) {
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({});
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => getUniqueBrands(vehicles as { brand: string }[]), [vehicles]);
  const categories = useMemo(() => getUniqueCategories(vehicles as { category: string }[]), [vehicles]);

  const hasContent = query.trim().length > 0 || filters.brand || filters.category || filters.maxPrice;
  const showDropdown = isDropdownVisible && hasContent;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return vehicles
      .filter((v) => {
        // Mode filter
        if (mode === 'buy' && v.type === 'rent') return false;
        if (mode === 'rent' && v.type === 'sale') return false;
        
        // Brand filter
        if (filters.brand && v.brand !== filters.brand) return false;
        
        // Category filter
        if (filters.category && v.category !== filters.category) return false;
        
        // Price filter
        if (filters.maxPrice) {
          const price = mode === 'rent' ? v.price.rent : v.price.sale;
          if (!price || price > filters.maxPrice) return false;
        }

        // Query search
        if (q) {
          const full = `${v.brand} ${v.model} ${v.category}`.toLowerCase();
          return full.includes(q);
        }
        
        return true;
      })
      .slice(0, 5);
  }, [query, mode, filters]);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownVisible(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  function formatPrice(v: SearchableVehicle): string {
    if (mode === 'buy' && v.price.sale) return `$${v.price.sale.toLocaleString()}`;
    if (mode === 'rent' && v.price.rent) return `$${String(v.price.rent)} ${perDay}`;
    return '';
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl z-30">
      <div className="relative z-50">
        <SearchPill
          buyLabel={buyLabel}
          rentLabel={rentLabel}
          placeholder={placeholder}
          filterLabel={filterLabel}
          brands={brands}
          categories={categories}
          onModeChange={setMode}
          onSearch={(q) => {
            setQuery(q);
            setIsDropdownVisible(true);
          }}
          onFilterChange={(f) => {
            setFilters(f);
            setIsDropdownVisible(true);
          }}
          initialMode="buy"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-xl overflow-hidden z-40">
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
                      href={`/${locale}/${vehiclesSlug}/${v.slug}`}
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
