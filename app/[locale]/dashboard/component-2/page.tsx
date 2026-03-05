import { setRequestLocale } from 'next-intl/server';
import Component2Content from '@/components/Component2Content';

type Props = {
  params: { locale: string };
};

export default async function Component2Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component2Content locale={locale} />;
}

export function generateStaticParams() {
  return [
    'es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no'
  ].map((locale) => ({ locale }));
}
