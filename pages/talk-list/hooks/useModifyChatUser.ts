import { putChatUser } from "@/services/chat";
import { useMutation } from "@tanstack/react-query";

const useModifyChatUser = () => {
  return useMutation({
    mutationFn: putChatUser,
  });
};

export default useModifyChatUser;
