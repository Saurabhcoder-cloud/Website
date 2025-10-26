export type TaxRule = {
  id: string;
  sourceForm: 'W-2' | '1099-NEC' | '1099-K' | '1099-MISC';
  sourceField: string;
  targetForm: '1040' | 'Schedule C' | 'Schedule SE' | 'CA 540';
  targetLine: string;
  description: string;
  computation?: string;
  references: string[];
};

export const taxRules: TaxRule[] = [
  {
    id: 'w2-wages',
    sourceForm: 'W-2',
    sourceField: 'Box 1 – Wages, tips, other compensation',
    targetForm: '1040',
    targetLine: 'Line 1a',
    description: 'Gross wages from the W-2 populate Form 1040 line 1a as ordinary income.',
    references: ['IRS Pub. 17', 'Form 1040 Instructions (2023)'],
  },
  {
    id: 'w2-fed-wh',
    sourceForm: 'W-2',
    sourceField: 'Box 2 – Federal income tax withheld',
    targetForm: '1040',
    targetLine: 'Line 25a',
    description: 'Federal income tax withholding carries to the payments section of Form 1040.',
    references: ['Form 1040 Instructions (2023)'],
  },
  {
    id: 'w2-ss-wages',
    sourceForm: 'W-2',
    sourceField: 'Box 3 – Social security wages',
    targetForm: 'Schedule SE',
    targetLine: 'Section A, line 7',
    description: 'Social security wages inform self-employment tax calculations when applicable limits are met.',
    computation: 'Use up to the social security wage base ($160,200 for 2023).',
    references: ['Schedule SE Instructions (2023)'],
  },
  {
    id: '1099nec-gross',
    sourceForm: '1099-NEC',
    sourceField: 'Box 1 – Nonemployee compensation',
    targetForm: 'Schedule C',
    targetLine: 'Line 1',
    description: 'Nonemployee compensation is reported as gross receipts for business income.',
    references: ['Schedule C Instructions (2023)'],
  },
  {
    id: '1099nec-se',
    sourceForm: '1099-NEC',
    sourceField: 'Box 1 – Nonemployee compensation',
    targetForm: 'Schedule SE',
    targetLine: 'Section A, line 2',
    description: 'Self-employment earnings from 1099-NEC feed into net earnings calculations for SE tax.',
    computation: 'Multiply Schedule C line 31 by 92.35% to derive SE tax base.',
    references: ['Schedule SE Instructions (2023)'],
  },
  {
    id: '1099k-gross',
    sourceForm: '1099-K',
    sourceField: 'Box 1a – Gross payment volume',
    targetForm: 'Schedule C',
    targetLine: 'Line 1',
    description: 'Platform payments reported on 1099-K aggregate with other gross receipts on Schedule C.',
    references: ['Schedule C Instructions (2023)', 'IRS Fact Sheet FS-2023-20'],
  },
  {
    id: 'schedulec-to-1040',
    sourceForm: '1099-NEC',
    sourceField: 'Net profit (Schedule C line 31)',
    targetForm: '1040',
    targetLine: 'Schedule 1, line 3 → Form 1040 line 8',
    description: 'Net profit from Schedule C flows through Schedule 1 before appearing on Form 1040 line 8.',
    references: ['Form 1040 Schedule 1 Instructions (2023)'],
  },
  {
    id: 'schedulec-to-ca540',
    sourceForm: '1099-NEC',
    sourceField: 'Net profit (Schedule C line 31)',
    targetForm: 'CA 540',
    targetLine: 'Line 12 (Business income)',
    description: 'California Form 540 conforms to federal Schedule C net profit with state adjustments.',
    references: ['FTB Publication 1001', '2023 Form 540 Booklet'],
  },
  {
    id: 'schedulese-to-1040',
    sourceForm: '1099-NEC',
    sourceField: 'Schedule SE, line 12',
    targetForm: '1040',
    targetLine: 'Line 23',
    description: 'Self-employment tax computed on Schedule SE is reported on Form 1040 line 23.',
    references: ['Schedule SE Instructions (2023)'],
  },
  {
    id: 'ca540-withholding',
    sourceForm: 'W-2',
    sourceField: 'Box 17 – State income tax',
    targetForm: 'CA 540',
    targetLine: 'Line 71',
    description: 'California income tax withholding credits on line 71 of Form 540.',
    references: ['2023 Form 540 Instructions'],
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
  { code: 'zh', label: 'Chinese (Simplified)' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'vi', label: 'Vietnamese' },
];
