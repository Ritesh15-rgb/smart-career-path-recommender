import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import { ACADEMIC_SUBJECTS } from "@/constants/mockData";

type UserState = {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
};

type UserActions = {
  initializeProfile: (userId: string, name: string, email: string) => void;
  updateAcademicScores: (scores: { [key: string]: number }) => void;
  updateInterests: (interests: string[]) => void;
  updateSkills: (skills: string[]) => void;
  updatePersonalityType: (personalityType: string) => void;
  saveCareer: (careerId: string) => void;
  removeCareer: (careerId: string) => void;
  clearProfile: () => void;
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,

      initializeProfile: (userId: string, name: string, email: string) => {
        set({
          profile: {
            id: userId,
            name,
            email,
            academicScores: {
              math: 0,
              science: 0,
              english: 0,
              socialStudies: 0,
              arts: 0,
            },
            interests: [],
            skills: [],
            personalityType: "",
            savedCareers: [],
          },
        });
      },

      updateAcademicScores: (scores) => {
        const profile = get().profile;
        if (!profile) return;

        set({
          profile: {
            ...profile,
            academicScores: {
              ...profile.academicScores,
              ...scores,
            },
          },
        });
      },

      updateInterests: (interests) => {
        const profile = get().profile;
        if (!profile) return;

        set({
          profile: {
            ...profile,
            interests,
          },
        });
      },

      updateSkills: (skills) => {
        const profile = get().profile;
        if (!profile) return;

        set({
          profile: {
            ...profile,
            skills,
          },
        });
      },

      updatePersonalityType: (personalityType) => {
        const profile = get().profile;
        if (!profile) return;

        set({
          profile: {
            ...profile,
            personalityType,
          },
        });
      },

      saveCareer: (careerId) => {
        const profile = get().profile;
        if (!profile) return;

        if (!profile.savedCareers.includes(careerId)) {
          set({
            profile: {
              ...profile,
              savedCareers: [...profile.savedCareers, careerId],
            },
          });
        }
      },

      removeCareer: (careerId) => {
        const profile = get().profile;
        if (!profile) return;

        set({
          profile: {
            ...profile,
            savedCareers: profile.savedCareers.filter((id) => id !== careerId),
          },
        });
      },

      clearProfile: () => {
        set({ profile: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);