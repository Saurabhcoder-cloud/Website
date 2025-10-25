import { askOpenAI, findRelevantDocs } from '../../utils/aiClient';
import { translateText } from '../../utils/translate';
import { isSupportedLanguage } from '../../utils/language';

export async function askChat(question: string, language: string) {
  const lang = isSupportedLanguage(language) ? language : 'en';
  const docs = findRelevantDocs(question);
  const answer = await askOpenAI(question, lang);
  const translated = await translateText(answer.answer, lang);
  return {
    answer: translated,
    citations: docs.map(({ title, url }) => ({ title, url })),
    language: lang
  };
}
