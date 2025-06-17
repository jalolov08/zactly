import { User } from '@/types/user.type';
import { storage } from '@/utils/storage.util';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  anonId: string | null;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
  setAnonId: (anonId: string) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setAuthenticated: (authenticated: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      anonId: null,
      user: null,
      token: null,
      refreshToken: null,
      authenticated: null,
      setAnonId: (anonId: string) => set({ anonId }),
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      setAuthenticated: (authenticated: boolean) => set({ authenticated }),
      clear: () => set({ user: null, token: null, refreshToken: null, authenticated: null }),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => storage) }
  )
);
