import { useForm } from "react-hook-form";
import { JOIN_TALK_FORM_DEFAULT_VALUES } from "../constants/joinTalkForm";
import Toast from "react-native-toast-message";
import useJoinChat from "./useJoinChat";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/RootStack";

type Props = {
  userId?: string;
  roomId: number;
};

const useJoinTalkModalForm = (props: Props) => {
  const { userId, roomId } = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  const form = useForm({
    defaultValues: JOIN_TALK_FORM_DEFAULT_VALUES,
  });

  const { mutateAsync: joinChatAsync } = useJoinChat();

  const handleSubmit = ({ onSuccess }: { onSuccess: () => void }) =>
    form.handleSubmit(
      async (value) => {
        if (!userId) return;

        const params = {
          userId,
          roomId,
          ...value,
        };

        await joinChatAsync(params);

        navigation.navigate("/room", { roomId, userId });

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
