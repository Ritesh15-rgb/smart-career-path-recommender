import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";
import { PersonalityTrait } from "@/types";

type PersonalityQuizProps = {
  traits: PersonalityTrait[];
  onTraitChange: (traitId: string, answer: 'a' | 'b') => void;
  onComplete: (personalityType: string) => void;
};

export const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({
  traits,
  onTraitChange,
  onComplete,
}) => {
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);

  const handleAnswer = (answer: 'a' | 'b') => {
    const currentTrait = traits[currentTraitIndex];
    onTraitChange(currentTrait.id, answer);
    
    if (currentTraitIndex < traits.length - 1) {
      setCurrentTraitIndex(currentTraitIndex + 1);
    } else {
      // All questions answered, calculate personality type
      calculatePersonalityType();
    }
  };

  const calculatePersonalityType = () => {
    // Simple MBTI calculation
    const e = traits[0].answer === 'a' ? 'E' : 'I';
    const s = traits[1].answer === 'a' ? 'S' : 'N';
    const t = traits[2].answer === 'a' ? 'T' : 'F';
    const j = traits[3].answer === 'a' ? 'J' : 'P';
    
    const personalityType = e + s + t + j;
    onComplete(personalityType);
  };

  const currentTrait = traits[currentTraitIndex];
  const progress = ((currentTraitIndex + 1) / traits.length) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personality Assessment</Text>
      <Text style={styles.subtitle}>
        Choose the option that best describes you
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentTraitIndex + 1} of {traits.length}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.questionCard}>
          <Text style={styles.questionTitle}>{currentTrait.title}</Text>
          <Text style={styles.questionDescription}>
            {currentTrait.description}
          </Text>

          <TouchableOpacity
            style={[
              styles.optionButton,
              currentTrait.answer === 'a' && styles.selectedOption,
            ]}
            onPress={() => handleAnswer('a')}
          >
            <Text
              style={[
                styles.optionText,
                currentTrait.answer === 'a' && styles.selectedOptionText,
              ]}
            >
              {currentTrait.options.a}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              currentTrait.answer === 'b' && styles.selectedOption,
            ]}
            onPress={() => handleAnswer('b')}
          >
            <Text
              style={[
                styles.optionText,
                currentTrait.answer === 'b' && styles.selectedOptionText,
              ]}
            >
              {currentTrait.options.b}
            </Text>
          </TouchableOpacity>
        </Card>

        {currentTraitIndex > 0 && (
          <Button
            title="Previous Question"
            onPress={() => setCurrentTraitIndex(currentTraitIndex - 1)}
            variant="outline"
            style={styles.button}
            fullWidth
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "right",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  questionCard: {
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "500",
  },
  button: {
    marginTop: 8,
  },
});