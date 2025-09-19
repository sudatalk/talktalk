import Divider from "@/components/Divider";
import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { JOIN_TALK_FORM_PATH } from "../../constants/joinTalkForm";
import ModalTextInput from "@/components/Modal/ModalTextInput";

const MAX_LENGTH = 20;

const JoinTalkModalNickname = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: JOIN_TALK_FORM_PATH.NICKNAME,
    rules: {
      required: "토론방에서 사용할 닉네임을 입력해주세요",
    },
  });

  // TODO : 텍스트 입력 시 Divider 와 간격이 바뀌는 이슈 존재

  return (
    <View style={styles.container}>
      <ModalTextInput value={value} onChangeText={onChange} white type1 placeholder="방에서 사용할 닉네임을 입력해주세요" placeholderTextColor="#808080" style={styles.textInput} maxLength={MAX_LENGTH} />
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
