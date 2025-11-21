import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

type WardrobeItem = {
  id: string;
  name: string;
  imageUrl: string;
  tags: string[];
};

export default function ClothingDetails() {
  const { clothingId } = useLocalSearchParams();
  const [item, setItem] = useState<WardrobeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      // TODO: When backend is ready:
      //
      // const res = await fetch(`http://your-api/wardrobe/${clothingId}`);
      // const data: WardrobeItem = await res.json();
      // setItem(data);
      //
      setLoading(false); // temporary
    };

    loadItem();
  }, [clothingId]);
}