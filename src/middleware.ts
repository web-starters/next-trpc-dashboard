import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales, localePrefix, pathnames } from './lib/navigation';

export default createMiddleware({ defaultLocale, localePrefix, locales, pathnames });

export const config = {
  matcher: ['/', '/(pl-PL|en-US)/:path*', '/((?!_next|robots.txt|sitemap.xml|images|api).*)'],
};
