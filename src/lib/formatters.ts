export function formatCurrency(amount: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-AR' : 'en-US', {
    style: 'currency',
    currency: locale === 'es' ? 'ARS' : 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
