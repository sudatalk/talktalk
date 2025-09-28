import Text from "@/components/Text";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  handleClose: () => void;
};

const TeamChangeModalTitle = (props: Props) => {
  const { handleClose } = props;

  return (
    <View style={styles.titleContainer}>
      <Text white h3 bold>
        팀 바꾸기
      </Text>
      <Pressable onPress={handleClose}>
        <Text white h3 bold>
          X
        </Text>
      </Pressable>
    </View>
  );
};

export default TeamChangeModalTitle;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
