import Text from "@/components/Text";
import { useController } from "react-hook-form";
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";
import { useEffect, useState } from "react";
import axios from "axios";

const JoinTalkModalProfileImage = () => {
  // TODO : 프로필 이미지 어떻게 관리할지 고민 필요 (S3, public 등)

  const [list, setList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await Promise.all(Array.from({ length: 6 }, (_, i) => axios.get(`https://picsum.photos/100/100?random=${Date.now()}-${i}`).then((res) => res.request.responseURL)));

      setList(response);
      setIsLoading(false);
    })();
  }, []);

  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.PROFILE_IMAGE_URL,
    rules: {
      required: "토론방에서 사용할 프로필 사진을 선택해주세요",
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
        {isLoading ? (
          <ActivityIndicator style={{ paddingTop: 15 }} />
        ) : (
          <>
            {list.map((url, index) => {
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
