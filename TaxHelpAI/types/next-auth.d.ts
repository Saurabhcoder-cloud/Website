import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      plan?: string;
      planExpiry?: string | null;
    };
  }

  interface User {
    plan?: string;
    planExpiry?: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    plan?: string;
    planExpiry?: string | null;
  }
}
