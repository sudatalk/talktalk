import { Room, RoomStatus } from "@/types/room";
import { Pressable, Text, StyleSheet } from "react-native";

import { View } from "react-native";

export default function FooterButton({ room, onPress }: { room: Room; onPress: () => void }) {
  return(
    <View style={styles.footerRow}>
        {room.status === RoomStatus.OPEN ? (
          <Pressable style={styles.joinButton} onPress={onPress}>
            <Text style={styles.joinText}>참여하기</Text>
          </Pressable>
        ) : (
          <Text style={styles.endedText}>종료됨</Text>
        )}
        {room.expiredAt && <Text style={styles.expiredAtText}>{room.expiredAt}</Text>}
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
    },
  });