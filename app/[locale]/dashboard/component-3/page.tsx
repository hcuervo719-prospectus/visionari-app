import { setRequestLocale } from 'next-intl/server';
import Component3Content from '@/components/Component3Content';

type Props = { params: { locale: string } };

export default async function Component3Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component3Content locale={locale} />;
}

export function generateStaticParams() {
  return ['es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no']
    .map((locale) => ({ locale }));
}
