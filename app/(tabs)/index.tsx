import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/Todo.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">A to-do list application</ThemedText>
        <ThemedText>
          Add, edit, and delete tasks.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 24,
    marginTop: 100,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 108,
  },
  reactLogo: {
    height: 298,
    width: 390,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
