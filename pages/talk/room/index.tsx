import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, FlatList, ActivityIndicator, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
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
import { Team } from '@/types/chat';
import useGetChatLogs from '@/hooks/useGetChatLogs';

export default function RoomPage(
  props: NativeStackScreenProps<RootStackParamsList, '/room'>
) {
  const { route } = props;
  const { roomId, userId } = route.params;

  const { isOpen, handleOpen, handleClose } = useDisclosure();

  const { data: roomInfo } = useGetRoom({ id: roomId });
  const [leftCount, setLeftCount] = useState<number>(roomInfo?.leftCount ?? 0);
  const [rightCount, setRightCount] = useState<number>(roomInfo?.rightCount ?? 0);
  const { events: messages, sendMessage, sendRoomChange } = useChatWS({ userId, roomId });
  const navigation = useNavigation();
  // 과거 채팅 로그 조회
  const { logs, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetChatLogs({ chatId: roomId });
  useExitOnExpire(roomInfo?.expiredAt, () => {
    if (navigation.canGoBack()) navigation.goBack();
  });

  useEffect(() => {
    if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.type === ChatEventType.ROOM) {
        console.log('room', last);
        setLeftCount(last.data?.leftCount ?? 0);
        setRightCount(last.data?.rightCount ?? 0);
      }
    }
  }, [messages]);

  if (!roomInfo) return null;

  const { title, leftTeam, rightTeam, expiredAt } = roomInfo;

  const mergedMessages = useMemo(() => [...logs, ...messages], [logs, messages]);
  const listRef = useRef<FlatList<any>>(null);
  const prevContentHeightRef = useRef(0);
  const [isPrepending, setIsPrepending] = useState(false);
  const TOP_THRESHOLD = 60; // px

  // 위로 스크롤 시 과거 페이지 더 가져오기
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      if (y <= TOP_THRESHOLD && hasNextPage && !isFetchingNextPage) {
        setIsPrepending(true);
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const handleContentSizeChange = useCallback(
    (h: number) => {
      if (isPrepending) {
        const prev = prevContentHeightRef.current || 0;
        const delta = h - prev;
        listRef.current?.scrollToOffset({
          offset: delta,
          animated: false,
        });
        setIsPrepending(false);
      }
      prevContentHeightRef.current = h;
    },
    [isPrepending]
  );

  // 새 라이브 메시지 도착 시 “아래에 있을 때만” 자동 스크롤 (사용자 과거 읽는 중이면 방해 X)
  const [isAtBottom, setIsAtBottom] = useState(true);
  const handleMomentumScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset;
    const { height: layoutH } = e.nativeEvent.layoutMeasurement;
    const { height: contentH } = e.nativeEvent.contentSize;
    const nearBottom = y + layoutH >= contentH - 20;
    setIsAtBottom(nearBottom);
  }, []);
  // messages가 갱신될 때 최신이 보이도록
  useEffect(() => {
    if (isAtBottom) {
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  }, [mergedMessages.length, isAtBottom]);

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!message?.trim()) return;
      sendMessage(message);
    },
    [sendMessage]
  );

  const handleTeamChange = useCallback((team: Team) => {
    sendRoomChange(team);
  }, [sendRoomChange]);

  const renderItem = ({ item: msg }: { item: any }) => {
    if (msg.message) {
      const { message, team, nickname, profileUrl } = msg;
      return (
        <ChatBubble team={team} nickname={nickname} text={message} profileImage={profileUrl} />
      );
    }
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
          ref={listRef}
          data={mergedMessages}
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          onContentSizeChange={handleContentSizeChange}
          ListHeaderComponent={
            isFetchingNextPage
              ? <View style={{ paddingVertical: 8 }}><ActivityIndicator /></View>
              : null
          }
          onLayout={() => requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: false }))}
          style={{ flex: 1 }}
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
            handleTeamChange={handleTeamChange}
          />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050505' },
});
