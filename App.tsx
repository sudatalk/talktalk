import { Dimensions, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "./components/Toast";
import RoomList from "./pages/talk-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SCREEN_HEIGHT = Dimensions.get("screen").height; // device height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
          <ExpoStatusBar style="light" />
          <RoomList />
          <Toast />
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
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
