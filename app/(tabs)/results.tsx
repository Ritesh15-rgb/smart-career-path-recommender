import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { CareerCard } from "@/components/results/CareerCard";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { useUserStore } from "@/stores/userStore";
import { useCareersStore } from "@/stores/careersStore";
import { useAssessmentStore } from "@/stores/assessmentStore";
import { useRouter } from "expo-router";
import { getCareerRecommendations } from "@/services/aiService";
import { Career } from "@/types";
import { RefreshCw } from "lucide-react-native";

export default function ResultsScreen() {
  const router = useRouter();
  const { profile, saveCareer, removeCareer } = useUserStore();
  const { recommendedCareers, setRecommendedCareers } = useCareersStore();
  const { isCompleted } = useAssessmentStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  
  useEffect(() => {
    if (isCompleted && profile && recommendedCareers.length === 0) {
      generateRecommendations();
    }
  }, [isCompleted, profile]);
  
  const generateRecommendations = async () => {
    if (!profile) {
      setError("Please complete your profile first");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const recommendations = await getCareerRecommendations({
        academicScores: profile.academicScores,
        interests: profile.interests,
        skills: profile.skills,
        personalityType: profile.personalityType,
      });
      
      setRecommendedCareers(recommendations);
    } catch (err) {
      setError("Failed to generate recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleSave = (career: Career) => {
    if (!profile) return;
    
    if (profile.savedCareers.includes(career.id)) {
      removeCareer(career.id);
    } else {
      saveCareer(career.id);
    }
  };
  
  const handleCardPress = (careerId: string) => {
    setExpandedCardId(expandedCardId === careerId ? null : careerId);
  };
  
  const navigateToAssessment = () => {
    router.push("/assessment");
  };
  
  if (!isCompleted) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Complete Your Assessment</Text>
        <Text style={styles.emptyText}>
          You need to complete your assessment to get career recommendations.
        </Text>
        <Button
          title="Start Assessment"
          onPress={navigateToAssessment}
          style={styles.button}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Career Recommendations</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={generateRecommendations}
          disabled={loading}
        >
          <RefreshCw
            size={20}
            color={loading ? colors.disabled : colors.primary}
          />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>
            Analyzing your profile and generating recommendations...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Try Again"
            onPress={generateRecommendations}
            style={styles.button}
          />
        </View>
      ) : recommendedCareers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Recommendations Yet</Text>
          <Text style={styles.emptyText}>
            Tap the button below to generate career recommendations based on your profile.
          </Text>
          <Button
            title="Generate Recommendations"
            onPress={generateRecommendations}
            style={styles.button}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.subtitle}>
            Based on your profile, here are your top career matches:
          </Text>
          
          {recommendedCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              isSaved={profile?.savedCareers.includes(career.id) || false}
              onToggleSave={() => handleToggleSave(career)}
              onPress={() => handleCardPress(career.id)}
              expanded={expandedCardId === career.id}
            />
          ))}
          
          <Text style={styles.disclaimer}>
            These recommendations are based on your current profile. Update your assessment for more accurate results.
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 16,
    maxWidth: 300,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: "center",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 300,
  },
  button: {
    minWidth: 200,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 24,
    fontStyle: "italic",
  },
});