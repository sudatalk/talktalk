import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";

const JoinTalkModalHeader = () => {
  return (
    <View style={styles.container}>
      <Text white h2>
        토론방 참여하기
      </Text>
    </View>
  );
};

export default JoinTalkModalHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
});
