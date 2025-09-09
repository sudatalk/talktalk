import { View, StyleSheet } from "react-native";

export default function ProgressBar({ ratio }: { ratio: number }) {
  const grayRatio = Math.min(Math.max(ratio, 0), 1);

  return (
    <View style={styles.barWrapper}>
      <View style={styles.barBg} />
      <View style={[styles.barWhite, { width: `${(1 - grayRatio) * 100}%` }]} />
      <View style={[styles.barGray, { width: `${grayRatio * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    flex: 1,
    height: 12,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  barBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  barWhite: {
    position: "absolute",
    left: 0,
    height: 12,
    backgroundColor: "#fff",
  },
  barGray: {
    position: "absolute",
    right: 0,
    height: 12,
    backgroundColor: "#4a4a4a",
  },
});