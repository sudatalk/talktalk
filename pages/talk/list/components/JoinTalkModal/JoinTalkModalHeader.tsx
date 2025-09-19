import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";

type Props = {
  title?: string;
};

const JoinTalkModalHeader = (props: Props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Text white h2>
        {title}
      </Text>
    </View>
  );
};

export default JoinTalkModalHeader;

const styles = StyleSheet.create({
  container: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
});
