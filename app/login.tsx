// app/login.tsx
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Login() {
  return (
    <View style={styles.container}>
      {/* Decorative Circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Log In</Text>

        <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#999" style={styles.input} secureTextEntry />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <Link href="/signup" asChild>
          <Pressable style={styles.signupLink}>
            <Text style={styles.signupLinkText}>Don't have an account? Sign Up</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ececec", // Slightly darker background
    position: "relative",
  },

  // Decorative circles
  circleOne: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#00BFA6", // teal
    top: -50,
    right: -50,
    opacity: 0.2,
  },
  circleTwo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00BFA6",
    bottom: -30,
    left: -30,
    opacity: 0.15,
  },

  scrollContainer: { 
    padding: 20, 
    flexGrow: 1, 
    justifyContent: "center" 
  },

  title: { fontSize: 28, fontWeight: "700", color: "#222", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  button: {
    backgroundColor: "#00BFA6", // teal button
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  signupLink: { alignItems: "center", marginTop: 10 },
  signupLinkText: { color: "#007AFF", fontSize: 14 },
});
