import React from "react";
import { StyleSheet, View, Text, ScrollView, ViewStyle } from "react-native";
import { Chip } from "./Chip";
import { colors } from "@/constants/colors";

type SelectorProps = {
  items: Array<{ id: string; name: string; category?: string }>;
  selectedIds: string[];
  onSelect: (id: string) => void;
  title?: string;
  style?: ViewStyle;
  groupByCategory?: boolean;
  maxItems?: number;
};

export const Selector: React.FC<SelectorProps> = ({
  items,
  selectedIds,
  onSelect,
  title,
  style,
  groupByCategory = false,
  maxItems,
}) => {
  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      // Already selected, so deselect
      onSelect(id);
    } else if (!maxItems || selectedIds.length < maxItems) {
      // Not selected and under max limit, so select
      onSelect(id);
    }
  };

  const renderItems = () => {
    if (!groupByCategory) {
      return (
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              selected={selectedIds.includes(item.id)}
              onPress={() => handleSelect(item.id)}
              style={styles.chip}
            />
          ))}
        </View>
      );
    }

    // Group items by category
    const categories: { [key: string]: typeof items } = {};
    items.forEach((item) => {
      const category = item.category || "Other";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    return Object.entries(categories).map(([category, categoryItems]) => (
      <View key={category} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.itemsContainer}>
          {categoryItems.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              selected={selectedIds.includes(item.id)}
              onPress={() => handleSelect(item.id)}
              style={styles.chip}
            />
          ))}
        </View>
      </View>
    ));
  };

  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          {maxItems && (
            <Text style={styles.counter}>
              {selectedIds.length}/{maxItems}
            </Text>
          )}
        </View>
      )}
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderItems()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  counter: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});