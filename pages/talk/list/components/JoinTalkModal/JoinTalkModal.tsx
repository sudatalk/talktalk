import Modal from "@/components/Modal";
import JoinTalkModalContent from "./JoinTalkModalContent";

type Props = {
  roomId?: number;
  userId?: string;
  isOpen: boolean;
  handleClose: () => void;
};

const JoinTalkModal = (props: Props) => {
  const { isOpen, roomId, userId, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && roomId && userId && <JoinTalkModalContent roomId={roomId} userId={userId} handleClose={handleClose} />}
    </Modal>
  );
};

export default JoinTalkModal;
