import { describe, it, expect } from 'vitest';
import { getLocaleFromUrl, getDictionary, defaultLocale } from './utils';

describe('i18n utils', () => {
  describe('getLocaleFromUrl', () => {
    it('returns the locale from a valid URL', () => {
      const url = new URL('https://example.com/es/about');
      expect(getLocaleFromUrl(url)).toBe('es');
    });

    it('returns the default locale for an invalid locale', () => {
      const url = new URL('https://example.com/fr/about');
      expect(getLocaleFromUrl(url)).toBe(defaultLocale);
    });

    it('returns the default locale for a root URL', () => {
      const url = new URL('https://example.com/');
      expect(getLocaleFromUrl(url)).toBe(defaultLocale);
    });
  });

  describe('getDictionary', () => {
    it('returns the dictionary for a valid locale', () => {
      const dictionary = getDictionary('es');
      expect(dictionary.site.name).toBe('Autos Alquiler y Venta');
    });

    it('returns the default dictionary for a valid locale (en)', () => {
      const dictionary = getDictionary('en');
      expect(dictionary.site.name).toBe('Autos Rental & Sale');
    });
  });
});
