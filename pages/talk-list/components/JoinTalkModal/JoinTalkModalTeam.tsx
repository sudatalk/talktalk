import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";

type Props = {
  leftTeam: string;
  rightTeam: string;
};

const JoinTalkModalTeam = (props: Props) => {
  const { leftTeam, rightTeam } = props;

  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.TEAM,
    rules: {
      required: "토론방에 참여할 팀을 선택해주세요",
    },
  });

  const handleClick = (value: string) => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <Text white h3>
        팀 선택
      </Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamContentContainer}>
          <Pressable onPress={() => handleClick(leftTeam)} style={{ ...styles.teamContentWrapper, ...(value === leftTeam && styles.selected) }}>
            <Text>{leftTeam}</Text>
          </Pressable>
        </View>
        <View style={styles.teamContentContainer}>
          <Pressable onPress={() => handleClick(rightTeam)} style={{ ...styles.teamContentWrapper, ...(value === rightTeam && styles.selected) }}>
            <Text>{rightTeam}</Text>
          </Pressable>
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

    backgroundColor: "#808080",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 5,
  },
  selected: {
    backgroundColor: "white",
  },
});
