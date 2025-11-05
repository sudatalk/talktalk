import { RoomResponse } from "@/types/room";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Text from "@/components/Text";
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

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!data?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text white h4>토론장이 텅 비었어요</Text>
        <Text white h4>지금 바로 새 방을 열어보세요!</Text>
      </View>
    );
  }
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

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
