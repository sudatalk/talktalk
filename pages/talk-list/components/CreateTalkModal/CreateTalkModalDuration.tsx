import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DURATION_SELECT_OPTIONS = [
  { label: "10분", value: 10 },
  { label: "20분", value: 20 },
  { label: "30분", value: 30 },
  { label: "40분", value: 40 },
  { label: "50분", value: 50 },
  { label: "60분", value: 60 },
];

const CreateTalkModalDuration = () => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        itemTextStyle={styles.text}
        selectedTextStyle={styles.text}
        placeholder="시간제한"
        data={DURATION_SELECT_OPTIONS}
        dropdownPosition="top"
        onChange={() => {}}
        labelField="label"
        valueField="value"
      />
    </View>
  );
};

export default CreateTalkModalDuration;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },

  dropdown: {
    flex: 0.5,

    height: 40,

    backgroundColor: "white",

    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",

    paddingLeft: 10,
    paddingRight: 10,
  },
  placeholder: {
    color: "#808080",

    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});
