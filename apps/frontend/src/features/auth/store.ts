import { create } from "zustand";

type User = {
  _id: string;
  username: string;
};

type AuthState = {
  token: string | null;
  user: User | null;

  setToken: (token: string) => void;
  setUser: (user: User) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));