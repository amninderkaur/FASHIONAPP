// app/signup.tsx 
// /* css in this document needs to be applied to the register page, then this file can be deleted */
import { Link } from "expo-router";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Signup() {
  return (
    <View style={styles.container}>
      {/* Decorative Circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create new account</Text>

        <TextInput placeholder="Name" placeholderTextColor="#999" style={styles.input} />
        <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#999" style={styles.input} secureTextEntry />
        <TextInput placeholder="Date of Birth" placeholderTextColor="#999" style={styles.input} />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Link href="/login" asChild>
          <Pressable style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Already have an account? Log In</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ececec", // Slightly darker than white
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

  title: { fontSize: 28, fontWeight: "700", color: "#222", marginBottom: 6 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },

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

  loginLink: { alignItems: "center", marginTop: 10 },
  loginLinkText: { color: "#007AFF", fontSize: 14 },
});
