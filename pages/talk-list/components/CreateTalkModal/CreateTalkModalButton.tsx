import Text from "@/components/Text";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  handleSubmit: () => void;
};

const CreateTalkModalButton = (props: Props) => {
  const { handleSubmit } = props;

  return (
    <View style={styles.container}>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text white h3>
          생성
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateTalkModalButton;

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
