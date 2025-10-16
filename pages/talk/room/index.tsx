import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import ChatHeader from './components/ChatHeader';
import ChatMeter from './components/ChatMeter';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import ChatSystemMessage from './components/ChatSystemMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/RootStack';
import useGetRoomUserInfo from '@/hooks/useGetRoomUserInfo';
import useGetRoom from '@/hooks/useGetRoom';
import useDisclosure from '@/hooks/useDisclosure';
import TeamChangeModal from './components/TeamChangeModal';

const profileImage = require('assets/icon.png');
export default function RoomPage(props: NativeStackScreenProps<RootStackParamsList, "/room">) {
  const { route } = props;

  const { roomId, userId } = route.params;

  const { isOpen, handleOpen, handleClose } = useDisclosure();

  const { data: roomInfo } = useGetRoom({ id: roomId });

  const { data: userInfo } = useGetRoomUserInfo({
    roomId,
    userId,
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ChatHeader />
      <ChatMeter />

      <ChatBubble team="left" nickname="닉네임" text="가나다라마" profileImage={profileImage} />
      <ChatBubble team="right" nickname="닉네임" text="가나다라마" profileImage={profileImage} />

      <ChatSystemMessage text="닉네임1 님이 입장하셨습니다." />

      <View style={{ flex: 1 }} />
      <ChatInput onPlusPress={handleOpen}/>
      <TeamChangeModal roomId={roomId} userId={userId} isOpen={isOpen} handleClose={handleClose} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050505' },
});
