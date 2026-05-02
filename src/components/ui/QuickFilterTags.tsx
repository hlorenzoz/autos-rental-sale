import { useState } from 'react';

export interface FilterTag {
  label: string;
  value: string;
}

interface QuickFilterTagsProps {
  filters: FilterTag[];
  onFilterChange?: (active: string[]) => void;
}

export default function QuickFilterTags({ filters, onFilterChange }: QuickFilterTagsProps) {
  const [active, setActive] = useState<string[]>([]);

  function toggle(value: string) {
    const next = active.includes(value)
      ? active.filter((v) => v !== value)
      : [...active, value];
    setActive(next);
    onFilterChange?.(next);
  }

  return (
    <div className="flex flex-wrap gap-3 mt-8" role="group" aria-label="Quick filters">
      {filters.map(({ label, value }) => {
        const isActive = active.includes(value);
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => { toggle(value); }}
            className={[
              'px-4 py-1.5 rounded-full text-label-caps uppercase tracking-[0.05em] font-bold font-body transition-all duration-200',
              isActive
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
