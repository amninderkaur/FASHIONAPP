// app/(tabs)/upload-outfit.tsx
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

//to connect to backend
//const API_BASE_URL = '????'; 
const API_BASE_URL = '';


type OutfitRecommendation = {
  id: string;
  title: string;
  description: string;
  score?: number; // confidence / rating
};

export default function UploadOutfitScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const requestMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos to upload outfits.');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your camera to take outfit photos.');
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const ok = await requestMediaPermissions();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setRecommendations([]);
      setError(null);
    }
  };

  const handleTakePhoto = async () => {
    const ok = await requestCameraPermissions();
    if (!ok) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setRecommendations([]);
      setError(null);
    }
  };

  const handleAnalyzeOutfit = async () => {
    if (!imageUri) {
      Alert.alert('No image', 'Please select or capture an outfit photo first.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      setRecommendations([]);

      // Build FormData for multipart upload
      const formData = new FormData();

      const filename = imageUri.split('/').pop() ?? 'outfit.jpg';
      const fileTypeMatch = /\.(\w+)$/.exec(filename);
      const fileType = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image/jpeg';

      formData.append('file', {
        uri: imageUri,
        name: filename,
        type: fileType,
      } as any);

      // make sure Spring Boot endpoint matches this route
     const response = await fetch(`${API_BASE_URL}/api/v1/outfits/analyze`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type manually; let fetch + FormData handle it
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to analyze outfit');
      }

      // backend response should be: { recommendations: OutfitRecommendation[] }
      const data = (await response.json()) as { recommendations: OutfitRecommendation[] };

      setRecommendations(data.recommendations ?? []);
    } catch (err: any) {
      console.error('Analyze outfit error:', err);
      setError(err.message ?? 'Something went wrong analyzing your outfit.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>
        Upload your outfit
      </Text>
      <Text style={[styles.subtitle, { color: '#9ca3af' }]}>
        Take a photo or choose one from your gallery. We’ll analyze what you’re wearing
        and suggest ways to upgrade or style it.
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
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Preview
          </Text>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.analyzeButton,
          (!imageUri || isAnalyzing) && styles.analyzeButtonDisabled,
        ]}
        onPress={handleAnalyzeOutfit}
        disabled={!imageUri || isAnalyzing}
      >
        {isAnalyzing ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.analyzeButtonText}>Analyze outfit</Text>
        )}
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Recommendations
          </Text>
          {recommendations.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recDescription}>{rec.description}</Text>
              {typeof rec.score === 'number' && (
                <Text style={styles.recScore}>
                  Confidence: {(rec.score * 100).toFixed(0)}%
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f9fafb',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonOutline: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4f46e5',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#4f46e5',
    fontWeight: '600',
    fontSize: 14,
  },
  previewContainer: {
    marginTop: 24,
  },
  previewImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  analyzeButton: {
    marginTop: 24,
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  analyzeButtonDisabled: {
    opacity: 0.6,
  },
  analyzeButtonText: {
    color: '#022c22',
    fontWeight: '700',
    fontSize: 15,
  },
  errorText: {
    marginTop: 12,
    color: '#f97373',
    fontSize: 13,
  },
  recommendationsContainer: {
    marginTop: 24,
    gap: 12,
  },
  recommendationCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  recTitle: {
    color: '#f9fafb',
    fontWeight: '600',
    marginBottom: 4,
  },
  recDescription: {
    color: '#d1d5db',
    fontSize: 13,
  },
  recScore: {
    marginTop: 6,
    fontSize: 12,
    color: '#9ca3af',
  },
});
