import { Modal } from "react-native";
import TeamChangeModalContent from "./TeamChangeModalContent";

type Props = {
  roomId: number;
  userId: string;
  isOpen: boolean;
  handleClose: () => void;
};

const TeamChangeModal = (props: Props) => {
  const { roomId, userId, isOpen, handleClose } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      {isOpen && <TeamChangeModalContent roomId={roomId} userId={userId} handleClose={handleClose} />}
    </Modal>
  );
};

export default TeamChangeModal;
