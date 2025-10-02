import { getRoomList } from "@/services/room";
import { UseInfiniteQueryOptions } from "@/types/base";
import { PaginationRoomResponse } from "@/types/room";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

export const getRoomListQueryKey: QueryKey = ["GET_ROOM_LIST"];

const getRoomListQueryFn = getRoomList;

type Props = {
  page?: number;
  size?: number;
  options?: UseInfiniteQueryOptions<PaginationRoomResponse>;
};

const useGetRoomList = (props: Props = {}) => {
  const { page, size, options } = props;

  const result = useInfiniteQuery({
    queryKey: getRoomListQueryKey,
    queryFn: ({ pageParam }) => getRoomListQueryFn({ page: pageParam || page, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.totalPage) return;

      return lastPage.currentPage + 1;
    },
    ...options,
  });

  return { ...result, roomList: result.data?.pages.flatMap((value) => value.data) };
};

export default useGetRoomList;
