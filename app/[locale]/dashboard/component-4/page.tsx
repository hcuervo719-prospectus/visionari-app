import { getLocale } from 'next-intl/server';
import Component4Content from '@/components/Component4Content';

export default async function Component4Page() {
  const locale = await getLocale();
  return <Component4Content locale={locale} />;
}
