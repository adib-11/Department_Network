import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // For demo purposes, accept any email/password
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
    }),
    {
      name: "auth-storage",
    },
  ),
);
