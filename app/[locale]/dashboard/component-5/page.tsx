import { setRequestLocale } from 'next-intl/server';
import Component5Content from '@/components/Component5Content';

type Props = {
  params: { locale: string };
};

export default async function Component5Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component5Content locale={locale} />;
}

export function generateStaticParams() {
  return [
    'es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no'
  ].map((locale) => ({ locale }));
}
