import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { StyleSheet, Platform, KeyboardAvoidingView, FlatList, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatHeader from "./components/ChatHeader";
import ChatMeter from "./components/ChatMeter";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import ChatSystemMessage from "./components/ChatSystemMessage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@/RootStack";
import useGetRoom from "@/hooks/useGetRoom";
import useDisclosure from "@/hooks/useDisclosure";
import TeamChangeModal from "./components/TeamChangeModal";
import { ChatEventType } from "@/hooks/useChatWS";
import { useChatWS } from "@/hooks/useChatWS";
import { useExitOnExpire } from "@/hooks/useExitOnExpire";
import { useNavigation } from "@react-navigation/native";
import { Team } from "@/types/chat";
import useGetChatLogs from "@/hooks/useGetChatLogs";

export default function RoomPage(props: NativeStackScreenProps<RootStackParamsList, "/room">) {
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
      const first = messages[0];

      if (first.type === ChatEventType.ROOM) {
        setLeftCount(first.data?.leftCount ?? 0);
        setRightCount(first.data?.rightCount ?? 0);
      }
    }
  }, [messages]);

  if (!roomInfo) return null;

  const { title, leftTeam, rightTeam, expiredAt } = roomInfo;

  const mergedMessages = useMemo(() => [...messages, ...logs], [logs, messages]);
  const listRef = useRef<FlatList<any>>(null);

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!message?.trim()) return;
      sendMessage(message);
    },
    [sendMessage]
  );

  const handleTeamChange = useCallback(
    (team: Team) => {
      sendRoomChange(team);
    },
    [sendRoomChange]
  );

  const renderItem = ({ item: msg }: { item: any }) => {
    if (msg.message) {
      const { message, team, nickname, profileUrl } = msg;
      return <ChatBubble team={team} nickname={nickname} text={message} profileImage={profileUrl} />;
    }
    if (msg.type === ChatEventType.MESSAGE) {
      const { team, nickname, message, profileUrl } = msg.data || {};
      return <ChatBubble team={team} nickname={nickname} text={message} profileImage={profileUrl} />;
    }
    if (msg.type === ChatEventType.ENTER) {
      const { nickname } = msg.data || {};
      return <ChatSystemMessage text={`${nickname ?? "사용자"} 님이 입장하셨습니다.`} />;
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 60}>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <ChatHeader title={title} endTime={expiredAt} />
        <ChatMeter leftTeam={leftTeam} rightTeam={rightTeam} leftCount={leftCount} rightCount={rightCount} />
        <FlatList
          ref={listRef}
          data={mergedMessages}
          inverted
          keyExtractor={(_, i) => String(i)}
          renderItem={renderItem}
          ListHeaderComponent={
            isFetchingNextPage ? (
              <View style={{ paddingVertical: 8 }}>
                <ActivityIndicator />
              </View>
            ) : null
          }
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onEndReached={hasNextPage && !isFetchingNextPage ? () => fetchNextPage() : undefined}
          onEndReachedThreshold={0.5}
        />
        <ChatInput onPlusPress={handleOpen} onSend={handleSendMessage} />
        <TeamChangeModal roomId={roomId} userId={userId} isOpen={isOpen} handleClose={handleClose} handleTeamChange={handleTeamChange} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#050505" },
});
