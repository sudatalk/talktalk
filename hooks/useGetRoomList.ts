import { getRoomList } from "@/services/room";
import { UseQueryOptions } from "@/types/base";
import { RoomResponse } from "@/types/room";
import { QueryKey, useQuery } from "@tanstack/react-query";

export const getRoomListQueryKey: QueryKey = ["GET_ROOM_LIST"];

const getRoomListQueryFn = getRoomList;

type Props = {
  options?: UseQueryOptions<RoomResponse[]>;
};

const useGetRoomList = (props: Props = {}) => {
  const { options } = props;

  return useQuery({
    queryKey: getRoomListQueryKey,
    queryFn: getRoomListQueryFn,
    ...options,
  });
};

export default useGetRoomList;
