import { getChatUser } from "@/services/chat";
import { ChatResponse } from "@/types/chat";
import { useEffect, useState } from "react";

type Props = {
  roomId?: number;
  userId?: string;
};

const useGetRoomUserInfo = (props: Props) => {
  const { roomId, userId } = props;

  const [roomUserInfo, setRoomUserInfo] = useState<ChatResponse>();

  useEffect(() => {
    if (!roomId || !userId) return;

    (async () => {
      const { data } = await getChatUser({ roomId, userId });
      setRoomUserInfo(data);
    })();
  }, [roomId, userId]);

  const refetch = () => {
    if (!roomId || !userId) return;

    (async () => {
      const { data } = await getChatUser({ roomId, userId });
      setRoomUserInfo(data);
    })();
  };

  return { roomUserInfo, refetch };
};

export default useGetRoomUserInfo;
