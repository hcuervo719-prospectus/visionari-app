import { setRequestLocale } from 'next-intl/server';
import Component7Content from '@/components/Component7Content';

type Props = {
  params: { locale: string };
};

export default async function Component7Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component7Content locale={locale} />;
}

export function generateStaticParams() {
  return [
    'es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no'
  ].map((locale) => ({ locale }));
}
