import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";
import { AcademicSubject } from "@/types";

type AcademicScoreInputProps = {
  subjects: AcademicSubject[];
  onScoreChange: (subjectId: string, score: number) => void;
  onComplete: () => void;
};

export const AcademicScoreInput: React.FC<AcademicScoreInputProps> = ({
  subjects,
  onScoreChange,
  onComplete,
}) => {
  const [localSubjects, setLocalSubjects] = useState<AcademicSubject[]>(subjects);

  const handleScoreChange = (subjectId: string, score: number) => {
    const updatedSubjects = localSubjects.map((subject) =>
      subject.id === subjectId ? { ...subject, score } : subject
    );
    setLocalSubjects(updatedSubjects);
    onScoreChange(subjectId, score);
  };

  const isComplete = localSubjects.every((subject) => subject.score > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Academic Performance</Text>
      <Text style={styles.subtitle}>
        Rate your performance in each subject from 1 to 10
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {localSubjects.map((subject) => (
          <Card key={subject.id} style={styles.card}>
            <Slider
              label={subject.name}
              value={subject.score}
              onValueChange={(value) => handleScoreChange(subject.id, value)}
              minimumValue={1}
              maximumValue={10}
              step={1}
            />
          </Card>
        ))}

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
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});