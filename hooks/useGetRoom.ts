import { getRoomDetail } from "@/services/room";
import { RoomResponse } from "@/types/room";
import { useEffect, useState } from "react";

type Props = {
  id: number;
};

const useGetRoom = (props: Props) => {
  const { id } = props;

  const [room, setRoom] = useState<RoomResponse>();

  useEffect(() => {
    (async () => {
      const { data } = await getRoomDetail({ id });

      setRoom(data);
    })();
  }, [id]);

  return { room };
};

export default useGetRoom;
