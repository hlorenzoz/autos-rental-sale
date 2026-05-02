import { describe, it, expect, vi } from 'vitest';
import type { APIContext } from 'astro';
import { onRequest } from './middleware';

describe('Middleware', () => {
  it('should skip processing if isInternalRewrite is true', async () => {
    const context = {
      url: new URL('https://example.com/es/vehiculos/'),
      locals: { isInternalRewrite: true },
      rewrite: vi.fn(),
    };
    const next = vi.fn().mockResolvedValue('next-result');
    const result = await onRequest(context as unknown as APIContext, next);
    expect(context.rewrite).not.toHaveBeenCalled();
    expect(result).toBe('next-result');
  });

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

  it('should not rewrite other English URLs', async () => {
    const context = {
      url: new URL('https://example.com/en/random-page'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn().mockResolvedValue('next-result');

    const result = await onRequest(context as unknown as APIContext, next);

    expect(context.rewrite).not.toHaveBeenCalled();
    expect(result).toBe('next-result');
  });

  it('should rewrite /es/vehiculos/en-alquiler/ to /es/vehicles/for-rent/', async () => {
    const context = {
      url: new URL('https://example.com/es/vehiculos/en-alquiler/'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.rewrite).toHaveBeenCalledWith('/es/vehicles/for-rent/');
  });

  it('should redirect /es/vehicles/for-rent/ to /es/vehiculos/en-alquiler/', async () => {
    const context = {
      url: new URL('https://example.com/es/vehicles/for-rent/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.redirect).toHaveBeenCalledWith('/es/vehiculos/en-alquiler/');
  });

  it('should redirect /es/vehicles/for-sell/ to /es/vehiculos/en-venta/', async () => {
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

  it('should redirect /es/sitemap/ to /es/mapa-del-sitio/', async () => {
    const context = {
      url: new URL('https://example.com/es/sitemap/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();

    await onRequest(context as unknown as APIContext, next);

    expect(context.redirect).toHaveBeenCalledWith('/es/mapa-del-sitio/');
  });

  it('should redirect /es/about/ to /es/sobre-nosotros/', async () => {
    const context = {
      url: new URL('https://example.com/es/about/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.redirect).toHaveBeenCalledWith('/es/sobre-nosotros/');
  });

  it('should redirect /es/contact/ to /es/contacto/', async () => {
    const context = {
      url: new URL('https://example.com/es/contact/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.redirect).toHaveBeenCalledWith('/es/contacto/');
  });

  it('should redirect /es/vehicles/ to /es/vehiculos/', async () => {
    const context = {
      url: new URL('https://example.com/es/vehicles/'),
      locals: {},
      redirect: vi.fn(),
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.redirect).toHaveBeenCalledWith('/es/vehiculos/');
  });

  it('should rewrite /es/vehiculos/ to /es/vehicles/', async () => {
    const context = {
      url: new URL('https://example.com/es/vehiculos/'),
      locals: {},
      rewrite: vi.fn(),
    };
    const next = vi.fn();
    await onRequest(context as unknown as APIContext, next);
    expect(context.rewrite).toHaveBeenCalledWith('/es/vehicles/');
  });
});
