import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";
import useRandomImage from "../../hooks/useRandomImage";

type Props = {
  profileUrl?: string;
};

const JoinTalkModalProfileImage = (props: Props) => {
  const { profileUrl } = props;

  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.PROFILE_IMAGE_URL,
    rules: {
      required: "토론방에서 사용할 프로필 사진을 선택해주세요",
    },
  });

  const { data, isFetching } = useRandomImage();

  const imageList = [profileUrl, ...(data || [])].filter((v): v is string => !!v).slice(0, 6);

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
            {imageList.map((url, index) => {
              const isSelected = value === url;

              return (
                <Pressable onPress={() => handleClick(url)} key={index}>
                  <Image
                    source={{
                      uri: url,
                    }}
                    style={{ ...styles.image, ...(isSelected && styles.selected) }}
                  />
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
