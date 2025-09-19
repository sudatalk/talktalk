import { useForm } from "react-hook-form";
import { JOIN_TALK_FORM_DEFAULT_VALUES } from "../constants/joinTalkForm";
import Toast from "react-native-toast-message";
import useJoinChat from "./useJoinChat";
import useModifyChatUser from "./useModifyChatUser";
import { ChatResponse } from "@/types/chat";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/App";

type Props = {
  initialData?: ChatResponse;
  userId: string;
  roomId: number;
  isEditMode: boolean;
};

const useJoinTalkModalForm = (props: Props) => {
  const { initialData, userId, roomId, isEditMode } = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  const form = useForm({
    values: {
      ...JOIN_TALK_FORM_DEFAULT_VALUES,
      ...initialData,
      isEditMode,
    },
  });

  const { mutateAsync: joinChatAsync } = useJoinChat();
  const { mutateAsync: modifyChatUserAsync } = useModifyChatUser();

  const handleSubmit = ({ onSuccess }: { onSuccess: () => void }) =>
    form.handleSubmit(
      async (value) => {
        if (!userId) return;

        const params = {
          userId,
          roomId,
          ...value,
        };

        if (value.isEditMode) {
          await modifyChatUserAsync(params);
        } else {
          await joinChatAsync(params);

          navigation.navigate("/room", { roomId, userId });
        }

        onSuccess();
      },
      (error) => {
        const firstKey = Object.keys(error)[0] as keyof typeof JOIN_TALK_FORM_DEFAULT_VALUES;
        const firstMessage = error[firstKey]?.message;

        Toast.show({
          type: "error",
          text1: firstMessage,
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    );

  return { form, handleSubmit };
};

export default useJoinTalkModalForm;
