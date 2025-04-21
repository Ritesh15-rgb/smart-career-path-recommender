import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Career } from "@/types";
import { CAREERS } from "@/constants/mockData";

type CareersState = {
  allCareers: Career[];
  recommendedCareers: Career[];
  isLoading: boolean;
  error: string | null;
};

type CareersActions = {
  initializeCareers: () => void;
  setRecommendedCareers: (careers: Career[]) => void;
  clearRecommendations: () => void;
};

export const useCareersStore = create<CareersState & CareersActions>()(
  persist(
    (set) => ({
      allCareers: CAREERS,
      recommendedCareers: [],
      isLoading: false,
      error: null,

      initializeCareers: () => {
        set({ allCareers: CAREERS });
      },

      setRecommendedCareers: (careers) => {
        set({ recommendedCareers: careers, isLoading: false });
      },

      clearRecommendations: () => {
        set({ recommendedCareers: [], error: null });
      },
    }),
    {
      name: "careers-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ allCareers: state.allCareers }),
    }
  )
);