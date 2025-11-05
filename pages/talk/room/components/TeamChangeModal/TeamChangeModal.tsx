import { Modal } from "react-native";
import TeamChangeModalContent from "./TeamChangeModalContent";
import { Team } from "@/types/chat";

type Props = {
  roomId: number;
  userId: string;
  isOpen: boolean;
  handleClose: () => void;
  handleTeamChange: (team: Team) => void;
};

const TeamChangeModal = (props: Props) => {
  const { roomId, userId, isOpen, handleClose, handleTeamChange } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      {isOpen && <TeamChangeModalContent roomId={roomId} userId={userId} handleClose={handleClose} handleTeamChange={handleTeamChange} />}
    </Modal>
  );
};

export default TeamChangeModal;
