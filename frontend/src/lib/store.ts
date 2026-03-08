import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  role: 'PARTICIPANT' | 'ADMIN';
  username?: string; // Optional, since backend response might just have token & role
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

// Initial state from cookies
const savedToken = Cookies.get('token');
const savedRole = Cookies.get('role') as 'PARTICIPANT' | 'ADMIN' | undefined;

export const useAuthStore = create<AuthState>((set) => ({
  user: savedRole ? { role: savedRole } : null,
  isAuthenticated: !!savedToken,
  login: (token, role) => {
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
    Cookies.set('role', role, { expires: 7, secure: true, sameSite: 'strict' });
    set({ user: { role: role as 'PARTICIPANT' | 'ADMIN' }, isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    set({ user: null, isAuthenticated: false });
  },
}));
