'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clear: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      clear: () => set({ user: null, token: null })
    }),
    { name: 'taxhelp-auth' }
  )
);
