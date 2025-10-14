import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>가나다라마바사가나</Text>
      <Text style={styles.endTime}>14:55 종료</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFF', fontSize: 40, lineHeight: 40 },
  title: {
    flex: 1,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  endTime: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
