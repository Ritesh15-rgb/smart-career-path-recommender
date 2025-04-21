import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { X } from "lucide-react-native";
import { colors } from "@/constants/colors";

type ChipProps = {
  label: string;
  onPress?: () => void;
  onRemove?: () => void;
  selected?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "small" | "medium" | "large";
};

export const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  onRemove,
  selected = false,
  disabled = false,
  style,
  textStyle,
  size = "medium",
}) => {
  const getChipStyle = (): ViewStyle => {
    let chipStyle: ViewStyle = {};

    // Base styles
    chipStyle = selected ? styles.selectedChip : styles.chip;

    // Size styles
    switch (size) {
      case "small":
        chipStyle = { ...chipStyle, ...styles.smallChip };
        break;
      case "medium":
        chipStyle = { ...chipStyle, ...styles.mediumChip };
        break;
      case "large":
        chipStyle = { ...chipStyle, ...styles.largeChip };
        break;
    }

    // Disabled state
    if (disabled) {
      chipStyle = { ...chipStyle, ...styles.disabledChip };
    }

    return chipStyle;
  };

  const getTextStyle = (): TextStyle => {
    let chipTextStyle: TextStyle = {};

    // Base text styles
    chipTextStyle = selected ? styles.selectedChipText : styles.chipText;

    // Size text styles
    switch (size) {
      case "small":
        chipTextStyle = { ...chipTextStyle, ...styles.smallChipText };
        break;
      case "medium":
        chipTextStyle = { ...chipTextStyle, ...styles.mediumChipText };
        break;
      case "large":
        chipTextStyle = { ...chipTextStyle, ...styles.largeChipText };
        break;
    }

    // Disabled text
    if (disabled) {
      chipTextStyle = { ...chipTextStyle, ...styles.disabledChipText };
    }

    return chipTextStyle;
  };

  const ChipContent = () => (
    <>
      <Text style={[getTextStyle(), textStyle]} numberOfLines={1}>
        {label}
      </Text>
      {onRemove && !disabled && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          disabled={disabled}
        >
          <X
            size={size === "small" ? 14 : size === "medium" ? 16 : 18}
            color={selected ? "white" : colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getChipStyle(), style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <ChipContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getChipStyle(), style]}>
      <ChipContent />
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
  },
  smallChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  mediumChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  largeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  disabledChip: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    opacity: 0.6,
  },
  chipText: {
    color: colors.text,
  },
  selectedChipText: {
    color: "white",
    fontWeight: "500",
  },
  smallChipText: {
    fontSize: 12,
  },
  mediumChipText: {
    fontSize: 14,
  },
  largeChipText: {
    fontSize: 16,
  },
  disabledChipText: {
    color: colors.textSecondary,
  },
  removeButton: {
    marginLeft: 4,
  },
});