import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { CREATE_TALK_FORM_PATH } from "../../constants/createTalkForm";
import ModalTextInput from "@/components/Modal/ModalTextInput";

const MAX_LENGTH = 8;

const REQUIRED_LEFT_TEAM_ERROR_MESSAGE = "왼쪽 팀명을 입력해주세요";
const REQUIRED_RIGHT_TEAM_ERROR_MESSAGE = "오른쪽 팀명을 입력해주세요";

const CreateTalkModalTeam = () => {
  const {
    field: { value: leftTeamValue, onChange: onChangeLeftTeam },
  } = useController({
    name: CREATE_TALK_FORM_PATH.LEFT_TEAM,
    rules: {
      required: REQUIRED_LEFT_TEAM_ERROR_MESSAGE,
      maxLength: MAX_LENGTH,
    },
  });

  const {
    field: { value: rightTeamValue, onChange: onChangeRightTeam },
  } = useController({
    name: CREATE_TALK_FORM_PATH.RIGHT_TEAM,
    rules: {
      required: REQUIRED_RIGHT_TEAM_ERROR_MESSAGE,
      maxLength: MAX_LENGTH,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <View style={styles.teamWrapper}>
          <ModalTextInput value={leftTeamValue} onChangeText={onChangeLeftTeam} placeholder="왼쪽 팀명" placeholderTextColor="#808080" maxLength={MAX_LENGTH} />
        </View>
      </View>
      <View style={styles.vsContainer}>
        <Text white h3>
          VS
        </Text>
      </View>
      <View style={styles.teamContainer}>
        <View style={styles.teamWrapper}>
          <ModalTextInput value={rightTeamValue} onChangeText={onChangeRightTeam} placeholder="오른쪽 팀명" placeholderTextColor="#808080" maxLength={MAX_LENGTH} />
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
