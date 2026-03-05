import { setRequestLocale } from 'next-intl/server';
import Component6Content from '@/components/Component6Content';

type Props = { params: { locale: string } };

export default async function Component6Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component6Content locale={locale} />;
}

export function generateStaticParams() {
  return ['es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no']
    .map((locale) => ({ locale }));
}
