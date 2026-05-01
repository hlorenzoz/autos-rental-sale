import { useState } from 'react';

interface SearchPillProps {
  buyLabel: string;
  rentLabel: string;
  placeholder: string;
  filterLabel: string;
  onModeChange?: (mode: 'buy' | 'rent') => void;
  onSearch?: (query: string) => void;
  initialMode?: 'buy' | 'rent';
}

export default function SearchPill({
  buyLabel,
  rentLabel,
  placeholder,
  filterLabel,
  onModeChange,
  onSearch,
  initialMode = 'buy',
}: SearchPillProps) {
  const [mode, setMode] = useState<'buy' | 'rent'>(initialMode);
  const [query, setQuery] = useState('');

  function handleModeChange(next: 'buy' | 'rent') {
    setMode(next);
    onModeChange?.(next);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }

  return (
    <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-1000 delay-300">
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
        <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-highest text-on-surface-variant rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors duration-300 shrink-0">
          <span className="material-symbols-outlined text-xl">tune</span>
          <span className="text-label-sm font-bold hidden lg:inline">{filterLabel}</span>
        </button>
      </div>
    </div>
  );
}
