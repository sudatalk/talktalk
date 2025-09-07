import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { StyleSheet, View } from "react-native";

const CreateTalkModalTeam = () => {
  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <View style={styles.teamWrapper}>
          <TextInput placeholder="왼쪽 팀명" placeholderTextColor="#808080" />
        </View>
      </View>
      <View style={styles.vsContainer}>
        <Text white h3>
          VS
        </Text>
      </View>
      <View style={styles.teamContainer}>
        <View style={styles.teamWrapper}>
          <TextInput placeholder="오른쪽 팀명" placeholderTextColor="#808080" />
        </View>
      </View>
    </View>
  );
};

export default CreateTalkModalTeam;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,

    flexDirection: "row",
  },

  teamContainer: {
    width: "100%",
    flex: 0.45,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  teamWrapper: {
    flex: 0.9,
    height: 40,

    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 5,
  },

  vsContainer: {
    flex: 0.1,

    alignItems: "center",
    justifyContent: "center",
  },
});
