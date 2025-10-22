import { SupportedLanguage } from '../types';

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  ar: 'Arabic',
  zh: 'Chinese (Simplified)',
  de: 'German',
  ru: 'Russian'
};

export function isSupportedLanguage(language: string): language is SupportedLanguage {
  return Object.keys(SUPPORTED_LANGUAGES).includes(language);
}
