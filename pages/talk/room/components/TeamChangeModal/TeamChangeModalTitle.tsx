import Text from "@/components/Text";
import { Image, Pressable, StyleSheet, View } from "react-native";

const closeIcon = require("assets/icon/closeIcon.webp");

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
        <Image
          source={closeIcon}
          style={{
            width: 26,
            height: 26,
          }}
        />
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
