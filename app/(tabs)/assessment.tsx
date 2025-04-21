import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { AcademicScoreInput } from "@/components/assessment/AcademicScoreInput";
import { InterestsSelector } from "@/components/assessment/InterestsSelector";
import { SkillsSelector } from "@/components/assessment/SkillsSelector";
import { PersonalityQuiz } from "@/components/assessment/PersonalityQuiz";
import { colors } from "@/constants/colors";
import { useAssessmentStore } from "@/stores/assessmentStore";
import { useUserStore } from "@/stores/userStore";
import { ACADEMIC_SUBJECTS, INTERESTS, SKILLS, PERSONALITY_TRAITS } from "@/constants/mockData";

export default function AssessmentScreen() {
  const router = useRouter();
  const {
    sections,
    currentSectionIndex,
    personalityTraits,
    isCompleted,
    setCurrentSection,
    markSectionCompleted,
    updatePersonalityTrait,
    completeAssessment,
  } = useAssessmentStore();
  
  const {
    profile,
    updateAcademicScores,
    updateInterests,
    updateSkills,
    updatePersonalityType,
  } = useUserStore();

  const [academicSubjects, setAcademicSubjects] = useState(ACADEMIC_SUBJECTS);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Initialize from profile if available
  useEffect(() => {
    if (profile) {
      // Initialize academic subjects
      const updatedSubjects = academicSubjects.map(subject => {
        const subjectKey = subject.name.toLowerCase().replace(/\s+/g, '') as keyof typeof profile.academicScores;
        const score = profile.academicScores[subjectKey] || 0;
        return { ...subject, score };
      });
      setAcademicSubjects(updatedSubjects);
      
      // Initialize interests and skills
      setSelectedInterests(profile.interests);
      setSelectedSkills(profile.skills);
    }
  }, [profile]);

  const handleAcademicScoreChange = (subjectId: string, score: number) => {
    const updatedSubjects = academicSubjects.map(subject =>
      subject.id === subjectId ? { ...subject, score } : subject
    );
    setAcademicSubjects(updatedSubjects);
  };

  const handleAcademicComplete = () => {
    // Save to user profile
    const scores: Record<string, number> = {};
    academicSubjects.forEach(subject => {
      const key = subject.name.toLowerCase().replace(/\s+/g, '');
      scores[key] = subject.score;
    });
    updateAcademicScores(scores);
    
    // Mark section as completed
    markSectionCompleted("academic");
  };

  const handleInterestsChange = (interests: string[]) => {
    setSelectedInterests(interests);
  };

  const handleInterestsComplete = () => {
    updateInterests(selectedInterests);
    markSectionCompleted("interests");
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
  };

  const handleSkillsComplete = () => {
    updateSkills(selectedSkills);
    markSectionCompleted("skills");
  };

  const handleTraitChange = (traitId: string, answer: 'a' | 'b') => {
    updatePersonalityTrait(traitId, answer);
  };

  const handlePersonalityComplete = (personalityType: string) => {
    updatePersonalityType(personalityType);
    markSectionCompleted("personality");
    completeAssessment();
    
    // Navigate to results
    router.push("/results");
  };

  const renderCurrentSection = () => {
    const currentSection = sections[currentSectionIndex];
    
    switch (currentSection.id) {
      case "academic":
        return (
          <AcademicScoreInput
            subjects={academicSubjects}
            onScoreChange={handleAcademicScoreChange}
            onComplete={handleAcademicComplete}
          />
        );
      case "interests":
        return (
          <InterestsSelector
            interests={INTERESTS}
            selectedInterests={selectedInterests}
            onInterestsChange={handleInterestsChange}
            onComplete={handleInterestsComplete}
          />
        );
      case "skills":
        return (
          <SkillsSelector
            skills={SKILLS}
            selectedSkills={selectedSkills}
            onSkillsChange={handleSkillsChange}
            onComplete={handleSkillsComplete}
          />
        );
      case "personality":
        return (
          <PersonalityQuiz
            traits={personalityTraits}
            onTraitChange={handleTraitChange}
            onComplete={handlePersonalityComplete}
          />
        );
      default:
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No assessment section found</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {sections.map((section, index) => (
          <View
            key={section.id}
            style={[
              styles.progressStep,
              section.completed && styles.completedStep,
              index === currentSectionIndex && styles.activeStep,
            ]}
          >
            <Text
              style={[
                styles.progressStepText,
                (section.completed || index === currentSectionIndex) && styles.activeStepText,
              ]}
            >
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
      
      {renderCurrentSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 0,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  completedStep: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeStep: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  activeStepText: {
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
});