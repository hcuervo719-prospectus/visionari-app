import { setRequestLocale } from 'next-intl/server';
import Component4Content from '@/components/Component4Content';

type Props = {
  params: { locale: string };
};

export default async function Component4Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component4Content locale={locale} />;
}

export function generateStaticParams() {
  return [
    'es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no'
  ].map((locale) => ({ locale }));
}
