import Divider from "@/components/Divider";
import { useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { CREATE_TALK_FORM_PATH } from "../../constants/createTalkForm";
import ModalTextInput from "@/components/Modal/ModalTextInput";

const MAX_LENGTH = 20;

const REQUIRED_ERROR_MESSAGE = "토론방의 제목을 입력해주세요";

const CreateTalkModalTitle = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: CREATE_TALK_FORM_PATH.TITLE,
    rules: {
      required: REQUIRED_ERROR_MESSAGE,
      maxLength: MAX_LENGTH,
    },
  });

  // TODO : 텍스트 입력 시 Divider 와 간격이 바뀌는 이슈 존재

  return (
    <View style={styles.container}>
      <ModalTextInput white value={value} onChangeText={onChange} type1 placeholder="토론방의 제목을 입력해주세요" placeholderTextColor="#808080" style={styles.textInput} maxLength={MAX_LENGTH} />
      <Divider type1 />
    </View>
  );
};

export default CreateTalkModalTitle;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,

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
