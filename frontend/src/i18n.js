import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './locales/tr/translation.json';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';
import ar from './locales/ar/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
    de: { translation: de },
    ar: { translation: ar },
  },
  lng: localStorage.getItem('language') || 'tr',
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lang) => {
  localStorage.setItem('language', lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
});

export default i18n;
