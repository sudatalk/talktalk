import { StyleSheet, View } from "react-native";
import CreateTalkModalHeader from "./CreateTalkModalHeader";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import CreateTalkModalTitle from "./CreateTalkModalTitle";
import CreateTalkModalTeam from "../CreateTalkModalTeam";
import CreateTalkModalDuration from "./CreateTalkModalDuration";
import CreateTalkModalContent from "./CreateTalkModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateTalkModal = (props: Props) => {
  const { isOpen, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && <CreateTalkModalContent />}
    </Modal>
  );
};

export default CreateTalkModal;
