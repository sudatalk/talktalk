import Text from "@/components/Text";
import { useWatch } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";

type Props = {
  handleSubmit: () => void;
};

const JoinTalkModalButton = (props: Props) => {
  const { handleSubmit } = props;

  const value = useWatch({ name: JOIN_TALK_FORM_PATH.IS_EDIT_MODE });

  return (
    <View style={styles.container}>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text white h3>
          {value ? "수정하기" : "입장하기"}
        </Text>
      </Pressable>
    </View>
  );
};

export default JoinTalkModalButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
