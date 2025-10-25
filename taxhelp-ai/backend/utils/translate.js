import { v3 } from '@google-cloud/translate';

const { TranslationServiceClient } = v3;

let translationClient;

function getTranslationClient() {
  if (!translationClient) {
    translationClient = new TranslationServiceClient();
  }
  return translationClient;
}

export async function translateText(text, targetLanguage) {
  if (!text) {
    return { text: '', language: targetLanguage ?? 'en', translated: false };
  }

  const languageCode = targetLanguage?.toLowerCase() || 'en';

  const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID;
  const location = process.env.GOOGLE_TRANSLATE_LOCATION || 'global';

  if (!projectId || languageCode === 'en') {
    return { text, language: languageCode, translated: false };
  }

  try {
    const client = getTranslationClient();
    const [response] = await client.translateText({
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      targetLanguageCode: languageCode
    });

    const translatedText = response.translations?.[0]?.translatedText ?? text;
    const detected = response.translations?.[0]?.detectedLanguageCode ?? 'en';

    return { text: translatedText, language: languageCode, translated: true, detectedLanguage: detected };
  } catch (error) {
    console.warn('Translation service unavailable, returning original text.', error.message);
    return { text, language: languageCode, translated: false, error: error.message };
  }
}

export default translateText;
