import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";

const DUMMY_IMAGE_URI = [
  "https://fastly.picsum.photos/id/646/200/300.jpg?hmac=qCJ0bf6G6oSxx8YMMc1ZLVryK-w596XjRD3o8cXQLFc",
  "https://fastly.picsum.photos/id/571/200/300.jpg?hmac=M2JAmSQct67FkQUX0_IWCUClgxf45dexs4oYKhpFDLA",
  "https://fastly.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU",
  "https://fastly.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ",
  "https://fastly.picsum.photos/id/34/200/300.jpg?hmac=K076uH4zC5xneqvhRayjS90G00xjPsR7eL_ShGEr6rs",
  "https://fastly.picsum.photos/id/585/200/300.jpg?hmac=9pIkZ1OAqMKxQt7_5yNLOWAjZBmJ99k53TBNs3xQQe4",
];

const JoinTalkModalProfileImage = () => {
  // TODO : 프로필 이미지 어떻게 관리할지 고민 필요 (S3, public 등)

  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.PROFILE_IMAGE_URL,
    rules: {
      required: "토론방에서 사용할 이미지를 선택해주세요",
    },
  });

  const handleClick = (value: string) => {
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <Text white h3>
        프로필 이미지 선택
      </Text>
      <View style={styles.imageContainer}>
        {DUMMY_IMAGE_URI.map((url, index) => {
          const isSelected = value === url;

          return (
            <Pressable onPress={() => handleClick(url)}>
              <Image
                key={index}
                source={{
                  uri: url,
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
