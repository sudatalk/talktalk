import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";

type Props = {
  leftTeam: string;
  rightTeam: string;
};

const JoinTalkModalTeam = (props: Props) => {
  const { leftTeam, rightTeam } = props;

  return (
    <View style={styles.container}>
      <Text white h3>
        팀 선택
      </Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamContentContainer}>
          <View style={styles.teamContentWrapper}>
            <Text>{leftTeam}</Text>
          </View>
        </View>
        <View style={styles.teamContentContainer}>
          <View style={styles.teamContentWrapper}>
            <Text>{rightTeam}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JoinTalkModalTeam;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    gap: 15,
  },
  teamContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },
  teamContentContainer: {
    width: "100%",
    flex: 0.45,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
  teamContentWrapper: {
    flex: 0.9,
    height: 40,

    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 5,
  },
});
