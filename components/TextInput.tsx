import { TextInput as RNTextInput, StyleSheet, TextInputProps } from "react-native";

type Props = TextInputProps & {
  type1?: boolean;

  white?: boolean;
};

const TextInput = (props: Props) => {
  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in styles) {
      if (value) {
        style = { ...style, ...styles[key as keyof typeof styles], ...styles["default"] };
      }
    }
  });

  return <RNTextInput {...props} style={style} />;
};

export default TextInput;

const styles = StyleSheet.create({
  default: {
    paddingBottom: 0, // 안드로이드 기본 패딩 제거

    justifyContent: "center",
    alignItems: "center",
  },

  type1: {
    fontSize: 16,
    fontWeight: 700,
  },

  white: {
    color: "white",
  },
});
