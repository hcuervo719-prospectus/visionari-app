import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista de todos los locales soportados
  locales,
  
  // Locale por defecto cuando no se puede detectar
  defaultLocale,
  
  // Detección automática basada en Accept-Language header
  localeDetection: true,
  
  // Siempre mostrar el locale en la URL
  localePrefix: 'always'
});

export const config = {
  // Matcher: aplica middleware a todas las rutas excepto:
  // - API routes
  // - Archivos estáticos (_next)
  // - Assets (imágenes, fonts, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
