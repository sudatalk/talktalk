import useDisclosure from "@/hooks/useDisclosure";
import { useState } from "react";

const useJoinTalkModal = () => {
  const [roomId, setRoomId] = useState<number>();

  const { isOpen: isOpenJoinTalkModal, handleOpen, handleClose } = useDisclosure();

  const handleChangeRoomId = (roomId: number) => {
    setRoomId(roomId);
  };

  const handleOpenJoinTalkModal = (roomId: number) => {
    handleChangeRoomId(roomId);
    handleOpen();
  };

  return {
    roomId,
    isOpenJoinTalkModal,
    handleOpenJoinTalkModal,
    handleCloseJoinTalkModal: handleClose,
  };
};

export default useJoinTalkModal;
