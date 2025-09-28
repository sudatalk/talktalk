import Text from "@/components/Text";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  handleClickConfirmButton: () => void;
};

const TeamChangeModalConfirmButton = (props: Props) => {
  const { handleClickConfirmButton } = props;

  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={handleClickConfirmButton} style={styles.button}>
        <Text>확인</Text>
      </Pressable>
    </View>
  );
};

export default TeamChangeModalConfirmButton;

const styles = StyleSheet.create({
  buttonContainer: { flex: 0.2, flexDirection: "row", justifyContent: "flex-end" },
  button: { flex: 0.3, borderRadius: 5, height: 40, backgroundColor: "white", alignItems: "center", justifyContent: "center" },
});
