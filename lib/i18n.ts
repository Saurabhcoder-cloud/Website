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
    };
    upload: {
      description: string;
      accepted: string;
      encryptedBadge: string;
    };
    ocr: {
      description: string;
      stages: string[];
      chips: string[];
    };
    extract: {
      description: string;
      masking: string;
      chips: string[];
    };
    qa: {
      description: string;
      prompts: string[];
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
    };
    draft: {
      description: string;
      pills: string[];
    };
    summary: {
      description: string;
      downloads: string[];
      comingSoon: string;
      refundDrivers: string[];
    };
    consent: {
      description: string;
      retentionLabel: string;
      options: string[];
      deleteNow: string;
      acknowledgement: string;
    };
    complete: {
      description: string;
      checklist: string[];
    };
  };
  pricing: {
    heroTitle: string;
    heroSubtitle: string;
    tableHeadings: string[];
    plans: {
      name: string;
      price: string;
      bestFor: string;
      includes: string[];
    }[];
  };
  security: {
    heroTitle: string;
    heroSubtitle: string;
    bullets: string[];
    roadmapTitle: string;
    roadmapDescription: string;
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
    labels: {
      name: string;
      email: string;
      topic: string;
      message: string;
      consent: string;
    };
    submit: string;
    success: string;
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
        privacy: "Privacy"
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
        ctaTitle: "Ready for guided filing?",
        ctaSubtitle: "Start your return or explore the interactive demo in minutes.",
        ctaPrimary: "Start Filing Now",
        ctaSecondary: "Run the demo",
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
      heroSubtitle: "24/7 AI guidance. $9.99–$24.99. No hidden fees.",
      primaryCta: "Start Filing Now",
      secondaryCta: "Try Free Demo",
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
          title: "10–20× cheaper",
          description: "Flat $9.99–$24.99 plans keep more in your refund compared to traditional preparers."
        },
        {
          title: "24×7 help",
          description: "AI guidance answers questions instantly with citations for every calculation."
        },
        {
          title: "Multi-language",
          description: "Switch between English and Spanish anytime—more languages coming soon."
        },
        {
          title: "Privacy-first",
          description: "Encrypted uploads, consent receipts, and retention controls you can trust."
        }
      ],
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
        language: "Detect the visitor’s language and let them switch instantly.",
        upload: "Secure upload flow with encryption and file size limits.",
        ocr: "Track preprocessing, OCR, and classification confidence.",
        extract: "Mask identifiers while verifying payroll math.",
        qa: "Guide filers with contextual questions and AI answers.",
        benefits: "Compare credits, refunds, and assistance programs.",
        draft: "Assemble drafts for 1040, Schedule C/SE, and CA 540.",
        summary: "Explain refund drivers and deliver shareable files.",
        consent: "Capture consent and retention preferences per user.",
        complete: "Set expectations for filing and support."
      },
      language: {
        detection: "Detected browser language: {language}.",
        toggleLabel: "Switch language"
      },
      upload: {
        description: "Drag in W-2s, 1099s, or receipts up to 10MB each. Files stay encrypted and never leave your browser in this demo.",
        accepted: "Accepted: PDF, JPG, PNG · Max 10MB",
        encryptedBadge: "Encrypted (demo)"
      },
      ocr: {
        description: "Each document runs through preprocessing, OCR, and classification with live confidence scoring.",
        stages: ["Preprocess", "OCR", "Classify"],
        chips: ["W-2", "1099", "Receipt"]
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
          "What is your ZIP code for state benefits?",
          "Any California dependents for CalEITC/YCTC?"
        ]
      },
      benefits: {
        description: "Instantly preview federal and state outcomes with benefit suggestions.",
        federalTitle: "Federal snapshot",
        stateTitle: "California snapshot",
        benefitsTitle: "Benefits to explore",
        refundLabel: "Refund",
        likely: "Likely",
        review: "Review",
        benefits: ["CalEITC", "SNAP", "Medicaid", "Housing assistance"]
      },
      draft: {
        description: "Toggle the forms you want to review before exporting.",
        pills: ["Form 1040", "Schedule C", "Schedule SE", "CA 540"]
      },
      summary: {
        description: "Downloadable artifacts keep teams aligned while e-file is in development.",
        downloads: ["Download PDF (demo)", "Download JSON (demo)", "E-file bundle (coming soon)"],
        comingSoon: "E-file submission launches with additional consent.",
        expiration: "Demo links expire in {days} days.",
        refundDrivers: [
          "Standard deduction selected—worth $13,850 over itemizing.",
          "Gig mileage deduction increases refund by $1,240.",
          "American Opportunity Credit adds $600 to the total."
        ]
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
        exportDisabled: "Demo data is cleared—restore it to preview exports again."
      },
      complete: {
        description: "Next steps once you connect the live engine.",
        checklist: [
          "Importer sends drafts to preparer or e-file queue.",
          "Filers get reminders with consent receipts attached.",
          "Support available via chat or WhatsApp 24/7."
        ]
      }
    },
    pricing: {
      heroTitle: "Simple pricing for every filer",
      heroSubtitle: "Choose a flat plan that matches your situation. No hidden fees.",
      tableHeadings: ["Plan", "Price", "Best for", "Includes"],
      plans: [
        {
          name: "Basic",
          price: "$9.99",
          bestFor: "Single W-2 / simple 1099",
          includes: ["Step-by-step guidance", "PDF download"]
        },
        {
          name: "Standard",
          price: "$14.99",
          bestFor: "1099 + deductions",
          includes: ["AI suggestions", "PDF download", "Deduction checklist"]
        },
        {
          name: "Family (Joint)",
          price: "$24.99",
          bestFor: "Married + dependents",
          includes: ["CTC guidance", "All Standard features", "Joint review support"]
        }
      ]
    },
    security: {
      heroTitle: "Security & privacy",
      heroSubtitle: "Consent-first design with transparent retention and encryption at every step.",
      bullets: [
        "No permanent storage in the demo environment.",
        "Encryption in transit and masked identifiers on the UI.",
        "Consent & retention controls for 7, 30, or 90 days.",
        "IRS e-file alignment coming soon with extra consent."
      ],
      roadmapTitle: "What we deliver",
      roadmapDescription: "SOC 2-ready controls, audit trails, and jurisdiction-specific evidence on request."
    },
    contact: {
      heroTitle: "Contact TaxHelp AI",
      heroSubtitle: "We reply within one business day.",
      supportEmail: "support@taxhelp.ai",
      partnersEmail: "partners@taxhelp.ai",
      telegramLabel: "Join us on Telegram",
      whatsappLabel: "Message us on WhatsApp",
      formTitle: "Send a note",
      formDescription: "Share what you need and we’ll follow up shortly.",
      labels: {
        name: "Name",
        email: "Email",
        topic: "Topic",
        message: "Message",
        consent: "I agree to the data handling described in the Privacy Policy."
      },
      submit: "Send message",
      success: "Thanks! We’ll get back to you shortly."
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        updated: "Effective: July 1, 2024",
        intro: "This policy explains how TaxHelp AI handles information for our tax filing products and demo experience.",
        sections: [
          {
            title: "Information we collect",
            items: [
              "Contact details you share such as name and email.",
              "Documents you upload in the demo (W-2, 1099, receipts).",
              "Usage analytics that help us keep Lighthouse scores ≥ 90."
            ]
          },
          {
            title: "How we use data",
            items: [
              "Provide guidance, drafts, and benefit summaries.",
              "Validate forms against IRS and California rules.",
              "Answer support requests and improve the product."
            ]
          },
          {
            title: "Retention",
            items: [
              "Demo uploads default to 30 days with 7- and 90-day options.",
              "Consent receipts record who approved retention settings.",
              "Aggregated analytics may be stored for up to 12 months."
            ]
          },
          {
            title: "Consent & control",
            items: [
              "You choose the retention window (7, 30, or 90 days) before export.",
              "Delete-now in the demo clears data immediately from your browser.",
              "We honor Do Not Track by disabling analytics automatically."
            ]
          },
          {
            title: "Deletion & disputes",
            items: [
              "Request deletion at any time via privacy@taxhelp.ai.",
              "We document responses within 30 days and keep audit evidence for regulators.",
              "You may appeal a decision by contacting our Data Protection Officer."
            ]
          },
          {
            title: "Processors",
            items: [
              "Vercel hosts our web infrastructure in the United States.",
              "OpenRouter provides AI responses with PII stripping at the edge.",
              "Google Tag Manager only runs after you opt in to analytics."
            ]
          },
          {
            title: "Your rights",
            items: [
              "Request access, correction, or deletion via privacy@taxhelp.ai.",
              "California residents can exercise CPRA rights including limiting sensitive data.",
              "You may withdraw consent at any time." 
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
            title: "Use of service",
            items: [
              "Demo content is for evaluation only and not tax advice.",
              "You are responsible for accuracy of information provided.",
              "We may update features and availability at any time."
            ]
          },
          {
            title: "Accounts & security",
            items: [
              "Keep login credentials confidential.",
              "Notify us immediately of unauthorized access.",
              "We secure data with encryption in transit and at rest."
            ]
          },
          {
            title: "E-file requirements",
            items: [
              "Electronic filing launches with additional consent dialogs and identity verification.",
              "We will request government ID or KBA checks where IRS rules require it.",
              "Demo data never transmits to the IRS or FTB until you explicitly approve."
            ]
          },
          {
            title: "Liability",
            items: [
              "Service is provided “as is” without warranties.",
              "Our liability is limited to amounts paid for the service.",
              "Some jurisdictions may not allow the above limitations." 
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
        privacy: "Privacidad"
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
        ctaTitle: "¿Listo para presentar con guía?",
        ctaSubtitle: "Comienza tu declaración o explora la demo interactiva en minutos.",
        ctaPrimary: "Comenzar la declaración",
        ctaSecondary: "Ver la demo",
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
      heroSubtitle: "Asistencia con IA 24/7. $9.99–$24.99. Sin cargos ocultos.",
      primaryCta: "Comenzar la declaración",
      secondaryCta: "Probar demo gratuita",
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
          title: "10–20× más económico",
          description: "Planes fijos de $9.99–$24.99 para conservar más de tu reembolso frente a preparadores tradicionales."
        },
        {
          title: "Ayuda 24/7",
          description: "La guía con IA responde al instante con citas para cada cálculo."
        },
        {
          title: "Multiidioma",
          description: "Cambia entre inglés y español en cualquier momento; más idiomas próximamente."
        },
        {
          title: "Privacidad primero",
          description: "Cargas cifradas, comprobantes de consentimiento y controles de retención confiables."
        }
      ],
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
        language: "Detectamos el idioma del visitante y permitimos cambiarlo al instante.",
        upload: "Flujo de carga seguro con cifrado y límites de tamaño.",
        ocr: "Supervisa preprocesamiento, OCR y clasificación con confianza.",
        extract: "Enmascara identificadores mientras verificas los cálculos de nómina.",
        qa: "Guía al contribuyente con preguntas contextuales y respuestas con IA.",
        benefits: "Compara créditos, reembolsos y programas de ayuda.",
        draft: "Arma borradores para 1040, Anexo C/SE y CA 540.",
        summary: "Explica los impulsores del reembolso y comparte archivos.",
        consent: "Captura consentimiento y preferencias de retención por usuario.",
        complete: "Define qué esperar después del envío."
      },
      language: {
        detection: "Idioma del navegador detectado: {language}.",
        toggleLabel: "Cambiar idioma"
      },
      upload: {
        description: "Arrastra W-2, 1099 o recibos de hasta 10 MB cada uno. Los archivos quedan cifrados y no salen de tu navegador en esta demo.",
        accepted: "Aceptado: PDF, JPG, PNG · Máximo 10 MB",
        encryptedBadge: "Cifrado (demo)"
      },
      ocr: {
        description: "Cada documento pasa por preprocesamiento, OCR y clasificación con puntuaciones de confianza.",
        stages: ["Preprocesar", "OCR", "Clasificar"],
        chips: ["W-2", "1099", "Recibo"]
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
          "¿Cuál es tu código postal para beneficios estatales?",
          "¿Dependientes en California para CalEITC/YCTC?"
        ]
      },
      benefits: {
        description: "Obtén al instante resultados federales y estatales con sugerencias de beneficios.",
        federalTitle: "Resumen federal",
        stateTitle: "Resumen de California",
        benefitsTitle: "Beneficios para explorar",
        refundLabel: "Reembolso",
        likely: "Probable",
        review: "Revisar",
        benefits: ["CalEITC", "SNAP", "Medicaid", "Asistencia de vivienda"]
      },
      draft: {
        description: "Activa los formularios que quieres revisar antes de exportar.",
        pills: ["Formulario 1040", "Anexo C", "Anexo SE", "CA 540"]
      },
      summary: {
        description: "Los archivos descargables mantienen alineados a los equipos mientras se finaliza el e-file.",
        downloads: ["Descargar PDF (demo)", "Descargar JSON (demo)", "Paquete e-file (próximamente)"],
        comingSoon: "El envío e-file se lanzará con consentimiento adicional.",
        expiration: "Los enlaces demo expiran en {days} días.",
        refundDrivers: [
          "Se eligió la deducción estándar: vale $13,850 frente a detallar.",
          "La deducción por millas gig aumenta el reembolso en $1,240.",
          "El Crédito American Opportunity suma $600 al total."
        ]
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
        exportDisabled: "Los datos demo están borrados; restáuralos para volver a exportar."
      },
      complete: {
        description: "Siguientes pasos cuando conectes el motor en vivo.",
        checklist: [
          "El importador envía borradores al preparador o cola de e-file.",
          "Los contribuyentes reciben recordatorios con comprobantes de consentimiento.",
          "Soporte disponible por chat o WhatsApp 24/7."
        ]
      }
    },
    pricing: {
      heroTitle: "Precios simples para cada contribuyente",
      heroSubtitle: "Elige un plan fijo que se adapte a tu situación. Sin cargos ocultos.",
      tableHeadings: ["Plan", "Precio", "Ideal para", "Incluye"],
      plans: [
        {
          name: "Básico",
          price: "$9.99",
          bestFor: "Un W-2 / 1099 sencillo",
          includes: ["Guía paso a paso", "Descarga en PDF"]
        },
        {
          name: "Estándar",
          price: "$14.99",
          bestFor: "1099 + deducciones",
          includes: ["Sugerencias con IA", "Descarga en PDF", "Lista de deducciones"]
        },
        {
          name: "Familiar (Conjunta)",
          price: "$24.99",
          bestFor: "Matrimonios con dependientes",
          includes: ["Guía CTC", "Todas las funciones Estándar", "Soporte para revisión conjunta"]
        }
      ]
    },
    security: {
      heroTitle: "Seguridad y privacidad",
      heroSubtitle: "Diseño centrado en el consentimiento con retención transparente y cifrado en cada paso.",
      bullets: [
        "Sin almacenamiento permanente en el entorno de demo.",
        "Cifrado en tránsito e identificadores enmascarados en la interfaz.",
        "Controles de consentimiento y retención por 7, 30 o 90 días.",
        "Alineación con e-file del IRS próximamente con consentimiento extra."
      ],
      roadmapTitle: "Lo que entregamos",
      roadmapDescription: "Controles listos para SOC 2, registros de auditoría y evidencia específica por jurisdicción."
    },
    contact: {
      heroTitle: "Contacto TaxHelp AI",
      heroSubtitle: "Respondemos en un día hábil.",
      supportEmail: "support@taxhelp.ai",
      partnersEmail: "partners@taxhelp.ai",
      telegramLabel: "Únete en Telegram",
      whatsappLabel: "Escríbenos por WhatsApp",
      formTitle: "Envíanos un mensaje",
      formDescription: "Cuéntanos qué necesitas y te responderemos pronto.",
      labels: {
        name: "Nombre",
        email: "Correo",
        topic: "Tema",
        message: "Mensaje",
        consent: "Acepto el tratamiento de datos descrito en la Política de Privacidad."
      },
      submit: "Enviar mensaje",
      success: "¡Gracias! Te contactaremos en breve."
    },
    legal: {
      privacy: {
        title: "Política de Privacidad",
        updated: "Vigente desde: 1 de julio de 2024",
        intro: "Esta política explica cómo TaxHelp AI maneja la información en nuestros productos de declaración y en la demo.",
        sections: [
          {
            title: "Información que recopilamos",
            items: [
              "Datos de contacto que proporcionas como nombre y correo.",
              "Documentos que subes en la demo (W-2, 1099, recibos).",
              "Analítica de uso para mantener puntajes Lighthouse ≥ 90."
            ]
          },
          {
            title: "Cómo usamos los datos",
            items: [
              "Brindar guías, borradores y resúmenes de beneficios.",
              "Validar formularios con reglas del IRS y California.",
              "Atender soporte y mejorar el producto."
            ]
          },
          {
            title: "Retención",
            items: [
              "Las cargas de la demo se guardan 30 días por defecto con opciones de 7 y 90 días.",
              "Los comprobantes de consentimiento registran quién aprobó la retención.",
              "La analítica agregada puede conservarse hasta 12 meses."
            ]
          },
          {
            title: "Consentimiento y control",
            items: [
              "Antes de exportar eliges si conservar 7, 30 o 90 días.",
              "La acción Eliminar ahora borra de inmediato los datos en tu navegador.",
              "Si usas Do Not Track, la analítica se desactiva automáticamente."
            ]
          },
          {
            title: "Eliminación y recursos",
            items: [
              "Puedes solicitar borrado en privacy@taxhelp.ai en cualquier momento.",
              "Respondemos dentro de 30 días y documentamos la auditoría para autoridades.",
              "Tienes derecho a apelar escribiendo a nuestro responsable de protección de datos."
            ]
          },
          {
            title: "Encargados de tratamiento",
            items: [
              "Vercel aloja nuestra infraestructura web en EE. UU.",
              "OpenRouter entrega respuestas de IA sin PII en el borde.",
              "Google Tag Manager solo se ejecuta si aceptas la analítica."
            ]
          },
          {
            title: "Tus derechos",
            items: [
              "Solicita acceso, corrección o eliminación en privacy@taxhelp.ai.",
              "Los residentes de California pueden ejercer derechos CPRA incluyendo limitar datos sensibles.",
              "Puedes retirar tu consentimiento en cualquier momento."
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
            title: "Uso del servicio",
            items: [
              "La demo es solo para evaluación y no constituye asesoría fiscal.",
              "Eres responsable de la exactitud de la información proporcionada.",
              "Podemos actualizar funciones y disponibilidad en cualquier momento."
            ]
          },
          {
            title: "Cuentas y seguridad",
            items: [
              "Mantén confidenciales tus credenciales de acceso.",
              "Notifícanos de inmediato cualquier acceso no autorizado.",
              "Protegemos los datos con cifrado en tránsito y en reposo."
            ]
          },
          {
            title: "Requisitos e-file",
            items: [
              "El envío electrónico incluirá consentimiento adicional e identificación verificable.",
              "Solicitaremos identificación oficial o verificaciones KBA cuando lo exija el IRS.",
              "Los datos de la demo nunca se envían al IRS o FTB sin tu aprobación explícita."
            ]
          },
          {
            title: "Responsabilidad",
            items: [
              "El servicio se ofrece “tal cual” sin garantías.",
              "Nuestra responsabilidad se limita a los montos pagados.",
              "Algunas jurisdicciones pueden no permitir estas limitaciones."
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
