import { getLocale } from 'next-intl/server';
import Component3Content from '@/components/Component3Content';

export default async function Component3Page() {
  const locale = await getLocale();
  return <Component3Content locale={locale} />;
}
