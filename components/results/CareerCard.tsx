import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Chip } from "@/components/ui/Chip";
import { BookmarkPlus, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { Career } from "@/types";

type CareerCardProps = {
  career: Career;
  isSaved: boolean;
  onToggleSave: () => void;
  onPress: () => void;
  expanded?: boolean;
};

export const CareerCard: React.FC<CareerCardProps> = ({
  career,
  isSaved,
  onToggleSave,
  onPress,
  expanded = false,
}) => {
  const confidenceScore = career.confidenceScore || 0;
  
  return (
    <Card variant="elevated" style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{career.title}</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onToggleSave}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            {isSaved ? (
              <BookmarkCheck size={20} color={colors.primary} />
            ) : (
              <BookmarkPlus size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.confidenceContainer}>
          <ProgressBar
            progress={confidenceScore / 100}
            height={6}
            style={styles.progressBar}
            showPercentage
            label="Match Score"
          />
        </View>
        
        {expanded ? (
          <ChevronUp size={20} color={colors.textSecondary} />
        ) : (
          <ChevronDown size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.content}>
          <Text style={styles.description}>{career.description}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Education Required</Text>
              <Text style={styles.detailValue}>{career.educationRequired}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Average Salary</Text>
              <Text style={styles.detailValue}>{career.averageSalary}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Growth Outlook</Text>
              <Text style={styles.detailValue}>{career.growthOutlook}</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsLabel}>Required Skills</Text>
            <View style={styles.tags}>
              {career.requiredSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  style={styles.tag}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsLabel}>Related Fields</Text>
            <View style={styles.tags}>
              {career.matchingTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  style={styles.tag}
                />
              ))}
            </View>
          </View>
          
          {career.aiExplanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationLabel}>Why This Matches You</Text>
              <Text style={styles.explanation}>{career.aiExplanation}</Text>
            </View>
          )}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 0,
    overflow: "hidden",
  },
  header: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  saveButton: {
    marginLeft: 8,
  },
  confidenceContainer: {
    marginBottom: 8,
  },
  progressBar: {
    marginVertical: 0,
  },
  content: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  explanationContainer: {
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 8,
  },
  explanationLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});