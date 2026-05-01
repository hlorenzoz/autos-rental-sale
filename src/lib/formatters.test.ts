import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
  it('should format USD correctly', () => {
    const result = formatCurrency(1000, 'en');
    // We check for containment because of potential non-breaking spaces or variations in Intl output
    expect(result).toContain('$1,000');
  });

  it('should format ARS correctly', () => {
    const result = formatCurrency(1000, 'es');
    // Spanish Argentina format usually is "$ 1.000" or similar
    expect(result).toContain('$');
    expect(result).toContain('1.000');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0, 'en');
    expect(result).toContain('$0');
  });
});
