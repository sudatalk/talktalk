import { StyleSheet, View } from "react-native";
import CreateTalkModalHeader from "./CreateTalkModalHeader";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import CreateTalkModalTitle from "./CreateTalkModalTitle";
import CreateTalkModalTeam from "../CreateTalkModalTeam";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateTalkModal = (props: Props) => {
  const { isOpen, handleClose } = props;

  return (
    <Modal isOpen={true} handleClose={handleClose}>
      <View style={styles.container}>
        <CreateTalkModalHeader />
        <View style={styles.bodyContainer}>
          <CreateTalkModalTitle />
          <CreateTalkModalTeam />
          <View
            style={{
              flex: 0.3,
              backgroundColor: "blue",
            }}
          >
            시간 영역
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text white h3>
            생성
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTalkModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    paddingTop: 0,
  },

  headerContainer: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 0.7,
  },
  footerContainer: {
    flex: 0.15,

    alignItems: "center",
    justifyContent: "center",
  },
});
