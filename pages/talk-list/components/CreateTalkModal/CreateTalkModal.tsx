import Modal from "@/components/Modal";
import CreateTalkModalContent from "./CreateTalkModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleRefetchRoomList: () => Promise<void>;
};

const CreateTalkModal = (props: Props) => {
  const { isOpen, handleClose, handleRefetchRoomList } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && <CreateTalkModalContent handleClose={handleClose} handleRefetchRoomList={handleRefetchRoomList} />}
    </Modal>
  );
};

export default CreateTalkModal;
