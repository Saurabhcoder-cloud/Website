const SUPPORTED_LANGS = ['en', 'es', 'fr', 'hi', 'ar', 'zh-CN', 'de', 'ru'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGS)[number];

function mockTranslate(text: string, target: SupportedLanguage) {
  if (target === 'en') return text;
  return `[${target}] ${text}`;
}

export async function translateText(text: string, target: SupportedLanguage): Promise<string> {
  if (!text) return text;
  if (!SUPPORTED_LANGS.includes(target)) {
    return text;
  }

  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return mockTranslate(text, target);
  }

  try {
    const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: process.env.GOOGLE_TRANSLATE_API_KEY,
        target,
        q: text
      })
    });

    const data = await response.json();
    const translated = data?.data?.translations?.[0]?.translatedText;
    return translated ?? mockTranslate(text, target);
  } catch (error) {
    console.error('translateText error', error);
    return mockTranslate(text, target);
  }
}
