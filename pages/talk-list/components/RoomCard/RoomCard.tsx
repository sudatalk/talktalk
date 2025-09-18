import { View, Text, StyleSheet } from "react-native";
import { RoomResponse } from "@/types/room";
import ProgressBar from "./ProgressBar";
import FooterButton from "./FooterButton";
export default function RoomCard({ room, onPress }: { room: RoomResponse; onPress: (id: number) => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {room.title}
      </Text>
      <View style={styles.row}>
        <View style={styles.team}>
          <Text style={styles.teamName}>{room.leftTeam}</Text>
          <Text style={styles.teamCount}>{room.leftCount}명</Text>
        </View>
        <ProgressBar room={room} />
        <View style={[styles.team]}>
          <Text style={styles.teamName} numberOfLines={2}>
            {room.rightTeam}
          </Text>
          <Text style={styles.teamCount}>{room.rightCount}명</Text>
        </View>
      </View>
      <FooterButton room={room} onPress={() => onPress(room.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0a0a0a",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
    borderRadius: 18,
    padding: 18,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  team: {
    width: 80,

    alignItems: "center",
  },
  teamName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  teamCount: {
    color: "#cfcfcf",
    fontSize: 12,
    marginTop: 4,
  },
});
