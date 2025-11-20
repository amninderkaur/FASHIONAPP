// app/profile.tsx
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Account Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: "https://placekitten.com/200/200" }} // placeholder profile image
          style={styles.avatar}
        />
        <Text style={styles.name}>Nabia Mahmood</Text>
        <Text style={styles.email}>nabia@example.com</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Orders</Text>
          <Text style={styles.infoNumber}>120</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Pending</Text>
          <Text style={styles.infoNumber}>8</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Wishlist</Text>
          <Text style={styles.infoNumber}>24</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: "#008080" }]}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>

      {/* Back Link */}
      <Link href="/" asChild>
        <Pressable style={{ marginTop: 20 }}>
          <Text style={{ color: "#007AFF" }}>Back to Dashboard</Text>
        </Pressable>
      </Link>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ececec" },

  header: { padding: 20, alignItems: "center" },
  headerText: { fontSize: 24, fontWeight: "700", color: "#222" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "700", color: "#222" },
  email: { fontSize: 14, color: "#666", marginTop: 4 },

  infoContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  infoCard: {
    backgroundColor: "#d2f5f1", // light mint highlight
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
  infoTitle: { fontSize: 14, color: "#222", marginBottom: 5 },
  infoNumber: { fontSize: 18, fontWeight: "700", color: "#008080" },

  button: {
    backgroundColor: "#00BFA6", // teal
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
