import { describe, it, expect, vi } from 'vitest';
import type { APIContext } from 'astro';
import { onRequest } from './middleware';

describe('Middleware', () => {
  it('should rewrite Spanish URLs to English physical paths', async () => {
    const context = {
      url: new URL('https://example.com/es/vehiculos/en-venta/'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn();

    await onRequest(context as unknown as APIContext, next);

    expect(context.rewrite).toHaveBeenCalledWith('/es/vehicles/for-sell/');
  });

  it('should handle dynamic vehicle details', async () => {
    const context = {
      url: new URL('https://example.com/es/vehiculos/byd-seal/'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn();

    await onRequest(context as unknown as APIContext, next);

    expect(context.rewrite).toHaveBeenCalledWith('/es/vehicles/byd-seal/');
  });

  it('should redirect technical English paths to Spanish public paths in ES locale', async () => {
    const context = {
      url: new URL('https://example.com/es/vehicles/for-sell/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();

    await onRequest(context as unknown as APIContext, next);

    expect(context.redirect).toHaveBeenCalledWith('/es/vehiculos/en-venta/');
  });

  it('should not rewrite English URLs', async () => {
    const context = {
      url: new URL('https://example.com/en/vehicles/for-sell/'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn().mockResolvedValue('next-result');

    const result = await onRequest(context as unknown as APIContext, next);

    expect(context.rewrite).not.toHaveBeenCalled();
    expect(result).toBe('next-result');
  });

  it('should not rewrite Spanish URLs that are not mapped', async () => {
    const context = {
      url: new URL('https://example.com/es/random-page'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn().mockResolvedValue('next-result');

    const result = await onRequest(context as unknown as APIContext, next);

    expect(context.rewrite).not.toHaveBeenCalled();
    expect(result).toBe('next-result');
  });
});
