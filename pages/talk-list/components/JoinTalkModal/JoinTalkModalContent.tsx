import { StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";
import JoinTalkModalProfileImage from "./JoinTalkModalProfileImage";
import JoinTalkModalNickname from "./JoinTalkModalNickname";
import JoinTalkModalTeam from "./JoinTalkModalTeam";

const JoinTalkModalContent = () => {
  const leftTeam = "왼쪽 팀명";
  const rightTeam = "오른쪽 팀명";

  return (
    <View style={styles.container}>
      <JoinTalkModalHeader />
      <View style={styles.bodyContainer}>
        <JoinTalkModalProfileImage selectedIndex={0} />
        <JoinTalkModalNickname />
        <JoinTalkModalTeam leftTeam={leftTeam} rightTeam={rightTeam} />
      </View>
      <View style={styles.footerContainer}>
        <JoinTalkModalButton handleSubmit={() => {}} />
      </View>
    </View>
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
