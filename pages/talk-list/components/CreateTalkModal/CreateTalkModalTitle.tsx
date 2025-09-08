import Divider from "@/components/Divider";
import { StyleSheet, TextInput, View } from "react-native";

const CreateTalkModalTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="토론방의 제목을 입력해주세요" placeholderTextColor="#808080" style={styles.textInput} />
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
