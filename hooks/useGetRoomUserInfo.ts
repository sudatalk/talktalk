import { getChatUser } from "@/services/chat";
import { UseQueryOptions } from "@/types/base";
import { ChatResponse } from "@/types/chat";
import { useFocusEffect } from "@react-navigation/native";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type Props = {
  roomId?: number;
  userId?: string;
  options?: UseQueryOptions<ChatResponse>;
};

export const getRoomUserInfoQueryKey = (props: Props) => ["GET_ROOM_USER_INFO", props];

export const getRoomUserInfoQueryFn = (roomId: number, userId: string) => getChatUser({ roomId, userId });

const useGetRoomUserInfo = (props: Props) => {
  const { roomId, userId, options } = props;

  const result = useQuery({
    queryKey: getRoomUserInfoQueryKey(props),
    queryFn: roomId && userId ? () => getRoomUserInfoQueryFn(roomId, userId) : skipToken,
    ...options,
  });

  useFocusEffect(
    useCallback(() => {
      result.refetch();
    }, [])
  );

  return result;
};

export default useGetRoomUserInfo;
