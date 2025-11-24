import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

type WardrobeItem = {
  id: string;
  name: string;
  imageUrl: string;
  tags: string[];
};

export default function WardrobeIndex() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // TODO: When backend is ready:
      //
      // const res = await fetch("http://your-api/wardrobe");
      // const data: WardrobeItem[] = await res.json();
      // setItems(data);
      //
      setLoading(false); // temporary
    };

    load();
  }, []);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeede8",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#233443",
    marginBottom: 20,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#eeede8",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#233443",
  },

  emptyText: {
    fontSize: 15,
    color: "#233443",
    opacity: 0.7,
    textAlign: "center",
    marginTop: 60,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#b9d6da",
    borderRadius: 14,
    marginBottom: 18,
    padding: 10,
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#dfe9ea",
  },

  itemName: {
    marginTop: 8,
    fontWeight: "700",
    color: "#233443",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 4,
  },

  tag: {
    backgroundColor: "#96b7bc",
    color: "#233443",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 11,
  },
});