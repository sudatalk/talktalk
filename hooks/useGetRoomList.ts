import { getRoomList } from "@/services/room";
import { UseQueryOptions } from "@/types/base";
import { RoomResponse } from "@/types/room";
import { QueryKey, useQuery } from "@tanstack/react-query";

export const getRoomListQueryKey: QueryKey = ["GET_ROOM_LIST"];

const getRoomListQueryFn = getRoomList;

type Props = {
  page?: number;
  size?: number;
  options?: UseQueryOptions<RoomResponse[]>;
};

const useGetRoomList = (props: Props = {}) => {
  const { page, size, options } = props;

  return useQuery({
    queryKey: getRoomListQueryKey,
    queryFn: () => getRoomListQueryFn({ page, size }),
    ...options,
  });
};

export default useGetRoomList;
