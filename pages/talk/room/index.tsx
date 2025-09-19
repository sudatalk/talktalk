import { RootStackParamsList } from "@/App";
import Text from "@/components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

const RoomPage = (props: NativeStackScreenProps<RootStackParamsList, "/room">) => {
  const { route } = props;

  const { roomId, userId } = route.params;

  return (
    <View>
      <Text white>룸 페이지</Text>
      <Text white>roomId: {roomId}</Text>
      <Text white>userId: {userId}</Text>
    </View>
  );
};

export default RoomPage;
