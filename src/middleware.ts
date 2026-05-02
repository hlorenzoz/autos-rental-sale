import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url } = context;
  const { pathname, searchParams } = url;

  // Check if this is an internal rewrite already handled by us using a query param
  // This is more reliable than locals which can be wiped during rewrite
  if (searchParams.get('internal_rewrite') === 'true') {
    return next();
  }

  // Handle localized path rewrites
  if (pathname.startsWith('/es/')) {
    const handleRewrite = (target: string) => {
      // Add a query param to flag the internal rewrite and prevent loops
      const targetUrl = new URL(target, url.origin);
      targetUrl.searchParams.set('internal_rewrite', 'true');
      return context.rewrite(targetUrl.pathname + targetUrl.search);
    };

    // 1. Direct path matches (e.g., /es/vehiculos -> /es/vehicles)
    if (pathname === '/es/vehiculos' || pathname === '/es/vehiculos/') {
      return handleRewrite('/es/vehicles/');
    }

    // 2. Filtered list matches (e.g., /es/vehiculos/en-alquiler -> /es/vehicles/for-rent)
    if (pathname === '/es/vehiculos/en-alquiler' || pathname === '/es/vehiculos/en-alquiler/') {
      return handleRewrite('/es/vehicles/for-rent/');
    }
    if (pathname === '/es/vehiculos/en-venta' || pathname === '/es/vehiculos/en-venta/') {
      return handleRewrite('/es/vehicles/for-sell/');
    }

    // 3. Dynamic vehicle slug matches (e.g., /es/vehiculos/byd-atto-3 -> /es/vehicles/byd-atto-3)
    if (pathname.startsWith('/es/vehiculos/')) {
      const slug = pathname.replace('/es/vehiculos/', '').replace(/\/$/, '');
      if (slug && slug !== 'en-alquiler' && slug !== 'en-venta') {
        return handleRewrite(`/es/vehicles/${slug}/`);
      }
    }

    // 4. Prevent direct access to technical paths by redirecting to localized ones
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
