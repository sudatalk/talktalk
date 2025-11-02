import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import ChatHeader from './components/ChatHeader';
import ChatMeter from './components/ChatMeter';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import ChatSystemMessage from './components/ChatSystemMessage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/RootStack';
import useGetRoom from '@/hooks/useGetRoom';
import useDisclosure from '@/hooks/useDisclosure';
import TeamChangeModal from './components/TeamChangeModal';
import { ChatEventType } from '@/hooks/useWebSocketChat';
import { useChatWS } from '@/hooks/useChatWS';
import { useExitOnExpire } from '@/hooks/useExitOnExpire';
import { useNavigation } from '@react-navigation/native';

export default function RoomPage(
  props: NativeStackScreenProps<RootStackParamsList, '/room'>
) {
  const { route } = props;
  const { roomId, userId } = route.params;

  const { isOpen, handleOpen, handleClose } = useDisclosure();

  const { data: roomInfo } = useGetRoom({ id: roomId });
  const [leftCount, setLeftCount] = useState<number>(roomInfo?.leftCount ?? 0);
  const [rightCount, setRightCount] = useState<number>(roomInfo?.rightCount ?? 0);
  const { events: messages, sendMessage } = useChatWS({ userId, roomId });
  const navigation = useNavigation();

  useExitOnExpire(roomInfo?.expiredAt, () => {
    if (navigation.canGoBack()) navigation.goBack();
  });

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.type !== ChatEventType.ENTER) return;

    const team = String(last.data?.team ?? '').toUpperCase();
    if (team === 'LEFT') setLeftCount((c) => c + 1);
    else if (team === 'RIGHT') setRightCount((c) => c + 1);
  }, [messages]);

  if (!roomInfo) return null;

  const { title, leftTeam, rightTeam, expiredAt } = roomInfo;

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!message?.trim()) return;
      sendMessage(message);
    },
    [sendMessage]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ChatHeader title={title} endTime={expiredAt} />
      <ChatMeter
        leftTeam={leftTeam}
        rightTeam={rightTeam}
        leftCount={leftCount}
        rightCount={rightCount}
      />

      {messages.map((msg, index) => {
        if (msg.type === ChatEventType.MESSAGE) {
          const { team, nickname, message, profileUrl } = msg.data || {};
          return (
            <ChatBubble
              key={index}
              team={team}
              nickname={nickname}
              text={message}
              profileImage={profileUrl}
            />
          );
        } else if (msg.type === ChatEventType.ENTER) {
          const { nickname } = msg.data || {};
          return (
            <ChatSystemMessage
              key={index}
              text={`${nickname ?? '사용자'} 님이 입장하셨습니다.`}
            />
          );
        }
        return null;
      })}

      <View style={{ flex: 1 }} />
      <ChatInput onPlusPress={handleOpen} onSend={handleSendMessage} />
      <TeamChangeModal
        roomId={roomId}
        userId={userId}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050505' },
});
