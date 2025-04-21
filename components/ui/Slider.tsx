import React, { useState } from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import { Slider as RNSlider } from "react-native";
import { colors } from "@/constants/colors";

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  style?: ViewStyle;
  valueFormatter?: (value: number) => string;
};

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 10,
  step = 1,
  label,
  showValue = true,
  style,
  valueFormatter,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleValueChange = (newValue: number) => {
    setLocalValue(newValue);
  };

  const handleSlidingComplete = (newValue: number) => {
    onValueChange(newValue);
  };

  const formattedValue = valueFormatter
    ? valueFormatter(localValue)
    : localValue.toString();

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.value}>{formattedValue}</Text>}
        </View>
      )}
      <RNSlider
        style={styles.slider}
        value={localValue}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primary}
      />
      {step === 1 && (
        <View style={styles.marksContainer}>
          {Array.from(
            { length: maximumValue - minimumValue + 1 },
            (_, i) => i + minimumValue
          ).map((mark) => (
            <Text key={mark} style={styles.mark}>
              {mark}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  marksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: -12,
  },
  mark: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});