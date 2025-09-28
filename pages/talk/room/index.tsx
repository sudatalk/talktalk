import Text from "@/components/Text";
import useDisclosure from "@/hooks/useDisclosure";
import { RootStackParamsList } from "@/RootStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import TeamChangeModal from "./components/TeamChangeModal";
import useGetRoomUserInfo from "@/hooks/useGetRoomUserInfo";
import useGetRoom from "@/hooks/useGetRoom";

const RoomPage = (props: NativeStackScreenProps<RootStackParamsList, "/room">) => {
  const { route } = props;

  const { roomId, userId } = route.params;

  const { isOpen, handleOpen, handleClose } = useDisclosure();

  const { data: roomInfo } = useGetRoom({ id: roomId });

  const { data: userInfo } = useGetRoomUserInfo({
    roomId,
    userId,
  });

  return (
    <View>
      <Text white>룸 페이지</Text>
      <Text white>roomId: {roomId}</Text>
      <Text white>userId: {userId}</Text>
      <Button title="팀 변경 버튼" onPress={handleOpen} />

      <Text white>title : {roomInfo?.title}</Text>

      <Text white>nickname : {userInfo?.nickname}</Text>
      <Text white>team : {userInfo?.team}</Text>

      <TeamChangeModal roomId={roomId} userId={userId} isOpen={isOpen} handleClose={handleClose} />
    </View>
  );
};

export default RoomPage;
