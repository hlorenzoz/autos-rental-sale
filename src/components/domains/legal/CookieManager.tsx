import React, { useState, useEffect } from 'react';


interface Props {
  dictionary: {
    intro: string;
    essential: { title: string; description: string };
    analytics: { title: string; description: string };
    marketing: { title: string; description: string };
    save: string;
    rejectAll: string;
    requiredBadge: string;
    success: string;
  };
}

export default function CookieManager({ dictionary }: Props) {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-preferences');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as typeof preferences;
        setPreferences(parsed);
      } catch (error) {
        console.error('Failed to parse cookie preferences', error);
      }
    }
  }, []);

  const handleToggle = (category: keyof typeof preferences) => {
    if (category === 'essential') return;
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleRejectAll = () => {
    const newPrefs = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPrefs);
    localStorage.setItem('cookie-preferences', JSON.stringify(newPrefs));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const categories = [
    { id: 'essential' as const, ...dictionary.essential, essential: true, icon: 'security' },
    { id: 'analytics' as const, ...dictionary.analytics, essential: false, icon: 'bar_chart' },
    { id: 'marketing' as const, ...dictionary.marketing, essential: false, icon: 'campaign' },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <p className="text-body-lg text-on-surface-variant">{dictionary.intro}</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            className="bg-surface rounded-xl p-8 shadow-[0_20px_40px_rgba(0,87,255,0.06)] border border-outline-variant relative overflow-hidden group hover:border-primary-container transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                  <h3 className="font-display text-h3 text-on-background">
                    {cat.title}
                  </h3>
                  {cat.essential && (
                    <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ml-2">
                      {dictionary.requiredBadge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-on-surface-variant max-w-xl">
                  {cat.description}
                </p>
              </div>

              <button
                onClick={() => {
                  handleToggle(cat.id);
                }}
                disabled={cat.essential}
                className={`
                  relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${preferences[cat.id] ? 'bg-primary' : 'bg-outline-variant'}
                  ${cat.essential ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                    transition duration-200 ease-in-out
                    ${preferences[cat.id] ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end gap-4 border-t border-surface-container-high pt-8">
        <button
          onClick={handleRejectAll}
          className="px-6 py-3 text-body-md font-medium text-on-surface-variant bg-transparent border border-outline-variant hover:bg-surface-container-high rounded transition-colors active:scale-95"
        >
          {dictionary.rejectAll}
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 text-body-md font-medium text-white bg-primary hover:bg-primary-container shadow-[0_8px_16px_rgba(0,87,255,0.2)] rounded transition-all hover:shadow-[0_12px_24px_rgba(0,87,255,0.3)] active:scale-95"
        >
          {dictionary.save}
        </button>
      </div>

      {saved && (
        <div className="flex justify-center">
          <p className="text-secondary font-medium animate-in fade-in slide-in-from-bottom-2">
            {dictionary.success}
          </p>
        </div>
      )}
    </div>
  );
}
