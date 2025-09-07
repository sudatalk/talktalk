import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";

type Props = {
  leftTeam: string;
  rightTeam: string;
};

const JoinTalkModalTeam = (props: Props) => {
  const { leftTeam, rightTeam } = props;

  return (
    <View style={{ flex: 0.35, gap: 15 }}>
      <Text white h3>
        팀 선택
      </Text>
      <View style={styles.container}>
        <View style={styles.teamContainer}>
          <View style={styles.teamWrapper}>
            <Text>{leftTeam}</Text>
          </View>
        </View>
        <View style={styles.teamContainer}>
          <View style={styles.teamWrapper}>
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
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
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
});
