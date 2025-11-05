import { StyleSheet, View } from "react-native";
import TeamChangeModalTitle from "./TeamChangeModalTitle";
import TeamChangeModalTeamButton from "./TeamChangeModalTeamButton";
import TeamChangeModalConfirmButton from "./TeamChangeModalConfirmButton";
import { useEffect, useState } from "react";
import useGetRoomUserInfo from "@/hooks/useGetRoomUserInfo";
import { Team } from "@/types/chat";
import useGetRoom from "@/hooks/useGetRoom";
import useModifyChatUser from "@/pages/talk/list/hooks/useModifyChatUser";

type Props = {
  roomId: number;
  userId: string;
  handleClose: () => void;
  handleTeamChange: (team: Team) => void;
};

const TeamChangeModalContent = (props: Props) => {
  const { roomId, userId, handleClose, handleTeamChange } = props;

  const [selectedTeam, setSelectedTeam] = useState<Team>();

  const { data: roomInfo } = useGetRoom({
    id: roomId,
  });

  const { data: userInfo, refetch } = useGetRoomUserInfo({
    roomId,
    userId,
  });

  const { mutateAsync: modifyChatUserAsync } = useModifyChatUser();

  useEffect(() => {
    if (!userInfo) return;

    setSelectedTeam(userInfo.team);
  }, [userInfo]);

  const handleChangeTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleConfirmTeamChange = async () => {
    if (!userInfo || !selectedTeam) return;

    if (selectedTeam !== userInfo.team) {
      await modifyChatUserAsync({
        ...userInfo,
        team: selectedTeam,
      });

      await refetch();
      handleTeamChange(selectedTeam);
    }

    handleClose();
  };

  return (
    <View style={styles.backdropContainer}>
      <View style={styles.container}>
        <TeamChangeModalTitle handleClose={handleClose} />
        <TeamChangeModalTeamButton selectedTeam={selectedTeam} leftTeam={roomInfo?.leftTeam} rightTeam={roomInfo?.rightTeam} handleChangeTeam={handleChangeTeam} />
        <TeamChangeModalConfirmButton handleClickConfirmButton={handleConfirmTeamChange} />
      </View>
    </View>
  );
};

export default TeamChangeModalContent;

const styles = StyleSheet.create({
  backdropContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(200,200,200,0.6)" },

  container: {
    backgroundColor: "black",

    flex: 0.2,
    width: "80%",

    opacity: 1,

    borderRadius: 20,

    padding: 20,
  },
});
