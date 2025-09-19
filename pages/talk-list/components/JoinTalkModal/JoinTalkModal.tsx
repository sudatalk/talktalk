import Modal from "@/components/Modal";
import JoinTalkModalContent from "./JoinTalkModalContent";

type Props = {
  roomId?: number;
  userId?: string;
  isOpen: boolean;
  handleClose: () => void;
};

const JoinTalkModal = (props: Props) => {
  const { isOpen, roomId, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && roomId && <JoinTalkModalContent roomId={roomId} handleClose={handleClose} />}
    </Modal>
  );
};

export default JoinTalkModal;
