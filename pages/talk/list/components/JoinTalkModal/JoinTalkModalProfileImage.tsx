import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { ActivityIndicator, Image, ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";
import useRandomImage from "../../hooks/useRandomImage";

type ImageSource = string | number; // URL(string) or require(number)

const JoinTalkModalProfileImage = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.PROFILE_IMAGE_URL,
    rules: {
      required: "토론방에서 사용할 프로필 사진을 선택해주세요",
    },
  });

  const { data, isFetching } = useRandomImage();

  const imageList = data?.filter(Boolean).filter((item, index, self) => index !== self.findIndex((t) => t.url === item.url));

  const toSource = (v: ImageSource): ImageSourcePropType => (typeof v === "string" ? { uri: v } : v);

  const handleClick = (value: string) => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <Text white h3>
        프로필 이미지 선택
      </Text>
      <View style={styles.imageContainer}>
        {isFetching ? (
          <ActivityIndicator style={{ paddingTop: 15 }} />
        ) : (
          <>
            {imageList?.map((url, index) => {
              const isSelected = value === url;
              return (
                <Pressable onPress={() => handleClick(url)} key={index}>
                  <Image source={toSource(url)} style={{ ...styles.image, ...(isSelected && styles.selected) }} />
                </Pressable>
              );
            })}
          </>
        )}
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
    width: 55,
    height: 55,

    borderRadius: 25,
    borderWidth: 5,
  },

  selected: {
    borderColor: "#FFFFFF",
  },
});
