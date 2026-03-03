import { redirect } from 'next/navigation';
import { defaultLocale } from '../i18n';

// Esta página raíz solo existe para redirigir al idioma apropiado
// El middleware se encarga de detectar el idioma, pero si alguien
// llega directamente a la raíz sin pasar por middleware, redirigimos
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
