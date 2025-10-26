export type Locale = 'en' | 'es' | 'fr' | 'hi' | 'ar' | 'zh-CN' | 'de' | 'ru';

type Dictionary = {
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  features: string[];
  pricingTitle: string;
  dashboardCta: string;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    heroTitle: 'AI-powered U.S. tax filing for everyone',
    heroSubtitle: 'Chat with IRS-trained AI, upload your W-2, generate Form 1040 PDFs, and stay compliant in any language.',
    cta: 'Get started',
    features: ['Multilingual AI chat assistant', 'OCR-powered tax filing', 'Automated refund calculator', 'Stripe-powered subscriptions'],
    pricingTitle: 'Choose the plan that fits your tax journey',
    dashboardCta: 'Go to dashboard'
  },
  es: {
    heroTitle: 'Declaración de impuestos en EE. UU. impulsada por IA',
    heroSubtitle: 'Chatea con la IA entrenada por el IRS, carga tu W-2 y genera PDF del Formulario 1040 en tu idioma.',
    cta: 'Comenzar',
    features: ['Asistente de chat multilingüe', 'Presentación fiscal con OCR', 'Calculadora de reembolsos automatizada', 'Suscripciones con Stripe'],
    pricingTitle: 'Elige el plan que mejor se adapte',
    dashboardCta: 'Ir al panel'
  },
  fr: {
    heroTitle: "Déclaration fiscale américaine assistée par l'IA",
    heroSubtitle: "Discutez avec une IA formée par l'IRS, téléchargez votre W-2 et générez le formulaire 1040 en PDF dans votre langue.",
    cta: 'Commencer',
    features: ['Assistant IA multilingue', 'Déclaration fiscale par OCR', 'Calculateur de remboursement automatisé', 'Abonnements Stripe'],
    pricingTitle: 'Choisissez la formule adaptée',
    dashboardCta: 'Aller au tableau de bord'
  },
  hi: {
    heroTitle: 'एआई आधारित अमेरिकी टैक्स फाइलिंग',
    heroSubtitle: 'आईआरएस प्रशिक्षित एआई से बात करें, अपना W-2 अपलोड करें और अपनी भाषा में 1040 पीडीएफ प्राप्त करें।',
    cta: 'शुरू करें',
    features: ['बहुभाषी चैट सहायक', 'ओसीआर आधारित टैक्स फाइलिंग', 'स्वचालित रिफंड कैलकुलेटर', 'स्ट्राइप सदस्यताएँ'],
    pricingTitle: 'अपनी आवश्यकताओं के अनुसार योजना चुनें',
    dashboardCta: 'डैशबोर्ड पर जाएँ'
  },
  ar: {
    heroTitle: 'تقديم ضرائب الولايات المتحدة بالذكاء الاصطناعي',
    heroSubtitle: 'تحدث مع ذكاء اصطناعي مدرب من IRS، وارفع نموذج W-2، واحصل على نموذج 1040 PDF بلغتك.',
    cta: 'ابدأ الآن',
    features: ['مساعد محادثة متعدد اللغات', 'تقديم ضريبي عبر OCR', 'حاسبة استرداد تلقائية', 'اشتراكات عبر Stripe'],
    pricingTitle: 'اختر الخطة المناسبة',
    dashboardCta: 'اذهب إلى لوحة التحكم'
  },
  'zh-CN': {
    heroTitle: '面向所有人的 AI 美国报税助手',
    heroSubtitle: '与 IRS 训练的 AI 对话，上传 W-2，生成 1040 表 PDF，并支持多语言。',
    cta: '立即开始',
    features: ['多语言 AI 聊天助手', 'OCR 税务申报', '自动退税计算器', 'Stripe 订阅'],
    pricingTitle: '选择适合您的方案',
    dashboardCta: '前往控制面板'
  },
  de: {
    heroTitle: 'KI-gestützte US-Steuererklärung',
    heroSubtitle: 'Chatten Sie mit einer IRS-trainierten KI, laden Sie Ihr W-2 hoch und erzeugen Sie Formular-1040-PDFs in Ihrer Sprache.',
    cta: 'Jetzt starten',
    features: ['Mehrsprachiger KI-Chat', 'OCR-basierte Steuererklärung', 'Automatischer Rückerstattungsrechner', 'Stripe-Abonnements'],
    pricingTitle: 'Wählen Sie den passenden Tarif',
    dashboardCta: 'Zum Dashboard'
  },
  ru: {
    heroTitle: 'Налоговая помощь в США на базе ИИ',
    heroSubtitle: 'Общайтесь с ИИ, обученным IRS, загружайте W-2 и получайте PDF формы 1040 на вашем языке.',
    cta: 'Начать',
    features: ['Многоязычный чат-ассистент', 'OCR-загрузка налоговых документов', 'Автоматический расчет возврата', 'Подписки Stripe'],
    pricingTitle: 'Выберите подходящий план',
    dashboardCta: 'Перейти в кабинет'
  }
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.en;
}

export const locales = Object.keys(dictionaries) as Locale[];
