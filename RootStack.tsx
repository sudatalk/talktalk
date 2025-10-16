import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import RoomListPage from "./pages/talk/list";
import RoomPage from "./pages/talk/room";
export type RootStackParamsList = {
  "/": undefined;
  "/room": { roomId: number; userId: string};
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

const Stack = createNativeStackNavigator<RootStackParamsList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={RoomListPage} />
      <Stack.Screen name="/room" component={RoomPage} />
    </Stack.Navigator>
  );
}

export default RootStack;
