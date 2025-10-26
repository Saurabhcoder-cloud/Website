export type DemoLocale = "en-US" | "es-US";

export type DemoDocumentType = "W2" | "1099" | "receipt";

export interface DemoTaxDocumentSet {
  w2: Array<{
    ssn: string;
    ein: string;
    wages: number;
    fed_withheld: number;
    ss_wages: number;
    ss_tax_withheld: number;
    medi_wages: number;
    medi_tax_withheld: number;
    state_withheld: number;
  }>;
  nec1099: Array<{
    payer: string;
    amount: number;
    fed_withheld: number;
  }>;
}

export interface DemoUserProfile {
  filing_status: "single" | "married_joint" | "married_separate" | "head" | "widow";
  dependents: Array<{
    name: string;
    age: number;
    ssn: string;
  }>;
  zip: string;
}

export interface DemoGigProfile {
  method: "mileage" | "actual";
  miles: number;
  actual: {
    fuel: number;
    insurance: number;
    maintenance: number;
    dmv: number;
    depreciation: number;
  };
  phone_percent: number;
}

export interface DemoComputeInput {
  locale: DemoLocale;
  country: "US";
  state: "CA";
  tax_year: number;
  docs: DemoTaxDocumentSet;
  user: DemoUserProfile;
  gig: DemoGigProfile;
}

export interface DemoComputeOutput {
  federal: {
    agi: number;
    tax: number;
    credits: number;
    refund: number;
    forms: string[];
  };
  state: {
    jurisdiction: string;
    tax: number;
    credits: number;
    refund: number;
    forms: string[];
  };
  explainers: Array<{
    line: string;
    text: string;
  }>;
  benefits: Array<{
    program: string;
    likely: boolean;
    reason: string;
    apply_url: string;
  }>;
  files: Array<{
    type: "pdf" | "json";
    url: string;
    expires_in: number;
  }>;
}

export interface DemoOcrResponse {
  docType: DemoDocumentType;
  fields: Record<string, string | number>;
  confidence: number;
}

export const demoComputeInput: DemoComputeInput = {
  locale: "en-US",
  country: "US",
  state: "CA",
  tax_year: 2024,
  docs: {
    w2: [
      {
        ssn: "xxx-xx-6789",
        ein: "12-3456789",
        wages: 52000,
        fed_withheld: 4500,
        ss_wages: 52000,
        ss_tax_withheld: 3224,
        medi_wages: 52000,
        medi_tax_withheld: 754,
        state_withheld: 900,
      },
    ],
    nec1099: [
      {
        payer: "Uber",
        amount: 18000,
        fed_withheld: 0,
      },
    ],
  },
  user: {
    filing_status: "single",
    dependents: [
      {
        name: "Amy",
        age: 3,
        ssn: "xxx-xx-1234",
      },
    ],
    zip: "94110",
  },
  gig: {
    method: "mileage",
    miles: 20000,
    actual: {
      fuel: 4800,
      insurance: 3000,
      maintenance: 1500,
      dmv: 400,
      depreciation: 3500,
    },
    phone_percent: 0.6,
  },
};

export const demoComputeOutput: DemoComputeOutput = {
  federal: {
    agi: 70000,
    tax: 6350,
    credits: 3500,
    refund: 800,
    forms: ["1040", "Schedule C", "Schedule SE"],
  },
  state: {
    jurisdiction: "CA",
    tax: 120,
    credits: 300,
    refund: 180,
    forms: ["CA 540"],
  },
  explainers: [
    {
      line: "1040-20",
      text: "Your standard deduction reduces taxable income.",
    },
  ],
  benefits: [
    {
      program: "CalEITC",
      likely: true,
      reason: "Income below threshold",
      apply_url: "#",
    },
    {
      program: "SNAP",
      likely: false,
      reason: "Household income exceeds CalFresh guide for a single filer.",
      apply_url: "https://www.cdss.ca.gov/calfresh",
    },
  ],
  files: [
    {
      type: "pdf",
      url: "#",
      expires_in: 604800,
    },
    {
      type: "json",
      url: "#",
      expires_in: 604800,
    },
  ],
};

export const demoOcrResponse: DemoOcrResponse = {
  docType: "W2",
  fields: {
    employer_name: "ACME Delivery LLC",
    employer_ein: "12-3456789",
    employee_ssn: "xxx-xx-6789",
    wages: 52000,
    federal_withholding: 4500,
    ss_wages: 52000,
    ss_withheld: 3224,
    medicare_wages: 52000,
    medicare_withheld: 754,
    ca_withholding: 900,
  },
  confidence: 0.93,
};
