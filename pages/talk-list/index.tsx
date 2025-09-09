import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import RoomCard from "./components/RoomCard/RoomCard";
import { Room, RoomStatus } from "@/types/room";

const MOCK: Room[] = [
  { id: "1", title: "가나다라마바사가나", leftTeam: "무슨 팀 선택할래", rightTeam: "부먹", leftCount: 5, rightCount: 5, progress: 0.62, expiredAt: "14:45에 종료", status: RoomStatus.OPEN },
  { id: "2", title: "가나다라마바사가나\n다라마바사가나다라마바", leftTeam: "찍먹 찍먹 찍먹 찍먹", rightTeam: "부먹", leftCount: 5, rightCount: 5, progress: 0.62, expiredAt: "14:45에 종료", status: RoomStatus.OPEN },
  { id: "3", title: "가나다라마바사가나", leftTeam: "찍먹찍먹찍먹찍먹", rightTeam: "부먹", leftCount: 5, rightCount: 5, progress: 0.62, status: RoomStatus.CLOSED },
];

interface RoomListProps {
  openJoinTalkModal: () => void;
  openCreateTalkModal: () => void;
}

export default function RoomList({ openJoinTalkModal, openCreateTalkModal }: RoomListProps) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>토론방</Text>
        <Pressable style={styles.createButton} onPress={openCreateTalkModal}>
          <Text style={styles.createButtonText}>방 만들기</Text>
        </Pressable>
      </View>

      <FlatList
        data={MOCK}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoomCard room={item} onPress={openJoinTalkModal} />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
  },
  createButton: {
    position: "absolute",
    right: 20,
    top: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
});