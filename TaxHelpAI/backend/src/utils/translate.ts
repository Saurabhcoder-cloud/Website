import translate from 'google-translate-api-x';
import env from '../config/env';
import { SupportedLanguage } from '../types';

export async function translateText(text: string, language: SupportedLanguage) {
  if (!env.GOOGLE_TRANSLATE_API_KEY || language === 'en') {
    return text;
  }
  try {
    const result = await translate(text, { to: language, apiKey: env.GOOGLE_TRANSLATE_API_KEY });
    return result.text;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Translation fallback due to error', error);
    return text;
  }
}
