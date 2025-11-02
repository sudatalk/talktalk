import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  onPlusPress: () => void;
  onSend: (text: string) => void;
};

export default function ChatInput({ onPlusPress, onSend }: Props) {
  const [text, setText] = useState('');

  return (
    <View style={styles.inputBar}>
      <TouchableOpacity style={styles.plusBtn} onPress={onPlusPress}>
        <Text style={styles.plusText}>＋</Text>
      </TouchableOpacity>

      <View style={styles.inputWrap}>
        <TextInput
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#8A8A8A"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={() => onSend(text)}>
        <Text style={styles.sendText}>전송</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  plusBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  inputWrap: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    color: '#FFF',
    backgroundColor: '#101010',
    fontSize: 16,
  },
  sendBtn: {
    width: 65,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
