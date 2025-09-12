import { TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps } from "react-native";

export type TextInputProps = RNTextInputProps & {
  type1?: boolean;

  white?: boolean;
};

const TextInput = (props: TextInputProps) => {
  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in textInputStyles) {
      if (value) {
        style = { ...style, ...textInputStyles[key as keyof typeof textInputStyles], ...textInputStyles["default"] };
      }
    }
  });

  return <RNTextInput {...props} style={style} />;
};

export default TextInput;

export const textInputStyles = StyleSheet.create({
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
