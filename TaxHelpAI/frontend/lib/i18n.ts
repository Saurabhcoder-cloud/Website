'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to TaxHelp AI',
      getStarted: 'Get Started'
    }
  },
  es: { translation: { welcome: 'Bienvenido a TaxHelp AI', getStarted: 'Comenzar' } },
  fr: { translation: { welcome: 'Bienvenue sur TaxHelp AI', getStarted: 'Commencer' } },
  hi: { translation: { welcome: 'TaxHelp AI में आपका स्वागत है', getStarted: 'शुरू करें' } },
  ar: { translation: { welcome: 'مرحبًا بك في TaxHelp AI', getStarted: 'ابدأ الآن' } },
  zh: { translation: { welcome: '欢迎使用 TaxHelp AI', getStarted: '开始使用' } },
  de: { translation: { welcome: 'Willkommen bei TaxHelp AI', getStarted: 'Loslegen' } },
  ru: { translation: { welcome: 'Добро пожаловать в TaxHelp AI', getStarted: 'Начать' } }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
}

export default i18n;
