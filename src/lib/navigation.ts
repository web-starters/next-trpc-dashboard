import { type Pathnames, createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['pl-PL', 'en-US'] as const;
export const defaultLocale = 'pl-PL';
export const localePrefix = 'always';

// The `pathnames` object holds pairs of internal and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a single external path can be provided.
  '/': '/',

  // If locales use different paths, you can specify each external path per locale.
  '/signin': {
    'en-US': '/signin',
    'pl-PL': '/logowanie',
  },
} satisfies Pathnames<typeof locales>;

export type Locale = (typeof locales)[number];
export type Pathname = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
