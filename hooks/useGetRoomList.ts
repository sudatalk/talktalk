import { getRoomDetail, getRoomList } from "@/services/room";
import { RoomResponse } from "@/types/room";
import { useEffect, useState } from "react";

const useGetRoomList = () => {
  const [roomList, setRoomList] = useState<RoomResponse[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getRoomList();

      setRoomList(data);
    })();
  }, []);

  const refetch = async () => {
    const { data } = await getRoomList();

    setRoomList(data);
  };

  return { roomList, refetch };
};

export default useGetRoomList;
