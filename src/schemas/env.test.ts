import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Environment Variables Schema', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('should validate with correct environment variables', async () => {
    vi.stubEnv('PUBLIC_SITE_URL', 'https://example.com');
    vi.stubEnv('PUBLIC_SITE_NAME', 'Test Site');

    const { env } = await import('./env');
    
    expect(env.PUBLIC_SITE_URL).toBe('https://example.com');
    expect(env.PUBLIC_SITE_NAME).toBe('Test Site');
  });

  it('should use default values when variables are missing', async () => {
    const { env } = await import('./env');

    expect(env.PUBLIC_SITE_URL).toBe('http://localhost:4321');
    expect(env.PUBLIC_SITE_NAME).toBe('Autos Rental & Sale');
  });
});
