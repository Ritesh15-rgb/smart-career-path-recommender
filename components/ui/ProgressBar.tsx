import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

type ProgressBarProps = {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: ViewStyle;
  showPercentage?: boolean;
  label?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = colors.border,
  progressColor = colors.primary,
  style,
  showPercentage = false,
  label,
}) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View style={[styles.container, style]}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={styles.percentage}>{percentage}%</Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.progressBackground,
          { backgroundColor, height },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: progressColor,
              width: `${percentage}%`,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 4,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  percentage: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
  },
  progressBackground: {
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 4,
  },
});