import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en', 'pt', 'fr', 'de', 'it', 'nl', 'pl', 'tr', 'ja', 'ko', 'ru', 'hi', 'id', 'sv', 'no'],
  defaultLocale: 'es'
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
