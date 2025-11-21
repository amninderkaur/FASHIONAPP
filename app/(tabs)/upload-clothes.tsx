import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// TODO: Replace with backend URL
const API_BASE_URL = "";

type DetectedClothingItem = {
  id: string;
  name: string;
  category: string;
  confidence: number;
  imageUrl?: string;
};

export default function UploadWardrobeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<DetectedClothingItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your gallery.");
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need camera access.");
      return false;
    }
    return true;
  };

  // Pick from gallery
  const handlePickImage = async () => {
    const ok = await requestMediaPermissions();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
      setResult(null);
      setError(null);
    }
  };

  // Take photo
  const handleTakePhoto = async () => {
    const ok = await requestCameraPermissions();
    if (!ok) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
      setResult(null);
      setError(null);
    }
  };

  // Upload to backend
  const handleUploadToWardrobe = async () => {
    if (!imageUri) {
      Alert.alert("No image", "Please choose or take a photo first.");
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      const filename = imageUri.split("/").pop() ?? "item.jpg";
      const extMatch = /\.(\w+)$/.exec(filename);
      const fileType = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

      formData.append("file", {
        uri: imageUri,
        name: filename,
        type: fileType,
      } as any);

      const response = await fetch(`${API_BASE_URL}/api/v1/wardrobe/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to upload");
      }

      const data = (await response.json()) as DetectedClothingItem;
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Upload a clothing item</Text>
      <Text style={styles.subtitle}>
        Add new pieces to your wardrobe by taking a photo or selecting one from
        your gallery.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>Choose from gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline} onPress={handleTakePhoto}>
          <Text style={styles.buttonOutlineText}>Take a photo</Text>
        </TouchableOpacity>
      </View>
      {imageUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.uploadButton,
          (!imageUri || uploading) && { opacity: 0.6 },
        ]}
        disabled={!imageUri || uploading}
        onPress={handleUploadToWardrobe}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.uploadButtonText}>Add to wardrobe</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.sectionTitle}>Item Added!</Text>
          <Text style={styles.resultItem}>Name: {result.name}</Text>
          <Text style={styles.resultItem}>Category: {result.category}</Text>
          <Text style={styles.resultItem}>
            Confidence: {(result.confidence * 100).toFixed(1)}%
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#f9fafb",
    fontWeight: "600",
  },
  buttonOutline: {
    flex: 1,
    borderColor: "#4f46e5",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  previewContainer: {
    marginTop: 24,
  },
  previewImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  uploadButton: {
    marginTop: 24,
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#022c22",
    fontWeight: "700",
    fontSize: 15,
  },
  resultBox: {
    backgroundColor: "#111827",
    marginTop: 20,
    borderRadius: 14,
    padding: 16,
  },
  resultItem: {
    color: "#d1d5db",
    marginBottom: 4,
  },
  errorText: {
    color: "tomato",
    marginTop: 12,
    fontSize: 14,
  },
});
