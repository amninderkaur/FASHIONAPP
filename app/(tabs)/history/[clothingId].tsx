import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type HistoryDetail = {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  notes?: string;
  tags: string[];
};

export default function HistoryDetails() {
  const { clothingId } = useLocalSearchParams();
  const [item, setItem] = useState<HistoryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      // TODO: backend fetch later
      setItem({
        id: String(clothingId),
        title: "Green Jacket Outfit",
        date: "2025-01-21",
        imageUrl: "https://via.placeholder.com/600",
        notes: "This outfit was worn for a winter photoshoot.",
        tags: ["Casual", "Warm", "Outdoor"],
      });
      setLoading(false);
    };

    loadItem();
  }, [clothingId]);

  if (loading || !item) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: item.imageUrl }} style={styles.mainImage} />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>

      {item.notes && <Text style={styles.notes}>{item.notes}</Text>}

      <View style={styles.tagBox}>
        {item.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeede8",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  center: {
    flex: 1,
    backgroundColor: "#eeede8",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#233443",
    fontSize: 16,
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#233443",
  },
  date: {
    fontSize: 14,
    color: "#96b7bc",
  },
  notes: {
    fontSize: 15,
    color: "#233443",
  },
  tagBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#b9d6da",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: "#233443",
    fontWeight: "600",
  },
});
