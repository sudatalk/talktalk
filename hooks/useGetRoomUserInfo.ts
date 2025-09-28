import { getChatUser } from "@/services/chat";
import { UseQueryOptions } from "@/types/base";
import { ChatResponse } from "@/types/chat";
import { skipToken, useQuery } from "@tanstack/react-query";

type Props = {
  roomId?: number;
  userId?: string;
  options?: UseQueryOptions<ChatResponse>;
};

export const getRoomUserInfoQueryKey = (props: Props) => ["GET_ROOM_USER_INFO", props];

export const getRoomUserInfoQueryFn = (roomId: number, userId: string) => getChatUser({ roomId, userId });

const useGetRoomUserInfo = (props: Props) => {
  const { roomId, userId, options } = props;

  return useQuery({
    queryKey: getRoomUserInfoQueryKey(props),
    queryFn: roomId && userId ? () => getRoomUserInfoQueryFn(roomId, userId) : skipToken,
    ...options,
  });
};

export default useGetRoomUserInfo;
