import { RoomResponse } from "@/types/room";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ room }: { room: RoomResponse }) {
  const leftRatio = room.leftCount / (room.leftCount + room.rightCount);
  const rightRatio = room.rightCount / (room.leftCount + room.rightCount);

  return (
    <View style={styles.barWrapper}>
      <View style={{ ...styles.barBg, justifyContent: "flex-end" }}>
        <View style={[styles.barWhite, { flex: leftRatio }]} />
      </View>
      <View style={{ ...styles.barBg, justifyContent: "flex-start" }}>
        <View style={[styles.barGray, { flex: rightRatio }]} />
      </View>
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

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    backgroundColor: "#1a1a1a",
  },
  barBg: {
    flex: 0.5,
    height: "100%",
    borderRadius: 8,

    flexDirection: "row",
  },
  barWhite: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  barGray: {
    backgroundColor: "#808080",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
