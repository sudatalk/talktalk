import { RoomResponse } from "@/types/room";
import { Pressable, Text, StyleSheet } from "react-native";
import { formatTime } from "@/utils/date";
import { View } from "react-native";

export default function FooterButton({ room, onPress, isEnded }: { room: RoomResponse; onPress: () => void; isEnded: boolean }) {
  return (
    <View style={styles.footerRow}>
      {isEnded ? (
        <Text style={styles.endedText}>종료됨</Text>
      ) : (
        <Pressable style={styles.joinButton} onPress={onPress}>
          <Text style={styles.joinText}>참여하기</Text>
        </Pressable>
      )}
      {!isEnded && room.expiredAt && <Text style={styles.expiredAtText}>{formatTime(room.expiredAt)}에 종료</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  joinButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  joinText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },
  endedText: {
    color: "#cfcfcf",
    fontSize: 14,
    fontWeight: "800",
  },
  expiredAtText: {
    position: "absolute",
    right: 0,
    color: "#cfcfcf",
    fontSize: 12,

    textAlign: "center",
  },
});
