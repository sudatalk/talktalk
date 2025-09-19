import { getRoomDetail } from "@/services/room";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
};

const getRoomDetailQueryKey = (props: Props) => ["GET_ROOM_DETAIL", props];
const getRoomDetailQueryFn = (props: Props) => () => getRoomDetail(props);

const useGetRoom = (props: Props) => {
  return useQuery({
    queryKey: getRoomDetailQueryKey(props),
    queryFn: getRoomDetailQueryFn(props),
  });
};

export default useGetRoom;
