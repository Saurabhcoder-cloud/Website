export interface AuthenticatedRequest extends Express.Request {
  user?: {
    id: number;
    email: string;
    plan: string;
  };
}

export type SupportedLanguage =
  | 'en'
  | 'es'
  | 'fr'
  | 'hi'
  | 'ar'
  | 'zh'
  | 'de'
  | 'ru';
