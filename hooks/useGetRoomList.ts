import { getRoomList } from "@/services/room";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

export const getRoomListQueryKey: QueryKey = ["GET_ROOM_LIST"];

const getRoomListQueryFn = getRoomList;

type Props = {
  page?: number;
  size?: number;
};

const useGetRoomList = (props: Props = {}) => {
  const { page, size } = props;

  const result = useInfiniteQuery({
    queryKey: getRoomListQueryKey,
    queryFn: ({ pageParam }) => getRoomListQueryFn({ page: pageParam, size }),
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.totalPage) return;

      return lastPage.currentPage + 1;
    },
  });

  return { ...result, roomList: result.data?.pages.flatMap((value) => value.data) };
};

export default useGetRoomList;
