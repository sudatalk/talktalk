import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import useGetRoomList from "@/hooks/useGetRoomList";
import useDisclosure from "@/hooks/useDisclosure";
import CreateTalkModal from "./components/CreateTalkModal";
import JoinTalkModal from "./components/JoinTalkModal";
import useJoinTalkModal from "./hooks/useJoinTalkModal";
import RoomCard from "./components/RoomCard/RoomCard";
import { useDeviceId } from "@/hooks/useDeviceId";

export default function RoomListPage() {
  const { data } = useGetRoomList({
    page: 0,
    size: 10,
    options: {
      refetchOnMount: true,
    },
  });

  const userId = useDeviceId();

  const { isOpen: isOpenCreateTalkModal, handleOpen: handleOpenCreateTalkModal, handleClose: handleCloseCreateTalkModal } = useDisclosure();

  const { roomId, isOpenJoinTalkModal, handleCloseJoinTalkModal, handleOpenJoinTalkModal } = useJoinTalkModal();

  const handleClickJoinButton = (id: number) => {
    handleOpenJoinTalkModal(id);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>토론방</Text>
        <Pressable style={styles.createButton} onPress={handleOpenCreateTalkModal}>
          <Text style={styles.createButtonText}>방 만들기</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RoomCard room={item} onPress={handleClickJoinButton} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      />
      <CreateTalkModal isOpen={isOpenCreateTalkModal} handleClose={handleCloseCreateTalkModal} />
      <JoinTalkModal roomId={roomId} userId={userId} isOpen={isOpenJoinTalkModal} handleClose={handleCloseJoinTalkModal} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 27,
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
