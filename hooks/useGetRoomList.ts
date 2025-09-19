import { getRoomList } from "@/services/room";
import { UseQueryOptions } from "@/types/base";
import { RoomResponse } from "@/types/room";
import { QueryKey, useQuery } from "@tanstack/react-query";

export const getRoomListQueryKey: QueryKey = ["GET_ROOM_LIST"];

const getRoomListQueryFn = getRoomList;

type Props<T> = {
  options?: UseQueryOptions<RoomResponse[], T>;
};

const useGetRoomList = <T = RoomResponse[]>(props: Props<T> = {}) => {
  const { options } = props;

  return useQuery({
    queryKey: getRoomListQueryKey,
    queryFn: getRoomListQueryFn,
    ...options,
  });
};

export default useGetRoomList;
