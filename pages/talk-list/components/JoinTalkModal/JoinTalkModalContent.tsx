import { StyleSheet, View } from "react-native";
import JoinTalkModalHeader from "./JoinTalkModalHeader";
import JoinTalkModalButton from "./JoinTalkModalButton";

const JoinTalkModalContent = () => {
  return (
    <View style={styles.container}>
      <JoinTalkModalHeader />
      <View style={styles.bodyContainer}></View>
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
