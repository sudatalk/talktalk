import Text from "@/components/Text";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  handleSubmit: () => void;
};

const CreateTalkModalButton = (props: Props) => {
  const { handleSubmit } = props;

  return (
    <Pressable onPress={handleSubmit} style={styles.button}>
      <Text white h3>
        생성
      </Text>
    </Pressable>
  );
};

export default CreateTalkModalButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
