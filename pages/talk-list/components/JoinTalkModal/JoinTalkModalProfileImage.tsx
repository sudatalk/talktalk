import Text from "@/components/Text";
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  selectedIndex: number;
};

const JoinTalkModalProfileImage = (props: Props) => {
  const { selectedIndex } = props;

  // TODO : 프로필 이미지 어떻게 관리할지 고민 필요 (S3, public 등)

  return (
    <View style={styles.container}>
      <Text white h3>
        프로필 이미지 선택
      </Text>
      <View style={styles.imageContainer}>
        {Array.from({ length: 6 }).map((_, index) => {
          const isSelected = index === selectedIndex;

          return (
            <Pressable>
              <Image
                key={index}
                source={{
                  uri: "https://fastly.picsum.photos/id/1061/200/300.jpg?hmac=wvuhffnNEQ5g9Q0f7LZiEvh6JEJqL3ppJuHT2M_YJLI",
                }}
                style={{ ...styles.image, ...(isSelected && styles.selected) }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default JoinTalkModalProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,

    gap: 15,
  },

  imageContainer: {
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  image: {
    width: 50,
    height: 50,

    borderRadius: 25,
    borderWidth: 3,
  },

  selected: {
    borderColor: "#FFFFFF",
  },
});
