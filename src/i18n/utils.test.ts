import { describe, it, expect } from 'vitest';
import { getDictionary, getLocaleFromUrl, getLocalizedPath, defaultLocale } from './utils';

describe('i18n utils', () => {
  describe('getDictionary', () => {
    it('should return the english dictionary', () => {
      const dict = getDictionary('en');
      expect(dict.nav.contact).toBe('Contact');
    });

    it('should return the spanish dictionary', () => {
      const dict = getDictionary('es');
      expect(dict.nav.contact).toBe('Contacto');
    });
  });

  describe('getLocaleFromUrl', () => {
    it('should extract locale from URL', () => {
      expect(getLocaleFromUrl(new URL('https://example.com/en/test'))).toBe('en');
      expect(getLocaleFromUrl(new URL('https://example.com/es/test'))).toBe('es');
    });

    it('should return default locale for invalid paths', () => {
      expect(getLocaleFromUrl(new URL('https://example.com/fr/test'))).toBe(defaultLocale);
      expect(getLocaleFromUrl(new URL('https://example.com/'))).toBe(defaultLocale);
    });
  });

  describe('getLocalizedPath', () => {
    it('should translate known paths when switching locale', () => {
      const url = new URL('https://example.com/en/vehicles/');
      expect(getLocalizedPath(url, 'es')).toBe('/es/vehiculos/');
    });

    it('should handle vehicle details with localized slugs', () => {
      const url = new URL('https://example.com/en/vehicles/tesla-model-s/');
      expect(getLocalizedPath(url, 'es')).toBe('/es/vehiculos/tesla-model-s/');
    });

    it('should prepend target locale and add trailing slash for known paths without locale prefix', () => {
      const url = new URL('https://example.com/contact');
      expect(getLocalizedPath(url, 'es')).toBe('/es/contacto/');
    });

    it('should handle unmapped paths without locale prefix by prepending target locale', () => {
      const url = new URL('https://example.com/random-page');
      expect(getLocalizedPath(url, 'es')).toBe('/es/random-page');
    });
  });
});
