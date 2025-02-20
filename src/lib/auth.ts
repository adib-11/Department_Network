import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      isAuthenticated: true,
      user: {
        name: "Sarah Anderson",
        email,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        role: "Senior Software Engineer",
      },
    });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
