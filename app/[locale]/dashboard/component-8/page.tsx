import { setRequestLocale } from 'next-intl/server';
import Component8Content from '@/components/Component8Content';

type Props = { params: { locale: string } };

export default async function Component8Page({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <Component8Content locale={locale} />;
}

export function generateStaticParams() {
  return ['es','en','pt','fr','de','it','nl','pl','tr','ja','ko','ru','hi','id','sv','no']
    .map((locale) => ({ locale }));
}
