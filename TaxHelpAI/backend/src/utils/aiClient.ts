import OpenAI from 'openai';
import env from '../config/env';

const openai = env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
  : null;

export interface RagSnippet {
  title: string;
  url: string;
  excerpt: string;
}

const ragDocuments: RagSnippet[] = [
  {
    title: 'IRS Form 1040 Instructions',
    url: 'https://www.irs.gov/forms-pubs/about-form-1040',
    excerpt:
      'Form 1040 is used by U.S. taxpayers to file an annual income tax return. Include wages, salaries, tips, and taxable interest.'
  },
  {
    title: 'IRS Child Tax Credit',
    url: 'https://www.irs.gov/credits-deductions/individuals/child-tax-credit-overview',
    excerpt: 'The Child Tax Credit allows up to $2,000 per qualifying child under age 17.'
  }
];

export async function askOpenAI(question: string, language: string) {
  const context = ragDocuments
    .map((doc) => `${doc.title}: ${doc.excerpt}`)
    .join('\n');

  if (!openai) {
    return {
      answer: `Mock answer for: ${question}. Context: ${context}`,
      citations: ragDocuments.map(({ title, url }) => ({ title, url })),
      language
    };
  }

  const completion = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: `You are a helpful tax assistant. Use the following context from IRS documents to answer questions.
Context:\n${context}\n\nQuestion:${question}`
  });

  const answer = completion.output_text ?? 'Unable to retrieve answer at this time.';
  return {
    answer,
    citations: ragDocuments.map(({ title, url }) => ({ title, url })),
    language
  };
}

export function findRelevantDocs(question: string): RagSnippet[] {
  const lowered = question.toLowerCase();
  return ragDocuments.filter((doc) => lowered.includes('child') ? doc.title.includes('Child') : true);
}
