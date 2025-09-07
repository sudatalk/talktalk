import { Text as RNText, StyleSheet, TextProps } from "react-native";

type Props = TextProps & {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;

  bold?: boolean;

  white?: boolean;
  gray?: boolean;
};

const Text = (props: Props) => {
  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in styles) {
      if (value) {
        style = { ...style, ...styles[key as keyof typeof styles] };
      }
    }
  });

  return <RNText style={style} {...props} />;
};

export default Text;

const styles = StyleSheet.create({
  white: {
    color: "#FFFFFF",
  },

  gray: {
    color: "#808080",
  },

  h1: { fontSize: 32, fontWeight: "bold" },
  h2: { fontSize: 24, fontWeight: "bold" },
  h3: { fontSize: 18, fontWeight: "600" },
  h4: { fontSize: 16, fontWeight: "600" },
  h5: { fontSize: 13, fontWeight: "500" },
  h6: { fontSize: 11, fontWeight: "500" },

  bold: {
    fontWeight: 700,
  },
});
