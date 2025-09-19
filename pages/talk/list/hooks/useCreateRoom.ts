import { getRoomListQueryKey } from "@/hooks/useGetRoomList";
import { postRoom } from "@/services/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getRoomListQueryKey });
    },
  });
};

export default useCreateRoom;
