import { en } from './en';
import { es } from './es';
import type { Dictionary } from './en';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locales.includes(locale as Locale)) return locale as Locale;
  return defaultLocale;
}

export function getLocalizedPath(url: URL, targetLocale: Locale): string {
  const currentLocale = getLocaleFromUrl(url);
  const tCurrent = getDictionary(currentLocale);
  const tTarget = getDictionary(targetLocale);

  // Remove locale prefix for matching
  const pathWithoutLocale = url.pathname.replace(`/${currentLocale}`, '') || '/';
  
  // Find which key in tCurrent.nav.links matches the current path
  const linkKey = Object.entries(tCurrent.nav.links).find(
    ([, path]) => path === pathWithoutLocale || path === `${pathWithoutLocale}/`
  )?.[0] as keyof typeof tTarget.nav.links | undefined;

  if (linkKey) {
    return `/${targetLocale}${tTarget.nav.links[linkKey]}`;
  }

  // Fallback for non-mapped routes (like vehicle details)
  const parts = url.pathname.split('/');
  if (locales.includes(parts[1] as Locale)) {
    parts[1] = targetLocale;
    // Special case for vehicles slug in detail pages
    if (parts[2] === tCurrent.nav.slugs.vehicles) {
      parts[2] = tTarget.nav.slugs.vehicles;
    }
  } else {
    return `/${targetLocale}${url.pathname}`;
  }
  
  return parts.join('/').replace(/\/$/, '') + '/';
}

