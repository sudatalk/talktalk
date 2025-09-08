import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreateTalkModal from "./pages/talk-list/components/CreateTalkModal";
import useDisclosure from "./hooks/useDisclosure";
import Toast from "./components/Toast";

export default function App() {
  const { isOpen, handleOpen, handleClose } = useDisclosure();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button title="채팅방 만들기 오픈" onPress={handleOpen} />
        <Button title="채팅방 참여 오픈" />
        <CreateTalkModal isOpen={isOpen} handleClose={handleClose} />
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
