import { getLocale } from 'next-intl/server';
import Component7Content from '@/components/Component7Content';

export default async function Component7Page() {
  const locale = await getLocale();
  return <Component7Content locale={locale} />;
}
