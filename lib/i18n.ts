export type Locale = "en" | "es";

export type Translation = {
  common: {
    brandName: string;
    nav: {
      demo: string;
      pricing: string;
      security: string;
      contact: string;
      privacy: string;
      faq: string;
      accessibility: string;
      changelog: string;
      checkout: string;
      status: string;
    };
    buttons: {
      start: string;
      demo: string;
      contact: string;
      explorePricing: string;
    };
    footer: {
      tagline: string;
      hosting: string;
      ctaTitle: string;
      ctaSubtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
      rights: string;
    };
    languages: {
      en: string;
      es: string;
      detected: string;
    };
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    primaryCta: string;
    secondaryCta: string;
    errorTitle: string;
    errorDescription: string;
    errorAction: string;
    socialStrip: string;
    mobileCtaTitle: string;
    mobileCtaSubtitle: string;
    mobileCtaPrimary: string;
    mobileCtaSecondary: string;
    personasTitle: string;
    personas: {
      title: string;
      description: string;
    }[];
    valueHeading: string;
    valueCards: {
      title: string;
      description: string;
    }[];
    stepsTitle: string;
    stepsSubtitle: string;
    miniSteps: string[];
    mappingTitle: string;
    mappingSubtitle: string;
    mappingBullets: string[];
    demoGalleryTitle: string;
    demoGallerySubtitle: string;
    demoGalleryEn: string;
    demoGalleryEs: string;
  };
  demo: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    progressTitle: string;
    progressSubtitle: string;
    completionTitle: string;
    completionSubtitle: string;
    stepTitles: {
      language: string;
      upload: string;
      ocr: string;
      extract: string;
      qa: string;
      benefits: string;
      draft: string;
      summary: string;
      consent: string;
      complete: string;
    };
    stepDescriptions: {
      language: string;
      upload: string;
      ocr: string;
      extract: string;
      qa: string;
      benefits: string;
      draft: string;
      summary: string;
      consent: string;
      complete: string;
    };
    language: {
      detection: string;
      toggleLabel: string;
      switches: string[];
    };
    upload: {
      description: string;
      accepted: string;
      encryptedBadge: string;
      maskedBadge: string;
      browse: string;
      remove: string;
      staged: string;
      helper: string;
      errors: {
        size: string;
        type: string;
      };
    };
    ocr: {
      description: string;
      stages: string[];
      chips: string[];
      manualEntry: string;
      skip: string;
      error: string;
      retry: string;
    };
    extract: {
      description: string;
      masking: string;
      chips: string[];
    };
    qa: {
      description: string;
      prompts: string[];
      loading: string;
      empty: string;
    };
    benefits: {
      description: string;
      federalTitle: string;
      stateTitle: string;
      benefitsTitle: string;
      refundLabel: string;
      likely: string;
      review: string;
      benefits: string[];
      placeholder: string;
    };
    draft: {
      description: string;
      pills: string[];
      sampleNote: string;
    };
    summary: {
      description: string;
      downloads: string[];
      comingSoon: string;
      expiration: string;
      refundDrivers: string[];
      retry: string;
      error: string;
    };
    consent: {
      description: string;
      retentionLabel: string;
      options: string[];
      deleteNow: string;
      restore: string;
      acknowledgement: string;
      clearedNotice: string;
      modalTitle: string;
      modalDescription: string;
      modalCta: string;
      modalCancel: string;
      toastSuccess: string;
      toastCleared: string;
      toastRestored: string;
      exportDisabled: string;
      deleteConfirm: string;
    };
    complete: {
      description: string;
      checklist: string[];
      ctaPricing: string;
      ctaCheckout: string;
    };
  };
  pricing: {
    heroTitle: string;
    heroSubtitle: string;
    note: string;
    choosePlan: string;
    tableHeadings: string[];
    plans: {
      name: string;
      price: string;
      bestFor: string;
      includes: string[];
      sku: string;
    }[];
  };
  security: {
    heroTitle: string;
    heroSubtitle: string;
    bullets: string[];
    roadmapTitle: string;
    roadmapDescription: string;
    ctaLabel: string;
  };
  contact: {
    heroTitle: string;
    heroSubtitle: string;
    supportEmail: string;
    partnersEmail: string;
    telegramLabel: string;
    whatsappLabel: string;
    formTitle: string;
    formDescription: string;
    topicPlaceholder: string;
    topics: { label: string; value: string }[];
    labels: {
      name: string;
      email: string;
      topic: string;
      message: string;
      consent: string;
    };
    submit: string;
    success: string;
    toastSuccess: string;
    errors: {
      topic: string;
    };
  };
  faq: {
    title: string;
    intro: string;
    categories: {
      title: string;
      items: {
        question: string;
        answer: string;
      }[];
    }[];
  };
  accessibility: {
    title: string;
    intro: string;
    statement: string;
    sections: {
      title: string;
      items: string[];
    }[];
    contact: {
      title: string;
      emailLabel: string;
      phoneLabel: string;
      response: string;
    };
    feedback: string;
  };
  changelog: {
    title: string;
    intro: string;
    entries: {
      version: string;
      date: string;
      highlights: string[];
      notes: string[];
    }[];
    highlightLabel: string;
    notesLabel: string;
    contactCta: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    stepsTitle: string;
    steps: string[];
    plansTitle: string;
    plans: {
      id: string;
      name: string;
      description: string;
      price: string;
      amountCents: number;
      bestFor: string;
      features: string[];
    }[];
    cta: string;
    legal: string[];
    supportTitle: string;
    supportDescription: string;
    supportEmail: string;
    errorMessage: string;
  };
  checkoutCanceled: {
    title: string;
    description: string;
    suggestions: string[];
    retry: string;
    contact: string;
  };
  receipt: {
    title: string;
    subtitle: string;
    summaryTitle: string;
    details: {
      order: string;
      plan: string;
      status: string;
      total: string;
      email: string;
    };
    downloadsTitle: string;
    downloads: {
      pdf: string;
      json: string;
    };
    actions: {
      dashboard: string;
      status: string;
    };
    help: string;
  };
  status: {
    title: string;
    subtitle: string;
    lastUpdated: string;
    services: {
      name: string;
      status: string;
      description: string;
    }[];
    healthy: string;
    degraded: string;
    down: string;
    contact: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundDescription: string;
    notFoundCta: string;
    serverTitle: string;
    serverDescription: string;
    serverCta: string;
  };
  legal: {
    privacy: {
      title: string;
      updated: string;
      intro: string;
      sections: {
        title: string;
        items: string[];
      }[];
    };
    terms: {
      title: string;
      updated: string;
      intro: string;
      sections: {
        title: string;
        items: string[];
      }[];
    };
  };
};

export const defaultLocale: Locale = "en";

export const translations: Record<Locale, Translation> = {
  en: {
    common: {
      brandName: "TaxHelp AI",
      nav: {
        demo: "Demo",
        pricing: "Pricing",
        security: "Security",
        contact: "Contact",
        privacy: "Privacy",
        faq: "FAQ",
        accessibility: "Accessibility",
        changelog: "Changelog",
        checkout: "Checkout",
        status: "Status"
      },
      buttons: {
        start: "Start Filing Now",
        demo: "Try Free Demo",
        contact: "Talk with our team",
        explorePricing: "Explore pricing"
      },
      footer: {
        tagline: "Smart, simple, and affordable U.S. tax filing for gig workers, students, and retirees.",
        hosting: "Hosted on Vercel · Consent-first infrastructure",
        ctaTitle: "Tax filing, finally simple.",
        ctaSubtitle: "Pick a plan or explore the demo—your data stays in your control.",
        ctaPrimary: "Start Now",
        ctaSecondary: "Try Free Demo",
        rights: "All rights reserved."
      },
      languages: {
        en: "English",
        es: "Español",
        detected: "Detected {language} from your browser."
      }
    },
    home: {
      heroBadge: "Built for U.S. filers",
      heroTitle: "TaxHelp AI — Smart, Simple & Affordable Tax Filing (USA)",
      heroSubtitle: "File your taxes in minutes with 24/7 AI guidance. $9.99–$24.99, no hidden fees.",
      primaryCta: "Start Filing Now",
      secondaryCta: "Try Free Demo",
      errorTitle: "We couldn’t load the latest data.",
      errorDescription: "Check your connection and try again—your progress is saved locally.",
      errorAction: "Retry",
      socialStrip: "Perfect for gig workers, students, retirees, immigrants & low-income families.",
      mobileCtaTitle: "Ready to finish your return?",
      mobileCtaSubtitle: "Jump back in anytime—your uploads stay on this device.",
      mobileCtaPrimary: "Start Filing Now",
      mobileCtaSecondary: "Try Demo",
      personasTitle: "See how different filers win",
      personas: [
        {
          title: "Gig workers",
          description: "Sync W-2 and 1099 gig income, auto-track mileage, and capture Schedule C deductions."
        },
        {
          title: "Students",
          description: "Upload 1098-T forms, scholarships, and part-time earnings to surface education credits fast."
        },
        {
          title: "Retirees",
          description: "Blend Social Security, pensions, and medical deductions with automated taxability checks."
        }
      ],
      valueHeading: "Why filers choose TaxHelp AI",
      valueCards: [
        {
          title: "Save More",
          description: "Flat $9.99–$24.99 pricing is 10–20× cheaper than traditional preparers."
        },
        {
          title: "24/7 Help",
          description: "AI guidance is always on so you can file at midnight or between gigs."
        },
        {
          title: "Multi-language",
          description: "Start in English, switch to Spanish, and preview upcoming language support."
        },
        {
          title: "Privacy-First",
          description: "Encrypted uploads, consent receipts, and retention controls stay on your device."
        }
      ],
      demoGalleryTitle: "Preview the TaxHelp AI demo",
      demoGallerySubtitle: "Explore localized Q&A, retention controls, and export gating before connecting live data.",
      demoGalleryEn: "English workflow highlighting consent-gated exports and refund explainers.",
      demoGalleryEs: "Flujo en español con preguntas adaptativas y control de retención local.",
      stepsTitle: "How TaxHelp AI works",
      stepsSubtitle: "From quick questions to completed returns.",
      miniSteps: ["Answer", "AI fills forms", "Review & download"],
      mappingTitle: "Real rules baked in",
      mappingSubtitle: "Mock APIs follow the same schemas our tax engine uses—W-2 and 1099 flows straight into Form 1040, Schedule C/SE, and CA 540.",
      mappingBullets: [
        "W-2 box mapping to Form 1040 lines with validation",
        "Gig income reconciliation against Schedule C categories",
        "California adjustments including CalEITC and SDI limits"
      ]
    },
    demo: {
      heroBadge: "Mock services · Production schemas",
      heroTitle: "10-step filing demo",
      heroSubtitle: "Preview the entire flow from language detection to consent receipts—no PII required.",
      progressTitle: "Demo progress",
      progressSubtitle: "Follow each stage of the orchestration pipeline.",
      completionTitle: "Demo complete",
      completionSubtitle: "Here’s what happens when you go live.",
      stepTitles: {
        language: "Language & tone",
        upload: "Upload documents",
        ocr: "OCR & classification",
        extract: "Extract & validate",
        qa: "Adaptive Q&A",
        benefits: "Tax & benefits",
        draft: "Draft builder",
        summary: "Summary & export",
        consent: "Consent & retention",
        complete: "Completion"
      },
      stepDescriptions: {
        language: "Detected language with instant switching for multilingual support.",
        upload: "Collect W-2s, 1099s, and receipts with on-device encryption.",
        ocr: "Visualize preprocessing, OCR, and document classification in real time.",
        extract: "Mask SSNs/EINs while validating payroll math against IRS rules.",
        qa: "Guide filers with adaptive prompts across status, dependents, and gig work.",
        benefits: "Summarize federal/state taxes alongside key benefit programs.",
        draft: "Preview required forms—1040, Schedule C/SE, and CA 540.",
        summary: "Surface refund drivers and gated exports before e-file launches.",
        consent: "Capture consent, retention, and deletion preferences.",
        complete: "Share next steps before moving into pricing or checkout."
      },
      language: {
        detection: "Detected English (US). Switch:",
        toggleLabel: "Switch language",
        switches: ["Español", "العربية", "Русский", "हिन्दी"]
      },
      upload: {
        description: "W-2, 1099, receipts — PDF/JPG/PNG up to 10MB.",
        accepted: "Accepted: PDF, JPG, PNG · Max 10MB",
        encryptedBadge: "Encrypted (demo)",
        maskedBadge: "Masked preview",
        browse: "Browse files",
        remove: "Remove",
        staged: "{count} documents staged for processing (demo only).",
        helper: "Encrypted in-browser storage with masked previews—restore anytime to keep exploring.",
        errors: {
          size: "{name} is over the 10MB limit. Compress it or upload a smaller file.",
          type: "{name} isn’t supported. Try PDF, JPG, or PNG."
        }
      },
      ocr: {
        description: "Each document runs through preprocessing, OCR, and classification with live confidence scoring.",
        stages: ["Preprocess", "OCR", "Classify"],
        chips: ["W-2", "1099", "Receipt"],
        manualEntry: "Nothing detected? Skip ahead and enter details manually.",
        skip: "Skip to manual entry",
        error: "We hit a snag loading the OCR mock.",
        retry: "Retry"
      },
      extract: {
        description: "Validated against IRS schemas with identifiers masked before reviewers see them.",
        masking: "SSNs/EINs display as ***-**-6789 in reviewer view.",
        chips: ["SS ≈ 6.2% of Box 3", "Medicare ≈ 1.45% of Box 5"]
      },
      qa: {
        description: "Adaptive prompts follow the filer’s journey—status, dependents, gig deductions, and California credits.",
        prompts: [
          "What filing status fits your household?",
          "Do you track gig mileage or actual expenses?",
          "What percentage of your phone bill is for gig work?",
          "Any tolls or parking receipts to claim?",
          "Do you use part of your home as an office?",
          "Any California dependents for CalEITC/YCTC?"
        ],
        loading: "Loading answer...",
        empty: "No answer available."
      },
      benefits: {
        description: "Cards highlight federal and California summaries plus benefits to explore.",
        federalTitle: "Federal",
        stateTitle: "California",
        benefitsTitle: "Benefits to explore",
        refundLabel: "Refund",
        likely: "Likely",
        review: "Review",
        benefits: ["CalEITC", "SNAP", "Medicaid", "Housing assistance"],
        placeholder: "Preview values once the compute service responds."
      },
      draft: {
        description: "Toggle the forms you want to review before exporting.",
        pills: ["1040", "Schedule C", "Schedule SE", "CA 540"],
        sampleNote: "Preview notes: Calculations mirror production rules for 2024 filings."
      },
      summary: {
        description: "Downloadable artifacts keep teams aligned while e-file is in development.",
        downloads: ["Download PDF (demo)", "Download JSON (demo)", "E-file bundle (coming soon)"],
        comingSoon: "E-file submission launches with additional consent.",
        expiration: "Demo links expire in {days} days.",
        refundDrivers: ["+ Standard deduction", "+ Earned Income Credit", "− Self-employment tax"],
        retry: "Retry",
        error: "Mock compute failed. Try again to refresh refund totals."
      },
      consent: {
        description: "Record consent, choose retention, and trigger deletion immediately if requested.",
        retentionLabel: "Retention window",
        options: ["7 days", "30 days", "90 days"],
        deleteNow: "Delete now",
        restore: "Restore sample data",
        acknowledgement: "I agree to the consent and retention terms.",
        clearedNotice: "Demo data cleared locally. Restore to generate fresh mock files.",
        modalTitle: "Confirm consent before export",
        modalDescription: "We only generate {item} after you opt in. Nothing is stored once you delete or leave the demo.",
        modalCta: "Confirm & export {item}",
        modalCancel: "Cancel",
        toastSuccess: "Consent saved. {item} unlocked (demo only).",
        toastCleared: "Demo data deleted from this browser.",
        toastRestored: "Sample data restored. Refreshing results.",
        exportDisabled: "Demo data is cleared—restore it to preview exports again.",
        deleteConfirm: "This action clears staged uploads and mock results from this browser immediately. You can restore the sample data any time."
      },
      complete: {
        description: "You’re set. Next: choose a plan to file.",
        checklist: [
          "Importer sends drafts to preparer or e-file queue.",
          "Filers get reminders with consent receipts attached.",
          "Support available via chat or WhatsApp 24/7."
        ],
        ctaPricing: "View pricing",
        ctaCheckout: "Go to checkout"
      }
    },
    pricing: {
      heroTitle: "Simple pricing for every filer",
      heroSubtitle: "Choose a flat plan that matches your situation. No hidden fees.",
      note: "Student & retiree discounts available. Pay once per filing.",
      choosePlan: "Choose plan",
      tableHeadings: ["Plan", "Price", "Best for", "Includes", "Action"],
      plans: [
        {
          name: "Basic",
          price: "$9.99",
          bestFor: "Single W-2 / simple 1099",
          includes: ["Step-by-step guidance", "PDF download"],
          sku: "filing_basic_2024_us"
        },
        {
          name: "Standard",
          price: "$14.99",
          bestFor: "1099 + deductions",
          includes: ["AI suggestions", "PDF download", "Deduction checklist"],
          sku: "filing_standard_2024_us"
        },
        {
          name: "Family (Joint)",
          price: "$24.99",
          bestFor: "Married + dependents",
          includes: ["CTC guidance", "All Standard features", "Joint review support"],
          sku: "filing_family_2024_us"
        }
      ]
    },
    security: {
      heroTitle: "Security & privacy",
      heroSubtitle: "Consent-first design with transparent retention and encryption at every step.",
      bullets: [
        "No permanent storage in the demo environment.",
        "Encryption in transit with TLS 1.2+.",
        "Masked SSNs/EINs everywhere in the UI.",
        "Consent & retention controls for 7, 30, or 90 days.",
        "Delete-on-demand to clear local demo data instantly.",
        "IRS e-file alignment coming soon with extra consent."
      ],
      roadmapTitle: "What we deliver",
      roadmapDescription: "SOC 2-ready controls, audit trails, and jurisdiction-specific evidence on request.",
      ctaLabel: "Read Privacy Policy"
    },
    contact: {
      heroTitle: "Contact TaxHelp AI",
      heroSubtitle: "We reply in 1–2 business days.",
      supportEmail: "support@taxhelp.ai",
      partnersEmail: "partners@taxhelp.ai",
      telegramLabel: "Join us on Telegram",
      whatsappLabel: "Message us on WhatsApp",
      formTitle: "Send a note",
      formDescription: "Share what you need and we’ll follow up shortly.",
      topicPlaceholder: "Select a topic",
      topics: [
        { label: "Support", value: "support" },
        { label: "Investor", value: "investor" },
        { label: "Partnership", value: "partnership" }
      ],
      labels: {
        name: "Name",
        email: "Email",
        topic: "Topic",
        message: "Message",
        consent: "I agree to the data handling described in the Privacy Policy."
      },
      submit: "Send message",
      success: "Thanks! We’ll follow up soon.",
      toastSuccess: "We reply in 1–2 business days.",
      errors: {
        topic: "Please choose a topic."
      }
    },
    faq: {
      title: "Frequently asked questions",
      intro: "Answers to common questions about the demo, checkout, and compliance readiness.",
      categories: [
        {
          title: "Tax basics",
          items: [
            {
              question: "What is the standard deduction?",
              answer:
                "For 2024 most single filers receive a $14,600 standard deduction that reduces taxable income; the demo explains how it applies to your scenario.",
            },
            {
              question: "How do EITC and CTC work?",
              answer:
                "The Earned Income Tax Credit and Child Tax Credit depend on income, filing status, and dependents. We surface eligibility prompts and outline next steps if you qualify.",
            },
            {
              question: "W-2 vs. 1099 — what’s the difference?",
              answer:
                "W-2 income includes tax withholding from employers while 1099-NEC shows untaxed gig income. Our wizard maps both into Schedule C and SE when needed.",
            },
          ],
        },
        {
          title: "Filing experience",
          items: [
            {
              question: "Mileage vs actual expenses?",
              answer:
                "You can compare the IRS standard mileage rate with actual expenses like fuel, insurance, and maintenance. The demo highlights whichever yields a larger deduction.",
            },
            {
              question: "Refund timeline?",
              answer:
                "IRS refunds typically arrive within 21 days after acceptance; California refunds can take 2–4 weeks. We show expected timing once you pick a plan.",
            },
            {
              question: "Is my data safe?",
              answer:
                "Yes. Demo uploads stay on your device, identifiers are masked, and you can delete everything instantly or limit retention to 7, 30, or 90 days.",
            },
          ],
        },
      ],
    },
    accessibility: {
      title: "Accessibility statement",
      intro: "TaxHelp AI is committed to inclusive experiences that work for keyboard, screen reader, and reduced-motion users.",
      statement:
        "We design and test the marketing site and guided demo against WCAG 2.1 AA. The experience should remain usable even under slow connections or when animations are disabled.",
      sections: [
        {
          title: "What’s supported today",
          items: [
            "Keyboard navigation with a skip link and focus indicators across every interactive element.",
            "ARIA labels for navigation, progress indicators, and consent controls inside the demo.",
            "Color contrast of at least 4.5:1 for text and interactive components in both light and dark themes.",
          ],
        },
        {
          title: "Assistive technology compatibility",
          items: [
            "Screen reader announcements for step changes in the 10-step demo wizard.",
            "Form inputs include descriptive labels and error messaging tied to their fields.",
            "Analytics scripts only load after consent, ensuring reduced noise for assistive tech users who opt out.",
          ],
        },
        {
          title: "Ongoing improvements",
          items: [
            "Testing with VoiceOver, TalkBack, and NVDA at least once per release.",
            "Documenting known gaps in the changelog when they arise and tracking fixes on our roadmap.",
            "Expanding translations beyond English and Spanish with culturally aware examples.",
          ],
        },
      ],
      contact: {
        title: "Need help?",
        emailLabel: "Email accessibility@taxhelp.ai",
        phoneLabel: "Call +1 (628) 272-4200",
        response: "We acknowledge requests within one business day and aim to resolve confirmed issues within ten days.",
      },
      feedback: "If something isn’t accessible, let us know and we’ll prioritize a fix.",
    },
    changelog: {
      title: "Changelog",
      intro: "Track the product improvements leading up to production launch.",
      entries: [
        {
          version: "v0.6.0",
          date: "July 15, 2024",
          highlights: [
            "Launched end-to-end checkout with Stripe session creation and status polling APIs.",
            "Added receipt and cancellation pages plus localized FAQ and accessibility content.",
          ],
          notes: [
            "Security headers moved to middleware to better isolate webhook raw body handling.",
            "Prepared system status dashboard for monitoring staging and production environments.",
          ],
        },
        {
          version: "v0.5.1",
          date: "July 8, 2024",
          highlights: [
            "Introduced consent-gated exports with retention timers and delete-now actions.",
            "Localized the entire marketing site and demo in English and Spanish.",
          ],
          notes: [
            "Documented tax form mappings and validation rules in /docs/tax-mapping.md.",
            "Added analytics opt-in banner honoring Do Not Track preferences.",
          ],
        },
        {
          version: "v0.5.0",
          date: "July 1, 2024",
          highlights: [
            "Migrated to Next.js App Router with SEO metadata, sitemap, and robots coverage.",
            "Delivered the 10-step demo wizard with mocked OCR and compute APIs.",
          ],
          notes: [
            "Set up pricing, security, contact, and legal pages with compliance-focused copy.",
            "Established documentation for roadmap, security, and deployment checklists.",
          ],
        },
      ],
      highlightLabel: "Highlights",
      notesLabel: "Notes",
      contactCta: "Questions about a change? Email product@taxhelp.ai.",
    },
    checkout: {
      title: "Secure checkout",
      subtitle: "Choose a plan, confirm consent, and complete payment through Stripe.",
      stepsTitle: "How checkout works",
      steps: [
        "Select the plan that matches your filing scenario.",
        "Review consent, retention, and pricing details.",
        "Pay securely via Stripe using cards or wallets.",
        "Return to TaxHelp AI for your receipt and onboarding steps.",
      ],
      plansTitle: "Plans",
      plans: [
        {
          id: "basic",
          name: "Basic",
          description: "Best for single W-2 earners or simple 1099 filings.",
          price: "$9.99",
          amountCents: 999,
          bestFor: "Single W-2 / simple 1099",
          features: [
            "Guided interview",
            "PDF draft download",
            "Standard deduction explainers",
          ],
        },
        {
          id: "standard",
          name: "Standard",
          description: "Unlock deduction suggestions and gig income workflows.",
          price: "$14.99",
          amountCents: 1499,
          bestFor: "1099 + deductions",
          features: [
            "All Basic features",
            "Schedule C mileage vs. actual comparisons",
            "Benefit eligibility checklist",
          ],
        },
        {
          id: "family",
          name: "Family (Joint)",
          description: "Joint filing with child tax credit guidance and dependents.",
          price: "$24.99",
          amountCents: 2499,
          bestFor: "Married + dependents",
          features: [
            "All Standard features",
            "Child Tax Credit walkthrough",
            "Shared document management",
          ],
        },
      ],
      cta: "Proceed to Stripe",
      legal: [
        "Charges appear as TAXHELPAI on your statement.",
        "Refunds follow Stripe policies; contact support within 14 days if something looks wrong.",
        "Live e-file requires extra consent and ID verification before submission.",
      ],
      supportTitle: "Need billing help?",
      supportDescription: "Email us for invoice copies, tax-deductible receipts, or purchase orders.",
      supportEmail: "billing@taxhelp.ai",
      errorMessage: "We couldn’t start checkout. Please try again in a moment or contact support.",
    },
    checkoutCanceled: {
      title: "Checkout cancelled",
      description: "Your Stripe session was closed before payment completed.",
      suggestions: [
        "Review your plan selection and try again.",
        "Confirm your payment method supports online transactions.",
        "Contact your bank if you see repeated declines.",
      ],
      retry: "Return to checkout",
      contact: "Still stuck? Email billing@taxhelp.ai for assistance.",
    },
    receipt: {
      title: "Order receipt",
      subtitle: "Thanks for choosing TaxHelp AI. Keep this page for your records.",
      summaryTitle: "Order summary",
      details: {
        order: "Order ID",
        plan: "Plan",
        status: "Payment status",
        total: "Total",
        email: "Receipt sent to",
      },
      downloadsTitle: "Demo downloads",
      downloads: {
        pdf: "Download PDF (demo)",
        json: "Download JSON (demo)",
      },
      actions: {
        dashboard: "Start a new filing",
        status: "Check system status",
      },
      help: "Need help? Forward this receipt to billing@taxhelp.ai and we’ll assist.",
    },
    status: {
      title: "System status",
      subtitle: "Live view of TaxHelp AI services across environments.",
      lastUpdated: "Last updated",
      services: [
        {
          name: "Marketing site",
          status: "operational",
          description: "Next.js marketing shell, demo wizard, and localization services.",
        },
        {
          name: "Demo APIs",
          status: "operational",
          description: "Mock OCR and compute endpoints that power the guided flow.",
        },
        {
          name: "Checkout API",
          status: "operational",
          description: "Stripe session creation, webhook handling, and status polling.",
        },
        {
          name: "AI explanations",
          status: "operational",
          description: "Server-side OpenRouter proxy for education-only responses.",
        },
      ],
      healthy: "Operational",
      degraded: "Degraded",
      down: "Outage",
      contact: "Notice an issue? Email status@taxhelp.ai.",
    },
    errors: {
      notFoundTitle: "Page not found",
      notFoundDescription: "We couldn’t locate that page. It may have moved or been renamed.",
      notFoundCta: "Return home",
      serverTitle: "Something went wrong",
      serverDescription: "An unexpected error occurred. Please retry or contact support if it continues.",
      serverCta: "Reload page",
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        updated: "Effective: July 1, 2024",
        intro: "This policy explains how TaxHelp AI treats information across the demo experience and upcoming filing products.",
        sections: [
          {
            title: "Demo data handling",
            items: [
              "The demo keeps W-2, 1099, and receipt uploads in your browser; we don’t permanently store PII.",
              "Sensitive identifiers are masked before display and redacted in transient logs.",
              "We never sell or rent your information."
            ]
          },
          {
            title: "Consent & retention",
            items: [
              "Exports require explicit consent plus a 7, 30, or 90 day retention selection.",
              "Delete now clears demo data instantly if you change your mind.",
              "Future e-file products will present separate consent and storage terms before transmission."
            ]
          },
          {
            title: "How we use information",
            items: [
              "Respond to support requests and deliver the demo experience you initiate.",
              "Improve tax rule coverage for upcoming filing seasons.",
              "Send transactional emails you ask for, such as receipts or status alerts."
            ]
          },
          {
            title: "Processors",
            items: [
              "Vercel hosts the website and serverless functions in the United States.",
              "OpenRouter supplies AI explanations with PII stripped at the edge.",
              "Stripe processes payments and stores card data when you check out.",
              "SendGrid powers transactional emails like receipts and support replies."
            ]
          },
          {
            title: "Contact & rights",
            items: [
              "Email privacy@taxhelp.ai to request access, correction, or deletion.",
              "California residents can exercise CPRA rights, including limiting sensitive data use.",
              "We respond within 30 days and document outcomes for regulators."
            ]
          }
        ]
      },
      terms: {
        title: "Terms of Service",
        updated: "Effective: July 1, 2024",
        intro: "These terms govern your use of TaxHelp AI websites, demos, and filing products.",
        sections: [
          {
            title: "Demo scope",
            items: [
              "The demo is informational and does not replace professional tax advice.",
              "Draft outputs rely on mocked data until live filing launches.",
              "Electronic filing will require additional consent and identity verification."
            ]
          },
          {
            title: "Your responsibilities",
            items: [
              "You remain responsible for the accuracy of information you provide.",
              "Until e-file is live you must submit final tax returns yourself.",
              "Use refund estimates and benefit suggestions as guidance only."
            ]
          },
          {
            title: "Acceptable use",
            items: [
              "Do not upload unmasked PII or abusive content to the demo.",
              "Avoid scraping, reverse engineering, or misusing our APIs.",
              "We may suspend access for violations or suspected fraud."
            ]
          },
          {
            title: "Pricing & changes",
            items: [
              "Pricing may change; we update the pricing page before new rates take effect.",
              "Discounts such as student or retiree offers may require eligibility proof.",
              "We can update features, availability, and these terms with notice."
            ]
          },
          {
            title: "Contact",
            items: [
              "Email legal@taxhelp.ai for questions about these terms.",
              "Postal: TaxHelp AI, 1355 Market Street, Suite 900, San Francisco, CA 94103"
            ]
          }
        ]
      }
    }
  },
  es: {
    common: {
      brandName: "TaxHelp AI",
      nav: {
        demo: "Demostración",
        pricing: "Precios",
        security: "Seguridad",
        contact: "Contacto",
        privacy: "Privacidad",
        faq: "Preguntas frecuentes",
        accessibility: "Accesibilidad",
        changelog: "Cambios",
        checkout: "Checkout",
        status: "Estado"
      },
      buttons: {
        start: "Comenzar la declaración",
        demo: "Probar demo gratuita",
        contact: "Habla con nuestro equipo",
        explorePricing: "Ver precios"
      },
      footer: {
        tagline: "Declaración de impuestos en EE. UU. inteligente, sencilla y accesible para repartidores, estudiantes y jubilados.",
        hosting: "Alojado en Vercel · Infraestructura centrada en el consentimiento",
        ctaTitle: "Declarar impuestos, por fin sencillo.",
        ctaSubtitle: "Elige un plan o recorre la demo: tus datos se quedan en tu dispositivo.",
        ctaPrimary: "Comenzar ahora",
        ctaSecondary: "Probar demo gratuita",
        rights: "Todos los derechos reservados."
      },
      languages: {
        en: "Inglés",
        es: "Español",
        detected: "Idioma del navegador detectado: {language}."
      }
    },
    home: {
      heroBadge: "Diseñado para contribuyentes en EE. UU.",
      heroTitle: "TaxHelp AI — Declaración inteligente, sencilla y accesible (EE. UU.)",
      heroSubtitle: "Presenta tus impuestos en minutos con guía de IA 24/7. $9.99–$24.99, sin cargos ocultos.",
      primaryCta: "Comenzar la declaración",
      secondaryCta: "Probar demo gratuita",
      errorTitle: "No pudimos cargar los últimos datos.",
      errorDescription: "Verifica tu conexión e inténtalo de nuevo; tu progreso se guarda de forma local.",
      errorAction: "Reintentar",
      socialStrip: "Perfecto para repartidores, estudiantes, jubilados, personas inmigrantes y familias de bajos ingresos.",
      mobileCtaTitle: "¿Listo para terminar tu declaración?",
      mobileCtaSubtitle: "Retoma cuando quieras: tus archivos permanecen en este dispositivo.",
      mobileCtaPrimary: "Comenzar la declaración",
      mobileCtaSecondary: "Ver demo",
      personasTitle: "Cómo ayuda a cada perfil",
      personas: [
        {
          title: "Repartidores y freelancers",
          description: "Sincroniza ingresos W-2 y 1099, calcula millas automáticamente y captura deducciones del Anexo C."
        },
        {
          title: "Estudiantes",
          description: "Sube formularios 1098-T, becas e ingresos de medio tiempo para obtener créditos educativos al instante."
        },
        {
          title: "Jubilados",
          description: "Combina Seguro Social, pensiones y deducciones médicas con verificaciones automáticas de tributación."
        }
      ],
      valueHeading: "Por qué elegir TaxHelp AI",
      valueCards: [
        {
          title: "Ahorra más",
          description: "Planes fijos de $9.99–$24.99, hasta 10–20× más económicos que preparadores tradicionales."
        },
        {
          title: "Ayuda 24/7",
          description: "La guía con IA está disponible siempre, ya sea de madrugada o entre entregas."
        },
        {
          title: "Multilenguaje",
          description: "Empieza en inglés, cambia a español y conoce los próximos idiomas compatibles."
        },
        {
          title: "Privacidad primero",
          description: "Cargas cifradas, recibos de consentimiento y control de retención en tu dispositivo."
        }
      ],
      demoGalleryTitle: "Previsualiza la demo de TaxHelp AI",
      demoGallerySubtitle: "Explora el Q&A localizado, los controles de retención y el bloqueo de exportación antes de conectar datos reales.",
      demoGalleryEn: "Flujo en inglés con exportaciones controladas por consentimiento y explicaciones de reembolso.",
      demoGalleryEs: "Experiencia en español con preguntas adaptativas y control de retención local.",
      stepsTitle: "Cómo funciona TaxHelp AI",
      stepsSubtitle: "De preguntas rápidas a declaraciones completas.",
      miniSteps: ["Responder", "La IA completa formularios", "Revisar y descargar"],
      mappingTitle: "Reglas reales incorporadas",
      mappingSubtitle: "Las APIs simuladas siguen los mismos esquemas que usa nuestro motor fiscal: W-2 y 1099 se transforman en el Formulario 1040, Anexos C/SE y CA 540.",
      mappingBullets: [
        "Mapeo de casillas W-2 a líneas del Formulario 1040 con validación",
        "Conciliación de ingresos gig con categorías del Anexo C",
        "Ajustes para California incluyendo CalEITC y límites de SDI"
      ]
    },
    demo: {
      heroBadge: "Servicios simulados · Esquemas de producción",
      heroTitle: "Demo de 10 pasos",
      heroSubtitle: "Recorre todo el flujo desde la detección de idioma hasta los comprobantes de consentimiento, sin PII.",
      progressTitle: "Progreso de la demo",
      progressSubtitle: "Sigue cada etapa del orquestador.",
      completionTitle: "Demo completada",
      completionSubtitle: "Así será cuando esté en producción.",
      stepTitles: {
        language: "Idioma y tono",
        upload: "Subir documentos",
        ocr: "OCR y clasificación",
        extract: "Extracción y validación",
        qa: "Preguntas adaptativas",
        benefits: "Impuestos y beneficios",
        draft: "Generador de borradores",
        summary: "Resumen y exportación",
        consent: "Consentimiento y retención",
        complete: "Cierre"
      },
      stepDescriptions: {
        language: "Detectamos el idioma y permitimos cambiarlo al instante para soporte multilingüe.",
        upload: "Recopila W-2, 1099 y recibos con cifrado en el dispositivo.",
        ocr: "Visualiza preprocesamiento, OCR y clasificación en tiempo real.",
        extract: "Enmascara SSN/EIN mientras verificas cálculos con reglas del IRS.",
        qa: "Guía con preguntas adaptativas sobre estado civil, dependientes y trabajo gig.",
        benefits: "Resume impuestos federales/estatales y programas de apoyo.",
        draft: "Previsualiza formularios clave: 1040, Anexos C/SE y CA 540.",
        summary: "Destaca factores del reembolso y exportaciones controladas antes del e-file.",
        consent: "Captura consentimiento, retención y opciones de borrado.",
        complete: "Comparte los próximos pasos antes de ir a precios o checkout."
      },
      language: {
        detection: "Detectamos inglés (EE. UU.). Cambiar a:",
        toggleLabel: "Cambiar idioma",
        switches: ["Español", "العربية", "Русский", "हिन्दी"]
      },
      upload: {
        description: "W-2, 1099, recibos — PDF/JPG/PNG hasta 10 MB.",
        accepted: "Aceptado: PDF, JPG, PNG · Máximo 10 MB",
        encryptedBadge: "Cifrado (demo)",
        maskedBadge: "Vista enmascarada",
        browse: "Seleccionar archivos",
        remove: "Quitar",
        staged: "{count} documentos listos para procesar (solo demo).",
        helper: "Almacenamiento cifrado en tu navegador con vistas enmascaradas; restaura cuando quieras.",
        errors: {
          size: "{name} supera el límite de 10 MB. Comprime o carga un archivo más pequeño.",
          type: "{name} no es compatible. Usa PDF, JPG o PNG."
        }
      },
      ocr: {
        description: "Cada documento pasa por preprocesamiento, OCR y clasificación con puntuaciones de confianza.",
        stages: ["Preprocesar", "OCR", "Clasificar"],
        chips: ["W-2", "1099", "Recibo"],
        manualEntry: "¿No detectamos nada? Avanza y captura los datos manualmente.",
        skip: "Ir a captura manual",
        error: "Hubo un problema al cargar el OCR simulado.",
        retry: "Reintentar"
      },
      extract: {
        description: "Validado con esquemas del IRS mientras se enmascaran los identificadores antes de la revisión.",
        masking: "Los SSN/EIN se muestran como ***-**-6789 en la vista del revisor.",
        chips: ["SS ≈ 6.2% de la casilla 3", "Medicare ≈ 1.45% de la casilla 5"]
      },
      qa: {
        description: "Las preguntas se adaptan al recorrido: estado civil, dependientes, deducciones gig y créditos de California.",
        prompts: [
          "¿Qué estado civil se ajusta a tu hogar?",
          "¿Registras millas o gastos reales para gig?",
          "¿Qué porcentaje de tu factura de teléfono usas para gig?",
          "¿Tienes peajes o estacionamientos para deducir?",
          "¿Usas parte de tu casa como oficina?",
          "¿Dependientes en California para CalEITC/YCTC?"
        ],
        loading: "Cargando respuesta...",
        empty: "No hay respuesta disponible."
      },
      benefits: {
        description: "Tarjetas con resúmenes federales y de California más beneficios para explorar.",
        federalTitle: "Federal",
        stateTitle: "California",
        benefitsTitle: "Beneficios para explorar",
        refundLabel: "Reembolso",
        likely: "Probable",
        review: "Revisar",
        benefits: ["CalEITC", "SNAP", "Medicaid", "Asistencia de vivienda"],
        placeholder: "Verás los valores cuando responda el servicio de cálculo."
      },
      draft: {
        description: "Activa los formularios que quieres revisar antes de exportar.",
        pills: ["1040", "Anexo C", "Anexo SE", "CA 540"],
        sampleNote: "Nota de muestra: Los cálculos replican las reglas de producción para la temporada 2024."
      },
      summary: {
        description: "Los archivos descargables mantienen alineados a los equipos mientras se finaliza el e-file.",
        downloads: ["Descargar PDF (demo)", "Descargar JSON (demo)", "Paquete e-file (próximamente)"],
        comingSoon: "El envío e-file se lanzará con consentimiento adicional.",
        expiration: "Los enlaces demo expiran en {days} días.",
        refundDrivers: ["+ Deducción estándar", "+ Crédito por trabajo (EITC)", "− Impuesto por trabajo por cuenta propia"],
        retry: "Reintentar",
        error: "El cálculo simulado falló. Vuelve a intentar para refrescar los montos."
      },
      consent: {
        description: "Registra consentimiento, elige retención y solicita borrado inmediato si es necesario.",
        retentionLabel: "Periodo de retención",
        options: ["7 días", "30 días", "90 días"],
        deleteNow: "Eliminar ahora",
        restore: "Restaurar datos de muestra",
        acknowledgement: "Acepto los términos de consentimiento y retención.",
        clearedNotice: "Datos de la demo borrados localmente. Restaura para generar archivos simulados de nuevo.",
        modalTitle: "Confirma consentimiento antes de exportar",
        modalDescription: "Solo generamos {item} después de que aceptes. Nada se guarda cuando borras o cierras la demo.",
        modalCta: "Confirmar y exportar {item}",
        modalCancel: "Cancelar",
        toastSuccess: "Consentimiento guardado. {item} listo (solo demo).",
        toastCleared: "Datos de la demo eliminados de este navegador.",
        toastRestored: "Datos de muestra restaurados. Actualizando resultados.",
        exportDisabled: "Los datos demo están borrados; restáuralos para volver a exportar.",
        deleteConfirm: "Esta acción borra al instante los archivos y resultados simulados de este navegador. Puedes restaurar los datos de muestra cuando quieras."
      },
      complete: {
        description: "Todo listo. Ahora elige un plan para presentar.",
        checklist: [
          "El importador envía borradores al preparador o cola de e-file.",
          "Los contribuyentes reciben recordatorios con comprobantes de consentimiento.",
          "Soporte disponible por chat o WhatsApp 24/7."
        ],
        ctaPricing: "Ver precios",
        ctaCheckout: "Ir al checkout"
      }
    },
    pricing: {
      heroTitle: "Precios simples para cada contribuyente",
      heroSubtitle: "Elige un plan fijo que se adapte a tu situación. Sin cargos ocultos.",
      note: "Descuentos para estudiantes y jubilados. Pago único por declaración.",
      choosePlan: "Elegir plan",
      tableHeadings: ["Plan", "Precio", "Ideal para", "Incluye", "Acción"],
      plans: [
        {
          name: "Básico",
          price: "$9.99",
          bestFor: "Un W-2 / 1099 sencillo",
          includes: ["Guía paso a paso", "Descarga en PDF"],
          sku: "filing_basic_2024_us"
        },
        {
          name: "Estándar",
          price: "$14.99",
          bestFor: "1099 + deducciones",
          includes: ["Sugerencias con IA", "Descarga en PDF", "Lista de deducciones"],
          sku: "filing_standard_2024_us"
        },
        {
          name: "Familiar (Conjunta)",
          price: "$24.99",
          bestFor: "Matrimonios con dependientes",
          includes: ["Guía CTC", "Todas las funciones Estándar", "Soporte para revisión conjunta"],
          sku: "filing_family_2024_us"
        }
      ]
    },
    security: {
      heroTitle: "Seguridad y privacidad",
      heroSubtitle: "Diseño centrado en el consentimiento con retención transparente y cifrado en cada paso.",
      bullets: [
        "Sin almacenamiento permanente en el entorno de demo.",
        "Cifrado en tránsito con TLS 1.2+.",
        "SSN/EIN enmascarados en toda la interfaz.",
        "Controles de consentimiento y retención por 7, 30 o 90 días.",
        "Eliminar bajo demanda borra los datos locales de inmediato.",
        "Alineación con e-file del IRS próximamente con consentimiento extra."
      ],
      roadmapTitle: "Lo que entregamos",
      roadmapDescription: "Controles listos para SOC 2, registros de auditoría y evidencia específica por jurisdicción.",
      ctaLabel: "Leer Política de Privacidad"
    },
    contact: {
      heroTitle: "Contacto TaxHelp AI",
      heroSubtitle: "Respondemos en 1–2 días hábiles.",
      supportEmail: "support@taxhelp.ai",
      partnersEmail: "partners@taxhelp.ai",
      telegramLabel: "Únete en Telegram",
      whatsappLabel: "Escríbenos por WhatsApp",
      formTitle: "Envíanos un mensaje",
      formDescription: "Cuéntanos qué necesitas y te responderemos pronto.",
      topicPlaceholder: "Selecciona un tema",
      topics: [
        { label: "Soporte", value: "support" },
        { label: "Inversionistas", value: "investor" },
        { label: "Alianzas", value: "partnership" }
      ],
      labels: {
        name: "Nombre",
        email: "Correo",
        topic: "Tema",
        message: "Mensaje",
        consent: "Acepto el tratamiento de datos descrito en la Política de Privacidad."
      },
      submit: "Enviar mensaje",
      success: "¡Gracias! Te contactaremos pronto.",
      toastSuccess: "Respondemos en 1–2 días hábiles.",
      errors: {
        topic: "Selecciona un tema."
      }
    },
    faq: {
      title: "Preguntas frecuentes",
      intro: "Respuestas a las dudas más comunes sobre la demo, el checkout y la preparación para cumplimiento.",
      categories: [
        {
          title: "Fundamentos fiscales",
          items: [
            {
              question: "¿Qué es la deducción estándar?",
              answer:
                "Para 2024 la mayoría de contribuyentes solteros recibe una deducción estándar de $14,600 que reduce el ingreso gravable; la demo explica cómo aplica en tu caso.",
            },
            {
              question: "¿Cómo funcionan el EITC y el CTC?",
              answer:
                "Los créditos por ingreso del trabajo y por hijos dependen de tus ingresos, estado civil y dependientes. Mostramos avisos de elegibilidad y los pasos siguientes si calificas.",
            },
            {
              question: "¿Cuál es la diferencia entre W-2 y 1099?",
              answer:
                "El W-2 incluye retenciones de impuestos del empleador mientras que el 1099-NEC refleja ingresos gig sin retenciones. El asistente integra ambos en los formularios Schedule C y SE cuando corresponde.",
            },
          ],
        },
        {
          title: "Experiencia de declaración",
          items: [
            {
              question: "¿Millas estándar o gastos reales?",
              answer:
                "Compara la tarifa estándar por milla del IRS con gastos reales como gasolina, seguro y mantenimiento. La demo resalta la opción con mayor deducción.",
            },
            {
              question: "¿Cuándo llega mi reembolso?",
              answer:
                "El IRS suele enviar reembolsos dentro de 21 días tras la aceptación; en California puede tomar de 2 a 4 semanas. Mostramos los tiempos estimados cuando eliges un plan.",
            },
            {
              question: "¿Mis datos están seguros?",
              answer:
                "Sí. Los archivos de la demo permanecen en tu dispositivo, los identificadores se enmascaran y puedes borrar todo al instante o limitar la retención a 7, 30 o 90 días.",
            },
          ],
        },
      ],
    },
    accessibility: {
      title: "Declaración de accesibilidad",
      intro: "TaxHelp AI se compromete con experiencias inclusivas para usuarios de teclado, lectores de pantalla y personas con sensibilidad al movimiento.",
      statement:
        "Diseñamos y probamos el sitio y la demo con base en WCAG 2.1 AA. La experiencia se mantiene utilizable incluso en conexiones lentas o con animaciones desactivadas.",
      sections: [
        {
          title: "Lo que ya está disponible",
          items: [
            "Navegación con teclado con enlace para saltar al contenido e indicadores de foco claros.",
            "Etiquetas ARIA en navegación, indicadores de progreso y controles de consentimiento dentro de la demo.",
            "Contraste de al menos 4.5:1 para texto y elementos interactivos en temas claro y oscuro.",
          ],
        },
        {
          title: "Compatibilidad con tecnologías de asistencia",
          items: [
            "Anuncios para lectores de pantalla al cambiar de paso en el flujo de 10 etapas.",
            "Campos con etiquetas descriptivas y mensajes de error vinculados a cada input.",
            "Los scripts de analítica solo se cargan tras el consentimiento, reduciendo ruido para quienes optan por no usarlos.",
          ],
        },
        {
          title: "Mejoras continuas",
          items: [
            "Pruebas periódicas con VoiceOver, TalkBack y NVDA en cada versión.",
            "Documentamos las brechas conocidas en el registro de cambios y planificamos su corrección.",
            "Ampliamos traducciones más allá de inglés y español con ejemplos culturalmente relevantes.",
          ],
        },
      ],
      contact: {
        title: "¿Necesitas ayuda?",
        emailLabel: "Escribe a accessibility@taxhelp.ai",
        phoneLabel: "Llámanos al +1 (628) 272-4200",
        response: "Confirmamos la recepción en un día hábil y resolvemos los problemas confirmados en un máximo de diez días.",
      },
      feedback: "Si encuentras algo inaccesible, avísanos y le daremos prioridad.",
    },
    changelog: {
      title: "Registro de cambios",
      intro: "Seguimiento de las mejoras rumbo al lanzamiento en producción.",
      entries: [
        {
          version: "v0.6.0",
          date: "15 de julio de 2024",
          highlights: [
            "Checkout de punta a punta con creación de sesiones de Stripe y APIs de estado.",
            "Nuevas páginas de recibo y cancelación más contenidos de FAQ y accesibilidad localizados.",
          ],
          notes: [
            "Los encabezados de seguridad pasan a middleware para aislar el manejo del cuerpo crudo del webhook.",
            "Se preparó el panel de estado para monitorear staging y producción.",
          ],
        },
        {
          version: "v0.5.1",
          date: "8 de julio de 2024",
          highlights: [
            "Exportaciones protegidas por consentimiento con temporizadores de retención y acción de borrado inmediato.",
            "Localización completa del sitio y la demo en inglés y español.",
          ],
          notes: [
            "Documentamos los mapeos fiscales en /docs/tax-mapping.md.",
            "Se añadió el banner de analítica respetando Do Not Track.",
          ],
        },
        {
          version: "v0.5.0",
          date: "1 de julio de 2024",
          highlights: [
            "Migración a Next.js App Router con metadatos SEO, sitemap y robots actualizados.",
            "Entrega del flujo demo de 10 pasos con APIs simuladas de OCR y cálculo.",
          ],
          notes: [
            "Se configuraron páginas de precios, seguridad, contacto y legales centradas en cumplimiento.",
            "Se estableció la documentación de roadmap, seguridad y checklist de despliegue.",
          ],
        },
      ],
      highlightLabel: "Destacados",
      notesLabel: "Notas",
      contactCta: "¿Dudas sobre algún cambio? Escribe a product@taxhelp.ai.",
    },
    checkout: {
      title: "Checkout seguro",
      subtitle: "Elige un plan, confirma el consentimiento y finaliza el pago mediante Stripe.",
      stepsTitle: "Cómo funciona el checkout",
      steps: [
        "Selecciona el plan que mejor describe tu situación.",
        "Revisa detalles de consentimiento, retención y precio.",
        "Paga de forma segura con Stripe usando tarjeta o billetera digital.",
        "Regresa a TaxHelp AI para ver tu recibo y siguientes pasos.",
      ],
      plansTitle: "Planes",
      plans: [
        {
          id: "basic",
          name: "Básico",
          description: "Ideal para ingresos W-2 individuales o 1099 sencillos.",
          price: "$9.99",
          amountCents: 999,
          bestFor: "Un W-2 / 1099 sencillo",
          features: [
            "Entrevista guiada",
            "Descarga de borrador en PDF",
            "Explicaciones de deducción estándar",
          ],
        },
        {
          id: "standard",
          name: "Estándar",
          description: "Incluye sugerencias de deducciones y flujos para ingresos gig.",
          price: "$14.99",
          amountCents: 1499,
          bestFor: "1099 + deducciones",
          features: [
            "Todas las funciones Básico",
            "Comparación millas vs. gastos reales",
            "Lista de elegibilidad de beneficios",
          ],
        },
        {
          id: "family",
          name: "Familiar (Conjunta)",
          description: "Declaración conjunta con guía para créditos por hijos y dependientes.",
          price: "$24.99",
          amountCents: 2499,
          bestFor: "Matrimonios con dependientes",
          features: [
            "Todas las funciones Estándar",
            "Acompañamiento para el Crédito Tributario por Hijos",
            "Gestión compartida de documentos",
          ],
        },
      ],
      cta: "Ir a Stripe",
      legal: [
        "El cargo aparecerá como TAXHELPAI en tu estado de cuenta.",
        "Los reembolsos siguen las políticas de Stripe; contáctanos dentro de 14 días si algo luce incorrecto.",
        "El e-file en vivo requerirá consentimiento adicional y verificación de identidad antes de enviar.",
      ],
      supportTitle: "¿Necesitas ayuda con el pago?",
      supportDescription: "Escríbenos para copias de factura, recibos deducibles o compras corporativas.",
      supportEmail: "billing@taxhelp.ai",
      errorMessage: "No pudimos iniciar el checkout. Inténtalo nuevamente o contacta a soporte.",
    },
    checkoutCanceled: {
      title: "Checkout cancelado",
      description: "Tu sesión de Stripe se cerró antes de completar el pago.",
      suggestions: [
        "Revisa el plan seleccionado e inténtalo otra vez.",
        "Confirma que tu método de pago permite compras en línea.",
        "Contacta a tu banco si observas rechazos repetidos.",
      ],
      retry: "Volver al checkout",
      contact: "¿Sigues con problemas? Escribe a billing@taxhelp.ai para recibir ayuda.",
    },
    receipt: {
      title: "Recibo de compra",
      subtitle: "Gracias por elegir TaxHelp AI. Conserva esta página para tus registros.",
      summaryTitle: "Resumen del pedido",
      details: {
        order: "ID de pedido",
        plan: "Plan",
        status: "Estado del pago",
        total: "Total",
        email: "Recibo enviado a",
      },
      downloadsTitle: "Descargas de la demo",
      downloads: {
        pdf: "Descargar PDF (demo)",
        json: "Descargar JSON (demo)",
      },
      actions: {
        dashboard: "Comenzar una nueva declaración",
        status: "Ver estado del sistema",
      },
      help: "¿Necesitas ayuda? Reenvía este recibo a billing@taxhelp.ai y te asistiremos.",
    },
    status: {
      title: "Estado del sistema",
      subtitle: "Vista en tiempo real de los servicios de TaxHelp AI.",
      lastUpdated: "Última actualización",
      services: [
        {
          name: "Sitio de marketing",
          status: "operational",
          description: "Shell de Next.js, asistente demo y servicios de localización.",
        },
        {
          name: "APIs de demo",
          status: "operational",
          description: "Endpoints simulados de OCR y cálculo que alimentan el flujo guiado.",
        },
        {
          name: "API de checkout",
          status: "operational",
          description: "Creación de sesiones de Stripe, webhooks y consulta de estado.",
        },
        {
          name: "Explicaciones con IA",
          status: "operational",
          description: "Proxy de OpenRouter en el servidor para respuestas educativas sin PII.",
        },
      ],
      healthy: "Operativo",
      degraded: "Degradado",
      down: "Caído",
      contact: "Si notas algún problema, escribe a status@taxhelp.ai.",
    },
    errors: {
      notFoundTitle: "Página no encontrada",
      notFoundDescription: "No pudimos encontrar esa página. Es posible que se haya movido o cambiado de nombre.",
      notFoundCta: "Volver al inicio",
      serverTitle: "Ocurrió un problema",
      serverDescription: "Se produjo un error inesperado. Intenta nuevamente o contacta a soporte si persiste.",
      serverCta: "Recargar página",
    },
    legal: {
      privacy: {
        title: "Política de Privacidad",
        updated: "Vigente desde: 1 de julio de 2024",
        intro: "Esta política detalla cómo TaxHelp AI trata la información en la demo y en los productos de declaración que lanzaremos.",
        sections: [
          {
            title: "Gestión de datos de la demo",
            items: [
              "La demo mantiene los W-2, 1099 y recibos en tu navegador; no almacenamos PII de forma permanente.",
              "Los identificadores sensibles se enmascaran antes de mostrarse y se redactan en registros temporales.",
              "Nunca vendemos ni alquilamos tu información."
            ]
          },
          {
            title: "Consentimiento y retención",
            items: [
              "La exportación exige tu consentimiento explícito y elegir 7, 30 o 90 días de retención.",
              "Eliminar ahora borra los datos de la demo al instante si cambias de opinión.",
              "Los productos de e-file presentarán términos y consentimientos separados antes de transmitir datos."
            ]
          },
          {
            title: "Cómo usamos la información",
            items: [
              "Responder solicitudes de soporte y entregar la experiencia que solicitas.",
              "Mejorar la cobertura de reglas fiscales para próximas temporadas.",
              "Enviar correos transaccionales que pidas, como recibos o avisos de estado."
            ]
          },
          {
            title: "Procesadores",
            items: [
              "Vercel aloja el sitio y las funciones serverless en Estados Unidos.",
              "OpenRouter provee explicaciones con IA eliminando PII en el edge.",
              "Stripe procesa pagos y resguarda datos de tarjeta cuando realizas el checkout.",
              "SendGrid envía correos transaccionales como recibos y respuestas de soporte."
            ]
          },
          {
            title: "Contacto y derechos",
            items: [
              "Escribe a privacy@taxhelp.ai para solicitar acceso, corrección o eliminación.",
              "Los residentes de California pueden ejercer derechos CPRA y limitar el uso de datos sensibles.",
              "Respondemos en un máximo de 30 días y documentamos los resultados para las autoridades."
            ]
          }
        ]
      },
      terms: {
        title: "Términos del Servicio",
        updated: "Vigente desde: 1 de julio de 2024",
        intro: "Estos términos rigen el uso de los sitios, demos y productos de declaración de TaxHelp AI.",
        sections: [
          {
            title: "Alcance de la demo",
            items: [
              "La demo es informativa y no sustituye el asesoramiento fiscal profesional.",
              "Los borradores se basan en datos simulados hasta que lancemos el filing en vivo.",
              "El e-file requerirá consentimientos e identificación adicionales."
            ]
          },
          {
            title: "Tus responsabilidades",
            items: [
              "Eres responsable de la exactitud de la información que proporciones.",
              "Hasta que el e-file esté activo, debes presentar las declaraciones finales por tu cuenta.",
              "Usa los cálculos de reembolso y beneficios como guía, no como resultado definitivo."
            ]
          },
          {
            title: "Uso aceptable",
            items: [
              "No subas PII sin enmascarar ni contenido abusivo a la demo.",
              "Evita hacer scraping, ingeniería inversa o uso indebido de nuestras APIs.",
              "Podemos suspender el acceso ante violaciones o sospechas de fraude."
            ]
          },
          {
            title: "Precios y cambios",
            items: [
              "Los precios pueden cambiar; actualizaremos la página antes de que entren en vigor.",
              "Los descuentos como estudiante o jubilado pueden requerir comprobantes.",
              "Podemos actualizar funciones, disponibilidad y estos términos con aviso."
            ]
          },
          {
            title: "Contacto",
            items: [
              "Escribe a legal@taxhelp.ai para dudas sobre estos términos.",
              "Dirección: TaxHelp AI, 1355 Market Street, Suite 900, San Francisco, CA 94103"
            ]
          }
        ]
      }
    }
  }
};

export function isLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return value === "en" || value === "es";
}
