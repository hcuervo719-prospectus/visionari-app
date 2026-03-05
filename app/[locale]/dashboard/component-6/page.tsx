import { getLocale } from 'next-intl/server';
import Component6Content from '@/components/Component6Content';

export default async function Component6Page() {
  const locale = await getLocale();
  return <Component6Content locale={locale} />;
}
