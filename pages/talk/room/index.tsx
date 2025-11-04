import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { ChatEventType } from '@/hooks/useChatWS';
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

  const renderItem = ({ item: msg }: { item: any }) => {
    if (msg.type === ChatEventType.MESSAGE) {
      const { team, nickname, message, profileUrl } = msg.data || {};
      return (
        <ChatBubble
          team={team}
          nickname={nickname}
          text={message}
          profileImage={profileUrl}
        />
      );
    }
    if (msg.type === ChatEventType.ENTER) {
      const { nickname } = msg.data || {};
      return (
        <ChatSystemMessage text={`${nickname ?? '사용자'} 님이 입장하셨습니다.`} />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ChatHeader title={title} endTime={expiredAt} />
        <ChatMeter
          leftTeam={leftTeam}
          rightTeam={rightTeam}
          leftCount={leftCount}
          rightCount={rightCount}
        />

        <FlatList
          data={messages}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          style={{ flex: 1 }}                          // ★ 본문이 리사이즈될 대상
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
        <ChatInput onPlusPress={handleOpen} onSend={handleSendMessage} />
        <TeamChangeModal
            roomId={roomId}
            userId={userId}
            isOpen={isOpen}
            handleClose={handleClose}
          />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050505' },
});
