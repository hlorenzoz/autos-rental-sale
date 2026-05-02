import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, locals } = context;
  const { pathname } = url;

  // Check if this is an internal rewrite already handled by us
  // @ts-expect-error - isInternalRewrite is a custom property added to locals for loop prevention
  if (locals.isInternalRewrite) {
    return next();
  }

  // Only handle Spanish localized URLs
  if (pathname.startsWith('/es/')) {
    
    // 1. PUBLIC SPANISH -> TECHNICAL ENGLISH (Transparent Rewrite)
    const handleRewrite = (target: string) => {
      // @ts-expect-error - Adding custom property to locals object to flag the internal rewrite
      locals.isInternalRewrite = true;
      return context.rewrite(target);
    };

    if (pathname === '/es/vehiculos' || pathname === '/es/vehiculos/') {
      return handleRewrite('/es/vehicles/');
    }
    if (pathname === '/es/vehiculos/en-alquiler' || pathname === '/es/vehiculos/en-alquiler/') {
      return handleRewrite('/es/vehicles/for-rent/');
    }
    if (pathname === '/es/vehiculos/en-venta' || pathname === '/es/vehiculos/en-venta/') {
      return handleRewrite('/es/vehicles/for-sell/');
    }
    if (pathname === '/es/contacto' || pathname === '/es/contacto/') {
      return handleRewrite('/es/contact/');
    }
    if (pathname === '/es/sobre-nosotros' || pathname === '/es/sobre-nosotros/') {
      return handleRewrite('/es/about/');
    }
    if (pathname === '/es/mapa-del-sitio' || pathname === '/es/mapa-del-sitio/') {
      return handleRewrite('/es/sitemap/');
    }
    if (pathname.startsWith('/es/vehiculos/')) {
      const slug = pathname.replace('/es/vehiculos/', '').replace(/\/$/, '');
      if (slug && slug !== 'en-alquiler' && slug !== 'en-venta') {
        return handleRewrite(`/es/vehicles/${slug}/`);
      }
    }

    // 2. TECHNICAL ENGLISH -> PUBLIC SPANISH (Active Redirection)
    if (pathname === '/es/vehicles' || pathname === '/es/vehicles/') {
      return context.redirect('/es/vehiculos/');
    }
    if (pathname === '/es/vehicles/for-rent' || pathname === '/es/vehicles/for-rent/') {
      return context.redirect('/es/vehiculos/en-alquiler/');
    }
    if (pathname === '/es/vehicles/for-sell' || pathname === '/es/vehicles/for-sell/') {
      return context.redirect('/es/vehiculos/en-venta/');
    }
    if (pathname === '/es/contact' || pathname === '/es/contact/') {
      return context.redirect('/es/contacto/');
    }
    if (pathname === '/es/about' || pathname === '/es/about/') {
      return context.redirect('/es/sobre-nosotros/');
    }
    if (pathname === '/es/sitemap' || pathname === '/es/sitemap/') {
      return context.redirect('/es/mapa-del-sitio/');
    }
  }

  return next();
};
