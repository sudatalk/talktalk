import { Dimensions, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreateTalkModal from "./pages/talk-list/components/CreateTalkModal";
import useDisclosure from "./hooks/useDisclosure";
import Toast from "./components/Toast";
import JoinTalkModal from "./pages/talk-list/components/JoinTalkModal";
import RoomList from "./pages/talk-list";

const SCREEN_HEIGHT = Dimensions.get("screen").height; // device height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;

export default function App() {
  const { isOpen: isOpenCreateTalkModal, handleOpen: handleOpenCreateTalkModal, handleClose: handleCloseCreateTalkModal } = useDisclosure();

  const { isOpen: isOpenJoinTalkModal, handleOpen: handleOpenJoinTalkModal, handleClose: handleCloseJoinTalkModal } = useDisclosure();

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <ExpoStatusBar style="light" />
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
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: BOTTOM_NAVIGATION_BAR_HEIGHT,
  },
});
