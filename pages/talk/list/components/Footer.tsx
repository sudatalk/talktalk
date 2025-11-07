import { Linking } from "react-native";

import { Pressable } from "react-native";

import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Pressable onPress={() => Linking.openURL("https://www.naver.com")}>
        <Text style={styles.footerText}>문의하기</Text>
      </Pressable>
      <View style={styles.footerDivider} />
      <Pressable onPress={() => Linking.openURL("https://www.naver.com")}>
        <Text style={styles.footerText}>개인정보처리방침</Text>
      </Pressable>
      <View style={styles.footerDivider} />
      <Pressable onPress={() => Linking.openURL("https://www.naver.com")}>
        <Text style={styles.footerText}>이용약관</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      borderTopWidth: 0.5,
      borderTopColor: "rgba(255,255,255,0.2)",
      backgroundColor: "#000",
    },
    footerText: {
      color: "rgba(255,255,255,0.6)",
      fontSize: 12,
    },
    footerDivider: {
      width: 1,
      height: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
      marginHorizontal: 10,
    },
  });