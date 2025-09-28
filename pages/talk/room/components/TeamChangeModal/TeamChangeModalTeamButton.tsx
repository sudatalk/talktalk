import Text from "@/components/Text";
import { Team } from "@/types/chat";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  selectedTeam?: Team;
  leftTeam?: string;
  rightTeam?: string;
  handleChangeTeam: (team: Team) => void;
};

const TeamChangeModalTeamButton = (props: Props) => {
  const { selectedTeam, leftTeam, rightTeam, handleChangeTeam } = props;

  return (
    <View style={styles.teamContainer}>
      <View style={styles.teamContentContainer}>
        <Pressable onPress={() => handleChangeTeam(Team.LEFT)} style={{ ...styles.teamContentWrapper, ...(selectedTeam === Team.LEFT && styles.selected) }}>
          <Text>{leftTeam || ""}</Text>
        </Pressable>
      </View>
      <View style={styles.teamContentContainer}>
        <Pressable onPress={() => handleChangeTeam(Team.RIGHT)} style={{ ...styles.teamContentWrapper, ...(selectedTeam === Team.RIGHT && styles.selected) }}>
          <Text>{rightTeam || ""}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TeamChangeModalTeamButton;

const styles = StyleSheet.create({
  teamContainer: {
    flex: 0.6,
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

    backgroundColor: "#808080",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 5,
  },
  selected: {
    backgroundColor: "white",
  },
});
