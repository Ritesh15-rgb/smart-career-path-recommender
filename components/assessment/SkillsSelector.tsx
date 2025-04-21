import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Selector } from "@/components/ui/Selector";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { Skill } from "@/types";

type SkillsSelectorProps = {
  skills: Skill[];
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  onComplete: () => void;
  maxSkills?: number;
};

export const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  skills,
  selectedSkills,
  onSkillsChange,
  onComplete,
  maxSkills = 5,
}) => {
  const handleSelect = (skillId: string) => {
    const updatedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter((id) => id !== skillId)
      : [...selectedSkills, skillId];
    
    onSkillsChange(updatedSkills);
  };

  const isComplete = selectedSkills.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Skills</Text>
      <Text style={styles.subtitle}>
        Choose up to {maxSkills} skills that you excel at or enjoy using
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Selector
          items={skills}
          selectedIds={selectedSkills}
          onSelect={handleSelect}
          groupByCategory
          maxItems={maxSkills}
        />

        <Button
          title="Continue"
          onPress={onComplete}
          disabled={!isComplete}
          style={styles.button}
          fullWidth
        />
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
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});