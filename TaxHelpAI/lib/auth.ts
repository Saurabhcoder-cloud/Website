import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
        ]
      : []),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const valid = await compare(credentials.password, user.password);

        if (!valid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id.toString(),
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          plan: user.plan,
          planExpiry: user.planExpiry?.toISOString()
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id ?? token.id;
        token.plan = (user as any).plan ?? token.plan ?? 'free';
        token.planExpiry = (user as any).planExpiry ?? token.planExpiry ?? null;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
        if (dbUser) {
          token.id = dbUser.id;
          token.plan = dbUser.plan;
          token.planExpiry = dbUser.planExpiry?.toISOString() ?? null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ? String(token.id) : '';
        session.user.plan = token.plan as string;
        session.user.planExpiry = token.planExpiry as string | null;
      }
      return session;
    }
  }
};

export const getServerAuthSession = () => getServerSession(authOptions);
