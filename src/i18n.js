import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      zh: { translation: zh },
      ja: { translation: ja }
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;