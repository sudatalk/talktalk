import Text from "@/components/Text";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  handleSubmit: () => void;
};

const JoinTalkModalButton = (props: Props) => {
  const { handleSubmit } = props;

  return (
    <View style={styles.container}>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text white h3>
          입장하기
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
