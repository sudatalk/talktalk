import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import useGetRoomList from "@/hooks/useGetRoomList";
import useDisclosure from "@/hooks/useDisclosure";
import CreateTalkModal from "./components/CreateTalkModal";
import JoinTalkModal from "./components/JoinTalkModal";
import useJoinTalkModal from "./hooks/useJoinTalkModal";
import { useDeviceId } from "@/hooks/useDeviceId";
import RoomList from "./components/RoomList";
import { useQueryClient } from "@tanstack/react-query";
import { getRoomUserInfoQueryFn, getRoomUserInfoQueryKey } from "@/hooks/useGetRoomUserInfo";
import { getErrorData } from "@/utils/error";
import { NOT_FOUND_ROOM_USER_INFO_CODE } from "./constants/error";
import { RootStackNavigationProp } from "@/RootStack";
import { useNavigation } from "@react-navigation/native";
import Footer from "./components/Footer";
export default function RoomListPage() {
  const { roomList, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetRoomList({options: {refetchOnMount: true}});

  const userId = useDeviceId();

  const { isOpen: isOpenCreateTalkModal, handleOpen: handleOpenCreateTalkModal, handleClose: handleCloseCreateTalkModal } = useDisclosure();

  const { roomId, isOpenJoinTalkModal, handleCloseJoinTalkModal, handleOpenJoinTalkModal } = useJoinTalkModal();

  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleClickJoinButton = async (roomId: number) => {
    if (!userId) return;

    try {
      await queryClient.fetchQuery({
        queryKey: getRoomUserInfoQueryKey({ roomId, userId }),
        queryFn: () => getRoomUserInfoQueryFn(roomId, userId),
      });

      navigation.navigate("/room", { roomId, userId });
    } catch (error) {
      const { status } = getErrorData(error);

      if (status === NOT_FOUND_ROOM_USER_INFO_CODE) {
        handleOpenJoinTalkModal(roomId);
      }
    }
  };

  const handleEndReached = () => {
    if (!hasNextPage) return;

    fetchNextPage();
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>토론방</Text>
        <Pressable style={styles.createButton} onPress={handleOpenCreateTalkModal}>
          <Text style={styles.createButtonText}>방 만들기</Text>
        </Pressable>
      </View>
      <RoomList data={roomList} handleClickJoinButton={handleClickJoinButton} handleEndReached={handleEndReached} isLoading={isFetchingNextPage} />
      <Footer />
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
});
