import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import {
  User,
  Mail,
  BookOpen,
  Heart,
  Briefcase,
  Brain,
  ChevronRight,
  Edit,
} from "lucide-react-native";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useCareersStore } from "@/stores/careersStore";
import { useAssessmentStore } from "@/stores/assessmentStore";
import { useRouter } from "expo-router";
import { SKILLS, INTERESTS, PERSONALITY_TYPES } from "@/constants/mockData";

export default function ProfileScreen() {
  const router = useRouter();
  const { name, email, logout } = useAuthStore();
  const { profile } = useUserStore();
  const { allCareers } = useCareersStore();
  const { resetAssessment } = useAssessmentStore();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const personalityType = profile?.personalityType
    ? PERSONALITY_TYPES.find((type) => type.code === profile.personalityType)
    : null;

  const savedCareers = profile?.savedCareers
    ? profile.savedCareers
        .map((id) => allCareers.find((career) => career.id === id))
        .filter(Boolean)
    : [];

  const getSkillNames = () => {
    if (!profile?.skills.length) return [];
    return profile.skills
      .map((id) => SKILLS.find((skill) => skill.id === id)?.name)
      .filter(Boolean);
  };

  const getInterestNames = () => {
    if (!profile?.interests.length) return [];
    return profile.interests
      .map((id) => INTERESTS.find((interest) => interest.id === id)?.name)
      .filter(Boolean);
  };

  const handleResetAssessment = () => {
    Alert.alert(
      "Reset Assessment",
      "Are you sure you want to reset your assessment? This will clear all your answers.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetAssessment();
            Alert.alert("Assessment Reset", "Your assessment has been reset.");
          },
        },
      ]
    );
  };

  const navigateToAssessment = () => {
    router.push("/assessment");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Card variant="elevated" style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {name ? name.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{name || "User"}</Text>
            <View style={styles.profileEmailContainer}>
              <Mail size={14} color={colors.textSecondary} />
              <Text style={styles.profileEmail}>{email || "No email"}</Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <BookOpen size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Academic Scores</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToAssessment}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.sectionCard}>
          {profile?.academicScores ? (
            <View style={styles.academicScores}>
              {Object.entries(profile.academicScores).map(([subject, score]) => (
                <View key={subject} style={styles.scoreItem}>
                  <Text style={styles.scoreSubject}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </Text>
                  <View style={styles.scoreBar}>
                    <View
                      style={[
                        styles.scoreBarFill,
                        { width: `${(score / 10) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.scoreValue}>{score}/10</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No academic scores added yet</Text>
          )}
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Heart size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Interests</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToAssessment}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.sectionCard}>
          {getInterestNames().length > 0 ? (
            <View style={styles.tagsContainer}>
              {getInterestNames().map((interest, index) => (
                <Chip key={index} label={interest} style={styles.tag} />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No interests added yet</Text>
          )}
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Briefcase size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Skills</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToAssessment}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.sectionCard}>
          {getSkillNames().length > 0 ? (
            <View style={styles.tagsContainer}>
              {getSkillNames().map((skill, index) => (
                <Chip key={index} label={skill} style={styles.tag} />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No skills added yet</Text>
          )}
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Brain size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Personality Type</Text>
          </View>
          <TouchableOpacity
            onPress={navigateToAssessment}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.sectionCard}>
          {personalityType ? (
            <View>
              <View style={styles.personalityHeader}>
                <Text style={styles.personalityCode}>{personalityType.code}</Text>
                <Text style={styles.personalityTitle}>{personalityType.title}</Text>
              </View>
              <Text style={styles.personalityDescription}>
                {personalityType.description}
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No personality type determined yet</Text>
          )}
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Briefcase size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Saved Careers</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/results")}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <ChevronRight size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.sectionCard}>
          {savedCareers.length > 0 ? (
            <View>
              {savedCareers.map((career) => (
                <View key={career.id} style={styles.savedCareer}>
                  <Text style={styles.savedCareerTitle}>{career.title}</Text>
                  <Text
                    style={styles.savedCareerDescription}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {career.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No careers saved yet</Text>
          )}
        </Card>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Reset Assessment"
          onPress={handleResetAssessment}
          variant="outline"
          style={styles.resetButton}
        />
        <Button
          title="Logout"
          onPress={logout}
          variant="primary"
          style={styles.logoutButton}
        />
      </View>
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
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  profileEmailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 8,
  },
  sectionCard: {
    padding: 16,
  },
  academicScores: {
    width: "100%",
  },
  scoreItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  scoreSubject: {
    width: 100,
    fontSize: 14,
    color: colors.text,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  scoreValue: {
    width: 40,
    fontSize: 14,
    color: colors.text,
    textAlign: "right",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  personalityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  personalityCode: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginRight: 8,
  },
  personalityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  personalityDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  savedCareer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  savedCareerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  savedCareerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: 8,
  },
  resetButton: {
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: colors.error,
  },
});