import { StyleSheet, View } from "react-native";
import CreateTalkModalHeader from "./CreateTalkModalHeader";
import CreateTalkModalTitle from "./CreateTalkModalTitle";
import CreateTalkModalTeam from "./CreateTalkModalTeam";
import CreateTalkModalDuration from "./CreateTalkModalDuration";
import { FormProvider, useForm } from "react-hook-form";
import { CREATE_TALK_FORM_DEFAULT_VALUES } from "../../constants/createTalkForm";
import { ON_SUBMIT } from "@/constants/form";
import CreateTalkModalButton from "./CreateTalkModalButton";
import { postRoom } from "@/services/room";
import Toast from "react-native-toast-message";

type Props = {
  handleClose: () => void;
  handleRefetchRoomList: () => Promise<void>;
};

const CreateTalkModalContent = (props: Props) => {
  const { handleClose, handleRefetchRoomList } = props;

  const form = useForm({
    defaultValues: CREATE_TALK_FORM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit(
    async (value) => {
      await postRoom({
        title: value.title,
        leftTeam: value.leftTeam,
        rightTeam: value.rightTeam,
        duration: +value.duration,
      });

      handleRefetchRoomList();

      // TODO : 채팅방으로 바로 입장하게 할지 고민 필요

      handleClose();
    },
    (error) => {
      const firstKey = Object.keys(error)[0] as keyof typeof CREATE_TALK_FORM_DEFAULT_VALUES;
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
        <CreateTalkModalHeader />
        <View style={styles.bodyContainer}>
          <CreateTalkModalTitle />
          <CreateTalkModalTeam />
          <CreateTalkModalDuration />
        </View>
        <View style={styles.footerContainer}>
          <CreateTalkModalButton handleSubmit={handleSubmit} />
        </View>
      </View>
    </FormProvider>
  );
};

export default CreateTalkModalContent;

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
