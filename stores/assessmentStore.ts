import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AssessmentSection, PersonalityTrait } from "@/types";
import { PERSONALITY_TRAITS } from "@/constants/mockData";

type AssessmentState = {
  sections: AssessmentSection[];
  currentSectionIndex: number;
  personalityTraits: PersonalityTrait[];
  isCompleted: boolean;
};

type AssessmentActions = {
  initializeAssessment: () => void;
  setCurrentSection: (index: number) => void;
  markSectionCompleted: (sectionId: string) => void;
  updatePersonalityTrait: (traitId: string, answer: 'a' | 'b') => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
};

export const useAssessmentStore = create<AssessmentState & AssessmentActions>()(
  persist(
    (set, get) => ({
      sections: [
        { id: "academic", title: "Academic Scores", completed: false },
        { id: "interests", title: "Interests", completed: false },
        { id: "skills", title: "Skills", completed: false },
        { id: "personality", title: "Personality", completed: false },
      ],
      currentSectionIndex: 0,
      personalityTraits: [...PERSONALITY_TRAITS],
      isCompleted: false,

      initializeAssessment: () => {
        set({
          sections: [
            { id: "academic", title: "Academic Scores", completed: false },
            { id: "interests", title: "Interests", completed: false },
            { id: "skills", title: "Skills", completed: false },
            { id: "personality", title: "Personality", completed: false },
          ],
          currentSectionIndex: 0,
          personalityTraits: [...PERSONALITY_TRAITS],
          isCompleted: false,
        });
      },

      setCurrentSection: (index) => {
        set({ currentSectionIndex: index });
      },

      markSectionCompleted: (sectionId) => {
        const { sections, currentSectionIndex } = get();
        const updatedSections = sections.map((section) =>
          section.id === sectionId ? { ...section, completed: true } : section
        );
        
        // Move to next section if available
        const nextIndex = currentSectionIndex < sections.length - 1 
          ? currentSectionIndex + 1 
          : currentSectionIndex;
        
        set({ 
          sections: updatedSections,
          currentSectionIndex: nextIndex,
        });
        
        // Check if all sections are completed
        if (updatedSections.every(section => section.completed)) {
          set({ isCompleted: true });
        }
      },

      updatePersonalityTrait: (traitId, answer) => {
        const { personalityTraits } = get();
        const updatedTraits = personalityTraits.map((trait) =>
          trait.id === traitId ? { ...trait, answer } : trait
        );
        
        set({ personalityTraits: updatedTraits });
      },

      completeAssessment: () => {
        set({ isCompleted: true });
      },

      resetAssessment: () => {
        set({
          sections: get().sections.map(section => ({ ...section, completed: false })),
          currentSectionIndex: 0,
          personalityTraits: [...PERSONALITY_TRAITS],
          isCompleted: false,
        });
      },
    }),
    {
      name: "assessment-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);