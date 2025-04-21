import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Selector } from "@/components/ui/Selector";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { Interest } from "@/types";

type InterestsSelectorProps = {
  interests: Interest[];
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onComplete: () => void;
  maxInterests?: number;
};

export const InterestsSelector: React.FC<InterestsSelectorProps> = ({
  interests,
  selectedInterests,
  onInterestsChange,
  onComplete,
  maxInterests = 5,
}) => {
  const handleSelect = (interestId: string) => {
    const updatedInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];
    
    onInterestsChange(updatedInterests);
  };

  const isComplete = selectedInterests.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Interests</Text>
      <Text style={styles.subtitle}>
        Choose up to {maxInterests} areas that interest you the most
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Selector
          items={interests}
          selectedIds={selectedInterests}
          onSelect={handleSelect}
          groupByCategory
          maxItems={maxInterests}
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