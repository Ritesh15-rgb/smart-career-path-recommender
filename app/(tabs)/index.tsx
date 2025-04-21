import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Briefcase, ClipboardCheck, User } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useAssessmentStore } from "@/stores/assessmentStore";

export default function HomeScreen() {
  const router = useRouter();
  const { name } = useAuthStore();
  const { profile } = useUserStore();
  const { sections, isCompleted } = useAssessmentStore();

  const completedSections = sections.filter((section) => section.completed).length;
  const totalSections = sections.length;
  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

  const navigateToAssessment = () => {
    router.push("/assessment");
  };

  const navigateToResults = () => {
    router.push("/results");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {name || "there"}!</Text>
        <Text style={styles.subtitle}>
          Discover your ideal career path based on your unique profile
        </Text>
      </View>

      <Card variant="elevated" style={styles.bannerCard}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Find Your Perfect Career</Text>
          <Text style={styles.bannerText}>
            Complete your assessment to get personalized career recommendations
          </Text>
          <Button
            title={isCompleted ? "View Results" : "Start Assessment"}
            onPress={isCompleted ? navigateToResults : navigateToAssessment}
            style={styles.bannerButton}
          />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={navigateToAssessment}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
            <ClipboardCheck size={24} color={colors.primary} />
          </View>
          <Text style={styles.actionTitle}>Assessment</Text>
          <Text style={styles.actionSubtitle}>
            {isCompleted
              ? "Review your assessment"
              : `${completedSections}/${totalSections} completed`}
          </Text>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={navigateToResults}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
            <Briefcase size={24} color="#4CAF50" />
          </View>
          <Text style={styles.actionTitle}>Career Matches</Text>
          <Text style={styles.actionSubtitle}>
            {isCompleted ? "View recommendations" : "Complete assessment first"}
          </Text>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={navigateToProfile}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIcon, { backgroundColor: "#EDE7F6" }]}>
            <User size={24} color="#673AB7" />
          </View>
          <Text style={styles.actionTitle}>Profile</Text>
          <Text style={styles.actionSubtitle}>
            {profile?.interests.length ? "Update your profile" : "Complete your profile"}
          </Text>
          <ChevronRight size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>How It Works</Text>

      <Card style={styles.infoCard}>
        <View style={styles.infoStep}>
          <View style={styles.infoStepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.infoStepContent}>
            <Text style={styles.infoStepTitle}>Complete Your Profile</Text>
            <Text style={styles.infoStepText}>
              Add your academic scores, interests, and skills
            </Text>
          </View>
        </View>

        <View style={styles.infoStep}>
          <View style={styles.infoStepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.infoStepContent}>
            <Text style={styles.infoStepTitle}>Take Personality Assessment</Text>
            <Text style={styles.infoStepText}>
              Discover your personality type and strengths
            </Text>
          </View>
        </View>

        <View style={styles.infoStep}>
          <View style={styles.infoStepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.infoStepContent}>
            <Text style={styles.infoStepTitle}>Get Career Recommendations</Text>
            <Text style={styles.infoStepText}>
              Receive personalized career suggestions based on your profile
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bannerCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: 24,
  },
  bannerImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  bannerContent: {
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  bannerButton: {
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: 8,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  infoStepContent: {
    flex: 1,
  },
  infoStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  infoStepText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});