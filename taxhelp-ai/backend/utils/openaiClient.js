import OpenAI from 'openai';

let openAiClient;

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  if (!openAiClient) {
    openAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return openAiClient;
}

export async function generateAnswer({ question, context }) {
  const client = getOpenAIClient();
  const messages = [
    {
      role: 'system',
      content:
        'You are TaxHelp AI, a certified tax assistant. Provide concise answers grounded in IRS resources. Always include numbered citations like [1], [2] referencing the provided documents. If you are unsure, recommend contacting a tax professional.'
    },
    {
      role: 'user',
      content: `Question: ${question}\n\nContext:\n${context}\n\nRespond in English, keep answers under 250 words, and end with a helpful next step.`
    }
  ];

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.2,
    max_tokens: 600
  });

  const message = response?.choices?.[0]?.message?.content;
  return message?.trim() ?? 'I was unable to generate a response. Please try again later or consult a tax professional.';
}

export default generateAnswer;
