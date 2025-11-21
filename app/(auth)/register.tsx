import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

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
