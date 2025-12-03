import { Modal, StyleSheet, View } from "react-native";
import Text from "./Text";

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const Popup = (props: Props) => {
  const { title, content } = props;
  return (
    <Modal backdropColor="#FFFFFF10">
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text h3 white>
              {title}
            </Text>
          </View>
          <View style={styles.content}>{content}</View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    height: 150,
    width: 300,

    backgroundColor: "#181818",

    padding: 10,

    borderRadius: 10,
  },

  title: {
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    height: 110,

    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 10,

    gap: 5,
  },
});
