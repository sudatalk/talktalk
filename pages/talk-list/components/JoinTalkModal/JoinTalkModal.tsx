import Modal from "@/components/Modal";
import JoinTalkModalContent from "./JoinTalkModalContent";

type Props = {
  roomId?: number;
  userId?: string;
  isOpen: boolean;
  handleClose: () => void;
  handleRefetchRoomList: () => Promise<void>;
};

const JoinTalkModal = (props: Props) => {
  const { isOpen, roomId, userId, handleClose, handleRefetchRoomList } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      {isOpen && roomId && <JoinTalkModalContent roomId={roomId} userId={userId} handleClose={handleClose} handleRefetchRoomList={handleRefetchRoomList} />}
    </Modal>
  );
};

export default JoinTalkModal;
