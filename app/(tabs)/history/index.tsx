import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HistoryItem = {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
};

export default function HistoryIndex() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      // TODO: Replace with backend API:
      //
      // const res = await fetch("http://api/history");
      // const data = await res.json();
      // setItems(data);
      //
      setItems([
        {
          id: "1",
          title: "Green Jacket Outfit",
          imageUrl: "https://via.placeholder.com/300",
          date: "2025-01-21",
        },
        {
          id: "2",
          title: "Blue Denim Fit",
          imageUrl: "https://via.placeholder.com/300",
          date: "2025-01-22",
        },
      ]);
      setLoading(false);
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>History</Text>

      {items.map((item) => (
        <Link 
          key={item.id} 
          href={`/history/${item.id}`} 
          asChild
        >
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
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
    gap: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#233443",
    marginBottom: 10,
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#c0d1bf",
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#233443",
  },
  cardDate: {
    color: "#96b7bc",
    marginTop: 4,
    fontSize: 13,
  },
});
