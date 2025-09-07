import { Image, StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";
import Text from "@/components/Text";
import JoinTalkModalProfileImage from "./JoinTalkModalProfileImage";

const JoinTalkModalContent = () => {
  return (
    <View style={styles.container}>
      <JoinTalkModalHeader />
      <View style={styles.bodyContainer}>
        <JoinTalkModalProfileImage selectedIndex={0} />
        <View>닉네임 영역</View>
        <View>팀 영역</View>
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
