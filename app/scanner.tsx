import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Link } from "expo-router";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  const { width, height } = Dimensions.get("window");
  const frameSize = width * 0.7;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setData(data);
    Alert.alert("QR Scanned!", `Data: ${data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <Button title="Allow Camera" onPress={() => BarCodeScanner.requestPermissionsAsync()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay with transparent edges */}
      <View style={styles.overlay}>
        {/* Top */}
        <View style={[styles.overlaySection, { height: (height - frameSize) / 2 }]} />
        <View style={styles.middleRow}>
          {/* Left */}
          <View style={[styles.overlaySection, { width: (width - frameSize) / 2 }]} />
          {/* Frame */}
          <View style={[styles.frame, { width: frameSize, height: frameSize }]} />
          {/* Right */}
          <View style={[styles.overlaySection, { width: (width - frameSize) / 2 }]} />
        </View>
        {/* Bottom */}
        <View style={[styles.overlaySection, { height: (height - frameSize) / 2 }]} />
      </View>

      {scanned && (
        <Button
          title="Scan Again"
          onPress={() => {
            setScanned(false);
            setData("");
          }}
        />
      )}

      {data ? (
        <View style={styles.result}>
          <Text style={styles.resultText}>Scanned Data:</Text>
          <Text style={styles.resultData}>{data}</Text>
        </View>
      ) : null}

      <Link href="/" asChild>
        <Button title="Back to Dashboard" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  middleRow: { flexDirection: "row" },
  overlaySection: { backgroundColor: "rgba(0,0,0,0.5)" },

  frame: {
    borderWidth: 3,
    borderColor: "#007AFF",
    borderRadius: 12,
  },

  result: {
    position: "absolute",
    bottom: 120,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
  },
  resultText: { fontWeight: "bold", marginBottom: 5 },
  resultData: { color: "#007AFF" },
});
