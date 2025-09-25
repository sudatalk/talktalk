import { RoomResponse } from "@/types/room";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import RoomCard from "./RoomCard/RoomCard";
import Separator from "@/components/Separator";

type Props = {
  data?: RoomResponse[];
  isLoading: boolean;
  handleClickJoinButton: (id: number) => void;
  handleEndReached: () => void;
};

const RoomList = (props: Props) => {
  const { data, isLoading, handleClickJoinButton, handleEndReached } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RoomCard room={item} onPress={handleClickJoinButton} />}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <Separator gap={24} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.9}
      ListFooterComponent={() => isLoading && <ActivityIndicator />}
      ListFooterComponentStyle={styles.footerComponentsStyle}
    />
  );
};

export default RoomList;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },

  footerComponentsStyle: {
    paddingTop: 30,
  },
});
