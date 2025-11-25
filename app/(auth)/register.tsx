import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet
} from "react-native";
import { register } from "../../api/auth";
import { saveToken } from "../../utils/token";
export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // HANDLE REGISTER
  // ----------------------------
  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirm.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
       const data = await register(email, password);
      saveToken(data.token);
      alert("Registered successfully!");
      // -------------------------------------------------------
      // TODO: When backend is ready, replace with real API:
      //
      // const res = await fetch("http://your-api/api/v1/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      //
      // const data = await res.json();
      //
      // Save JWT token when backend exists:
      // await AsyncStorage.setItem("authToken", data.token);
      // router.replace("/(tabs)");
      //
      // -------------------------------------------------------

      // TEMPORARY: allow app to work without backend
      setTimeout(() => {
        setLoading(false);
        alert("Registered! (fake mode, backend not connected)");
        router.replace("/(auth)/login");
      }, 800);
    } catch (err) {
      console.error(err);
      alert("Registration failed (waiting for backend).");
      setLoading(false);
    }
  };


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeede8",  // Background
    position: "relative",
    paddingHorizontal: 20,
  },

  // Decorative circles replaced with PRIMARY + SECONDARY
  circleOne: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#c0d1bf",  // Primary
    top: -50,
    right: -50,
    opacity: 0.35,
  },

  circleTwo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#b9d6da", // Secondary
    bottom: -30,
    left: -30,
    opacity: 0.30,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 60,
  },

  // Title (ON BACKGROUND)
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#233443",  // On Background
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#96b7bc", // Secondary Variant (nice muted look)
    textAlign: "center",
    marginBottom: 20,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#a3bfa9", // Primary Variant border
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#233443",       // On Background (text color)
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  button: {
    backgroundColor: "#c0d1bf", // Primary Button
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  buttonText: {
    color: "#233443",
    fontSize: 16,
    fontWeight: "700",
  },

  loginLink: {
    alignItems: "center",
    marginTop: 10,
  },

  loginLinkText: {
    color: "#96b7bc",   // Secondary Variant
    fontSize: 14,
    fontWeight: "600",
  },
});

