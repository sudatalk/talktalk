import Divider from "@/components/Divider";
import TextInput from "@/components/TextInput";
import { StyleSheet, View } from "react-native";

const MAX_LENGTH = 20;

const JoinTalkModalNickname = () => {
  // TODO : 텍스트 입력 시 Divider 와 간격이 바뀌는 이슈 존재

  return (
    <View style={styles.container}>
      <TextInput white type1 placeholder="방에서 사용할 닉네임을 입력해주세요" placeholderTextColor="#808080" style={styles.textInput} maxLength={MAX_LENGTH} />
      <Divider type1 />
    </View>
  );
};

export default JoinTalkModalNickname;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,

    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 700,

    paddingBottom: 0, // 안드로이드 기본 패딩 제거
  },
});
