import { View } from "react-native";

type Props = {
  gap: number;
};

const Separator = (props: Props) => {
  return <View style={{ height: props.gap }} />;
};

export default Separator;
