import { StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";
import JoinTalkModalProfileImage from "./JoinTalkModalProfileImage";
import JoinTalkModalNickname from "./JoinTalkModalNickname";
import JoinTalkModalTeam from "./JoinTalkModalTeam";
import { FormProvider, useForm } from "react-hook-form";
import { JOIN_TALK_FORM_DEFAULT_VALUES } from "../../constants/joinTalkForm";
import Toast from "react-native-toast-message";
import useGetRoom from "@/hooks/useGetRoom";
import { postChatJoin } from "@/services/chat";
import { Team } from "@/types/chat";

type Props = {
  roomId: number;
  handleClose: () => void;
  handleRefetchRoomList: () => Promise<void>;
};

const JoinTalkModalContent = (props: Props) => {
  const { roomId, handleClose, handleRefetchRoomList } = props;

  const { room } = useGetRoom({ id: roomId });
  const { title, leftTeam, rightTeam } = room || {};

  const form = useForm({
    defaultValues: JOIN_TALK_FORM_DEFAULT_VALUES,
  });

  const handleSubmit = form.handleSubmit(
    async (value) => {
      if (!roomId) return;

      await postChatJoin({
        userId: "dummy",
        roomId,
        nickname: value.nickname,
        profileUrl: value.profileImageUrl,
        team: value.team as Team,
      });

      handleRefetchRoomList();
      handleClose();
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

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <JoinTalkModalHeader title={title} />
        <View style={styles.bodyContainer}>
          <JoinTalkModalProfileImage />
          <JoinTalkModalNickname />
          <JoinTalkModalTeam leftTeam={leftTeam} rightTeam={rightTeam} />
        </View>
        <View style={styles.footerContainer}>
          <JoinTalkModalButton handleSubmit={handleSubmit} />
        </View>
      </View>
    </FormProvider>
  );
};

export default JoinTalkModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    paddingTop: 0,
  },

  bodyContainer: {
    flex: 0.7,
  },

  footerContainer: {
    flex: 0.15,
  },
});
