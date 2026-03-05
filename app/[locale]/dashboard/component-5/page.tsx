import { getLocale } from 'next-intl/server';
import Component5Content from '@/components/Component5Content';

export default async function Component5Page() {
  const locale = await getLocale();
  return <Component5Content locale={locale} />;
}
