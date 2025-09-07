import Modal from "@/components/Modal";
import CreateTalkModalContent from "./CreateTalkModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateTalkModal = (props: Props) => {
  const { isOpen, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && <CreateTalkModalContent handleClose={handleClose} />}
    </Modal>
  );
};

export default CreateTalkModal;
