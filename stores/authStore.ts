import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userId: null,
      email: null,
      name: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock authentication - in a real app, this would be a server call
          if (email === "demo@example.com" && password === "password") {
            set({
              isAuthenticated: true,
              userId: "user123",
              email: email,
              name: "Demo User",
              isLoading: false,
            });
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "An error occurred during login",
          });
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock signup - in a real app, this would be a server call
          set({
            isAuthenticated: true,
            userId: "user" + Math.floor(Math.random() * 1000),
            email: email,
            name: name,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "An error occurred during signup",
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          userId: null,
          email: null,
          name: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);