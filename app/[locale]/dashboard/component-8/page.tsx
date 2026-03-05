import { getLocale } from 'next-intl/server';
import Component8Content from '@/components/Component8Content';

export default async function Component8Page() {
  const locale = await getLocale();
  return <Component8Content locale={locale} />;
}
