export type TaxRule = {
  id: string;
  sourceForm: 'W-2' | '1099-NEC' | 'Schedule C' | 'Schedule SE' | '1040';
  sourceField: string;
  targetForm: '1040' | 'Schedule C' | 'Schedule SE' | 'CA 540';
  targetLine: string;
  description: string;
  computation?: string;
  references: string[];
};

export const taxRules: TaxRule[] = [
  {
    id: 'w2-box1-1040-line1',
    sourceForm: 'W-2',
    sourceField: 'Box 1 – Wages, tips, other compensation',
    targetForm: '1040',
    targetLine: 'Line 1',
    description: 'Total wages from W-2 box 1 are reported as income on Form 1040 line 1.',
    references: ['Form 1040 Instructions (2024)'],
  },
  {
    id: 'w2-box2-1040-line25a',
    sourceForm: 'W-2',
    sourceField: 'Box 2 – Federal income tax withheld',
    targetForm: '1040',
    targetLine: 'Line 25a',
    description: 'Federal withholding from W-2 box 2 flows to the payments section of Form 1040 line 25a.',
    references: ['Form 1040 Instructions (2024)'],
  },
  {
    id: '1099nec-box1-schedulec-line1',
    sourceForm: '1099-NEC',
    sourceField: 'Box 1 – Nonemployee compensation',
    targetForm: 'Schedule C',
    targetLine: 'Line 1',
    description: 'Nonemployee compensation is included in gross receipts on Schedule C line 1.',
    references: ['Schedule C Instructions (2024)'],
  },
  {
    id: 'schedulec-line31-schedulese-line2',
    sourceForm: 'Schedule C',
    sourceField: 'Line 31 – Net profit or loss',
    targetForm: 'Schedule SE',
    targetLine: 'Line 2',
    description: 'Net profit from Schedule C line 31 is carried into Schedule SE line 2 before computing self-employment tax.',
    computation: 'Net earnings = Schedule C line 31 × 92.35% (0.9235).',
    references: ['Schedule SE Instructions (2024)'],
  },
  {
    id: 'schedulese-line12-1040-line23',
    sourceForm: 'Schedule SE',
    sourceField: 'Line 12 – Self-employment tax',
    targetForm: '1040',
    targetLine: 'Line 23',
    description: 'Self-employment tax computed on Schedule SE line 12 is reported on Form 1040 line 23.',
    references: ['Schedule SE Instructions (2024)'],
  },
  {
    id: '1040-line11-ca540-line13',
    sourceForm: '1040',
    sourceField: 'Line 11 – Adjusted gross income',
    targetForm: 'CA 540',
    targetLine: 'Line 13',
    description: 'California Form 540 line 13 starts with federal AGI from Form 1040 line 11 before state adjustments.',
    references: ['FTB Form 540 Booklet (2024)'],
  },
  {
    id: 'w2-box17-ca540-payments',
    sourceForm: 'W-2',
    sourceField: 'Box 17 – State income tax',
    targetForm: 'CA 540',
    targetLine: 'Payments section',
    description: 'California withholding from W-2 box 17 is claimed in the payments section of Form 540.',
    references: ['FTB Form 540 Booklet (2024)'],
  },
];

export const consentStatements = [
  {
    id: 'privacy',
    label: 'I consent to TaxHelp AI processing my data according to the Privacy Policy.',
  },
  {
    id: 'retention',
    label: 'I understand that uploaded documents are retained for 30 days for amendment support unless I request earlier deletion.',
  },
  {
    id: 'sharing',
    label: 'I authorize TaxHelp AI to share my draft return with a human preparer if I request review assistance.',
  },
];

export type LanguageOption = {
  code: string;
  label: string;
};

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
];
