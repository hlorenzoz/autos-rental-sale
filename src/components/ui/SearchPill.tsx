import { useState, useRef, useEffect } from 'react';

interface FilterState {
  brand?: string;
  category?: string;
  maxPrice?: number;
}

interface SearchPillProps {
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  brands?: string[];
  categories?: string[];
  onModeChange?: (mode: 'buy' | 'rent') => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterState) => void;
  initialMode?: 'buy' | 'rent';
}

export default function SearchPill({
  buyLabel,
  rentLabel,
  placeholder,
  filterLabel,
  brands = [],
  categories = [],
  onModeChange,
  onSearch,
  onFilterChange,
  initialMode = 'buy',
}: SearchPillProps) {
  const [mode, setMode] = useState<'buy' | 'rent'>(initialMode);
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  function handleModeChange(next: 'buy' | 'rent') {
    setMode(next);
    onModeChange?.(next);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }

  function updateFilter(key: keyof FilterState, value: string | number | undefined) {
    const nextFilters = { ...filters, [key]: value === '' ? undefined : value };
    setFilters(nextFilters);
    onFilterChange?.(nextFilters);
    
    // Auto-close menu on selection (but not while typing price)
    if (key !== 'maxPrice') {
      setIsFilterOpen(false);
    }
  }

  const hasActiveFilters = filters.brand || filters.category || filters.maxPrice;

  return (
    <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-1000 delay-300 relative">
      <div className="bg-surface/80 backdrop-blur-xl rounded-full p-1.5 shadow-lg border border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 transition-all duration-300 hover:shadow-xl hover:border-white/40">
        
        {/* Toggle Group */}
        <div className="bg-surface-container-high rounded-full p-1 flex items-center shrink-0">
          <button
            onClick={() => { handleModeChange('buy'); }}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-label-sm font-black transition-all duration-300 ${
              mode === 'buy' 
                ? 'bg-primary text-on-primary shadow-md' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {buyLabel.toUpperCase()}
          </button>
          <button
            onClick={() => { handleModeChange('rent'); }}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-label-sm font-black transition-all duration-300 ${
              mode === 'rent' 
                ? 'bg-secondary text-on-secondary shadow-md' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {rentLabel.toUpperCase()}
          </button>
        </div>

        {/* Search Input Group */}
        <div className="flex-1 flex items-center px-4 min-w-0">
          <span className="material-symbols-outlined text-on-surface-variant text-xl mr-3 opacity-50 shrink-0">search</span>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/50 text-body-md py-2 sm:py-0"
          />
        </div>

        {/* Filter Trigger */}
        <button 
          onClick={() => { setIsFilterOpen(!isFilterOpen); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 shrink-0 relative ${
            isFilterOpen || hasActiveFilters
              ? 'bg-primary text-on-primary shadow-md'
              : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-xl">tune</span>
          <span className="text-label-sm font-bold hidden lg:inline">{filterLabel}</span>
          {hasActiveFilters && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border border-surface shadow-sm animate-pulse" />
          )}
        </button>
      </div>

      {/* Filter Menu Dropdown */}
      {isFilterOpen && (
        <div 
          ref={menuRef}
          className="absolute top-full right-0 mt-3 w-full sm:w-80 bg-surface/95 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/20 z-[60] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-label-sm font-black text-on-surface uppercase tracking-widest">Filters</h3>
              {hasActiveFilters && (
                <button 
                  onClick={() => {
                    const empty = {};
                    setFilters(empty);
                    onFilterChange?.(empty);
                  }}
                  className="text-body-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="filter-brand"
                className="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
              >
                Brand
              </label>
              <select 
                id="filter-brand"
                value={filters.brand || ''}
                onChange={(e) => { updateFilter('brand', e.target.value); }}
                className="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer appearance-none"
              >
                <option value="">All Brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="filter-category"
                className="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
              >
                Category
              </label>
              <select 
                id="filter-category"
                value={filters.category || ''}
                onChange={(e) => { updateFilter('category', e.target.value); }}
                className="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all cursor-pointer appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="filter-price"
                className="text-body-xs font-black text-on-surface-variant uppercase tracking-tighter opacity-70"
              >
                Max Price {mode === 'rent' ? '($/day)' : '($)'}
              </label>
              <input 
                id="filter-price"
                type="number"
                placeholder="Any price"
                value={filters.maxPrice || ''}
                onChange={(e) => { updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined); }}
                className="w-full bg-surface-container-highest/40 border border-white/10 rounded-xl px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
