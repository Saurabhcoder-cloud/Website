import { searchRagDataset } from '../utils/ragDataset.js';
import { generateAnswer } from '../utils/openaiClient.js';
import { translateText } from '../utils/translate.js';

function buildContextSnippet(documents) {
  return documents
    .map((doc, index) => `[#${index + 1}] ${doc.title}\nSummary: ${doc.summary}\nSource: ${doc.url}`)
    .join('\n\n');
}

export async function chatWithAI(req, res) {
  const { user_id: userId, message, language = 'en' } = req.body ?? {};

  if (!userId) {
    return res.status(400).json({
      error: 'missing_user_id',
      message: 'user_id is required to personalize answers.',
      sample: { request: { user_id: 42, message: 'How do I claim the child tax credit?' } }
    });
  }

  if (!message?.trim()) {
    return res.status(400).json({
      error: 'missing_message',
      message: 'Please include a question for the AI assistant to answer.'
    });
  }

  try {
    const documents = searchRagDataset(message, 3);
    const context = buildContextSnippet(documents);

    const aiAnswer = await generateAnswer({ question: message, context });

    const translation = await translateText(aiAnswer, language);

    return res.status(200).json({
      answer: translation.text,
      citations: documents.map((doc, index) => ({ id: index + 1, title: doc.title, url: doc.url })),
      language: translation.language ?? language,
      metadata: {
        translated: translation.translated ?? false,
        sourceLanguage: translation.detectedLanguage ?? 'en'
      }
    });
  } catch (error) {
    console.error('AI chat error:', error);
    return res.status(500).json({
      error: 'ai_chat_error',
      message: 'The AI assistant is currently unavailable. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default chatWithAI;
