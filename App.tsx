import { ActivityIndicator, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "./components/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";

import RootStack from "./RootStack";
import { useDeviceId } from "./hooks/useDeviceId";
import Maintenance from "./Maintenance";

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

const queryClient = new QueryClient();

export default function App() {
  const deviceId = useDeviceId();

  if (!deviceId) {
    return <ActivityIndicator style={{ paddingTop: 15 }} />;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="light" />
            <Maintenance>
              <RootStack />
            </Maintenance>
            <Toast />
          </SafeAreaView>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: 0,
  },
});
