import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";

const CreateTalkModalHeader = () => {
  return (
    <View style={styles.container}>
      <Text white h2>
        토론방 만들기
      </Text>
    </View>
  );
};

export default CreateTalkModalHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
});
