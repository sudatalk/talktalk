import { StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";
import JoinTalkModalProfileImage from "./JoinTalkModalProfileImage";
import JoinTalkModalNickname from "./JoinTalkModalNickname";
import JoinTalkModalTeam from "./JoinTalkModalTeam";
import { FormProvider, useForm } from "react-hook-form";
import { JOIN_TALK_FORM_DEFAULT_VALUES } from "../../constants/joinTalkForm";

const JoinTalkModalContent = () => {
  const form = useForm({
    defaultValues: JOIN_TALK_FORM_DEFAULT_VALUES,
  });

  const leftTeam = "왼쪽 팀명";
  const rightTeam = "오른쪽 팀명";

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <JoinTalkModalHeader />
        <View style={styles.bodyContainer}>
          <JoinTalkModalProfileImage />
          <JoinTalkModalNickname />
          <JoinTalkModalTeam leftTeam={leftTeam} rightTeam={rightTeam} />
        </View>
        <View style={styles.footerContainer}>
          <JoinTalkModalButton handleSubmit={() => {}} />
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
