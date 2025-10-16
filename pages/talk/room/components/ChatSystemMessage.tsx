import { View, Text, StyleSheet } from 'react-native';

type Props = { text: string };

export default function ChatSystemMessage({ text }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginTop: 28, alignItems: 'center' },
  text: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
