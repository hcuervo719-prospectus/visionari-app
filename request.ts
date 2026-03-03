import { getRequestConfig } from 'next-intl/server';
import { locales } from './i18n';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale recibido es válido
  if (!locales.includes(locale as any)) {
    return {
      messages: {}
    };
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
