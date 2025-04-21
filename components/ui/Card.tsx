import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
};

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "default",
}) => {
  const getCardStyle = () => {
    switch (variant) {
      case "elevated":
        return styles.elevatedCard;
      case "outlined":
        return styles.outlinedCard;
      default:
        return styles.defaultCard;
    }
  };

  return <View style={[styles.card, getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    backgroundColor: colors.card,
  },
  defaultCard: {
    backgroundColor: colors.card,
  },
  elevatedCard: {
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlinedCard: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
});