import { RoomResponse, RoomStatus } from "@/types/room";
import { Pressable, Text, StyleSheet } from "react-native";

import { View } from "react-native";

const convertDate = (date: string) => {
  const d = new Date(date);

  const years = d.getFullYear();
  const months = (d.getMonth() + 1).toString().padStart(2, "0");
  const days = d.getDate().toString().padStart(2, "0");

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${years}년 ${months}월 ${days}일\n${hours}시 ${minutes}분`;
};

export default function FooterButton({ room, onPress }: { room: RoomResponse; onPress: () => void }) {
  return (
    <View style={styles.footerRow}>
      {room.status === RoomStatus.ON ? (
        <Pressable style={styles.joinButton} onPress={onPress}>
          <Text style={styles.joinText}>참여하기</Text>
        </Pressable>
      ) : (
        <Text style={styles.endedText}>종료됨</Text>
      )}
      {room.expiredAt && <Text style={styles.expiredAtText}>{convertDate(room.expiredAt)}</Text>}
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
