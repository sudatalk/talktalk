import { getRoomDetail } from "@/services/room";
import { UseQueryOptions } from "@/types/base";
import { RoomResponse } from "@/types/room";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type Props = {
  id: number;
  options?: UseQueryOptions<RoomResponse>;
};

const getRoomDetailQueryKey = (props: Props) => ["GET_ROOM_DETAIL", props];
const getRoomDetailQueryFn = (props: Props) => () => getRoomDetail(props);

const useGetRoom = (props: Props) => {
  const result = useQuery({
    queryKey: getRoomDetailQueryKey(props),
    queryFn: getRoomDetailQueryFn(props),
    ...props.options,
  });

  useFocusEffect(
    useCallback(() => {
      result.refetch();
    }, [])
  );

  return result;
};

export default useGetRoom;
