const IRS_DATASET = [
  {
    id: 1,
    title: 'IRS Publication 17 - Your Federal Income Tax',
    url: 'https://www.irs.gov/publications/p17',
    summary:
      'Comprehensive guide for individuals covering income reporting, deductions, credits, and filing information for the 2024 tax year.'
  },
  {
    id: 2,
    title: 'Form 1040 Instructions (2024)',
    url: 'https://www.irs.gov/instructions/i1040',
    summary:
      'Official IRS instructions for completing Form 1040 including schedules, filing statuses, and calculation worksheets.'
  },
  {
    id: 3,
    title: 'Earned Income Tax Credit (EITC) Assistant',
    url: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc',
    summary:
      'Eligibility requirements, income thresholds, and claiming steps for the Earned Income Tax Credit.'
  },
  {
    id: 4,
    title: 'Child Tax Credit (Schedule 8812) Guidance',
    url: 'https://www.irs.gov/pub/irs-pdf/i1040s8.pdf',
    summary:
      'Instructions and eligibility information for claiming the Child Tax Credit and Additional Child Tax Credit using Schedule 8812.'
  },
  {
    id: 5,
    title: 'Self-Employment Tax (Schedule SE) Overview',
    url: 'https://www.irs.gov/forms-pubs/about-schedule-se-form-1040',
    summary:
      'Explains who must file Schedule SE, how to compute self-employment tax, and deductible portions.'
  }
];

function calculateScore(text, queryTerms) {
  const normalized = text.toLowerCase();
  return queryTerms.reduce((score, term) => (normalized.includes(term) ? score + 1 : score), 0);
}

export function searchRagDataset(query, limit = 3) {
  if (!query?.trim()) {
    return IRS_DATASET.slice(0, limit);
  }

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const ranked = IRS_DATASET.map((entry) => ({
    ...entry,
    score: calculateScore(`${entry.title} ${entry.summary}`, terms)
  }))
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0);

  if (ranked.length === 0) {
    return IRS_DATASET.slice(0, limit);
  }

  return ranked.slice(0, limit);
}

export default IRS_DATASET;
