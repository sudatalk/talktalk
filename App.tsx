import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreateTalkModal from "./pages/talk-list/components/CreateTalkModal";
import useDisclosure from "./hooks/useDisclosure";
import Toast from "./components/Toast";
import JoinTalkModal from "./pages/talk-list/components/JoinTalkModal";

export default function App() {
  const { isOpen: isOpenCreateTalkModal, handleOpen: handleOpenCreateTalkModal, handleClose: handleCloseCreateTalkModal } = useDisclosure();

  const { isOpen: isOpenJoinTalkModal, handleOpen: handleOpenJoinTalkModal, handleClose: handleCloseJoinTalkModal } = useDisclosure();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button title="채팅방 만들기 오픈" onPress={handleOpenCreateTalkModal} />
        <Button title="채팅방 참여 오픈" onPress={handleOpenJoinTalkModal} />
        <CreateTalkModal isOpen={isOpenCreateTalkModal} handleClose={handleCloseCreateTalkModal} />
        <JoinTalkModal isOpen={isOpenJoinTalkModal} handleClose={handleCloseJoinTalkModal} />
      </View>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
