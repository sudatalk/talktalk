import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreateTalkModal from "./pages/talk-list/components/CreateTalkModal";
import useDisclosure from "./hooks/useDisclosure";
import Toast from "./components/Toast";
import JoinTalkModal from "./pages/talk-list/components/JoinTalkModal";
import RoomList from "./pages/talk-list";
export default function App() {
  const { isOpen: isOpenCreateTalkModal, handleOpen: handleOpenCreateTalkModal, handleClose: handleCloseCreateTalkModal } = useDisclosure();

  const { isOpen: isOpenJoinTalkModal, handleOpen: handleOpenJoinTalkModal, handleClose: handleCloseJoinTalkModal } = useDisclosure();

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <RoomList openJoinTalkModal={handleOpenJoinTalkModal} openCreateTalkModal={handleOpenCreateTalkModal} />
        <CreateTalkModal isOpen={isOpenCreateTalkModal} handleClose={handleCloseCreateTalkModal} />
        <JoinTalkModal isOpen={isOpenJoinTalkModal} handleClose={handleCloseJoinTalkModal} />
        <Toast />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
