import Modal from "@/components/Modal";
import JoinTalkModalContent from "./JoinTalkModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const JoinTalkModal = (props: Props) => {
  const { isOpen, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && <JoinTalkModalContent />}
    </Modal>
  );
};

export default JoinTalkModal;
