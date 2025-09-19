import { postChatJoin } from "@/services/chat";
import { useMutation } from "@tanstack/react-query";

const useJoinChat = () => {
  return useMutation({
    mutationFn: postChatJoin,
  });
};

export default useJoinChat;
