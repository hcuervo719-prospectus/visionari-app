import { getLocale } from 'next-intl/server';
import Component2Content from '@/components/Component2Content';

export default async function Component2Page() {
  const locale = await getLocale();
  return <Component2Content locale={locale} />;
}
