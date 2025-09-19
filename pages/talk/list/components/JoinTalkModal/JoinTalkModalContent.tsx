import { StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";
import JoinTalkModalProfileImage from "./JoinTalkModalProfileImage";
import JoinTalkModalNickname from "./JoinTalkModalNickname";
import JoinTalkModalTeam from "./JoinTalkModalTeam";
import { FormProvider } from "react-hook-form";
import useGetRoom from "@/hooks/useGetRoom";
import useJoinTalkModalForm from "../../hooks/useJoinTalkModalForm";
import useGetRoomUserInfo from "@/hooks/useGetRoomUserInfo";

type Props = {
  userId: string;
  roomId: number;
  isEditMode?: boolean;
  handleClose: () => void;
};

const JoinTalkModalContent = (props: Props) => {
  const { roomId, userId, isEditMode = false, handleClose } = props;

  const { data: room } = useGetRoom({ id: roomId });
  const { title, leftTeam, rightTeam } = room || {};

  const { data: roomUserInfo } = useGetRoomUserInfo({
    roomId,
    userId,
    options: {
      enabled: isEditMode && !!roomId && !!userId,
      refetchOnMount: true,
    },
  });

  const { form, handleSubmit } = useJoinTalkModalForm({ initialData: roomUserInfo, userId, roomId, isEditMode });

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <JoinTalkModalHeader title={title} />
        <View style={styles.bodyContainer}>
          <JoinTalkModalProfileImage profileUrl={roomUserInfo?.profileUrl} />
          <JoinTalkModalNickname />
          <JoinTalkModalTeam leftTeam={leftTeam} rightTeam={rightTeam} />
        </View>
        <View style={styles.footerContainer}>
          <JoinTalkModalButton handleSubmit={handleSubmit({ onSuccess: handleClose })} />
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
