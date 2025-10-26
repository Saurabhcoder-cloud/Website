import OpenAI from 'openai';

import { translateText, type SupportedLanguage } from './translate';

type RagDocument = {
  title: string;
  url: string;
  content: string;
};

const IRS_DATASET: RagDocument[] = [
  {
    title: 'IRS Form 1040 Instructions',
    url: 'https://www.irs.gov/instructions/i1040gi',
    content:
      'Form 1040 is used to report an individual\'s gross income, claim deductions, and determine tax liability or refund for the year.'
  },
  {
    title: 'Child Tax Credit 2024',
    url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit-overview',
    content: 'For 2024, up to $2,000 of the child tax credit is available for each qualifying child under age 17.'
  },
  {
    title: 'IRS Publication 17',
    url: 'https://www.irs.gov/publications/p17',
    content:
      'Publication 17 explains the rules for filing a federal individual income tax return, including standard deductions, credits, and filing statuses.'
  }
];

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export type ChatResponse = {
  answer: string;
  citations: { title: string; url: string }[];
  language: SupportedLanguage;
};

function searchDocuments(query: string): RagDocument[] {
  const normalized = query.toLowerCase();
  const matches = IRS_DATASET.filter((doc) => doc.content.toLowerCase().includes(normalized));
  return matches.length > 0 ? matches : IRS_DATASET.slice(0, 2);
}

export async function askTaxAssistant(question: string, language: SupportedLanguage): Promise<ChatResponse> {
  const sources = searchDocuments(question);
  const prompt = `You are TaxHelp AI, a helpful U.S. tax assistant. Answer with concise, accurate guidance using the provided IRS context. Cite sources.`;
  const context = sources.map((doc) => `Title: ${doc.title}\nURL: ${doc.url}\nContent: ${doc.content}`).join('\n\n');

  let answer = '';

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt },
          {
            role: 'user',
            content: `Context:\n${context}\n\nQuestion: ${question}\nReturn the answer in Markdown.`
          }
        ],
        temperature: 0.3
      });
      answer = completion.choices[0]?.message?.content ?? '';
    } catch (error) {
      console.error('OpenAI error', error);
    }
  }

  if (!answer) {
    answer = `Based on IRS guidance, it looks like your situation may be covered by ${sources[0].title}. Please review the linked resource for more detail.`;
  }

  const translated = await translateText(answer, language);

  return {
    answer: translated,
    citations: sources.map(({ title, url }) => ({ title, url })),
    language
  };
}
