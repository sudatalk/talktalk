import { StyleSheet, View } from "react-native";

type Props = {
  type1?: boolean;
  type2?: boolean;
};

const Divider = (props: Props) => {
  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in styles) {
      if (value) {
        style = { ...style, ...styles[key as keyof typeof styles], ...styles["default"] };
      }
    }
  });

  return <View style={style}></View>;
};

export default Divider;

const styles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  type1: {
    width: 340,
  },
  type2: {
    width: 170,
  },
});
