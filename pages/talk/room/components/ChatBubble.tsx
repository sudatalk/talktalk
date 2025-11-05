import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type ChatBubbleProps = {
  team?: string;
  nickname?: string;
  text?: string;
  profileImage?: any; // require() or { uri: string }
};

export default function ChatBubble({ team, nickname, text, profileImage }: ChatBubbleProps) {
  const isLeft = team?.toLowerCase() === 'left';

  return (
    <View style={[styles.container, isLeft ? styles.leftAlign : styles.rightAlign]}>
      <View style={[isLeft ? styles.rowLeft : styles.rowRight]}>
        <Image source={{ uri: profileImage }} style={styles.badge} />

        <View style={[styles.textColumn, isLeft ? styles.textLeft : styles.textRight]}>
          <Text style={[styles.nickname, isLeft ? styles.nickLeft : styles.nickRight]}>
            {nickname}
          </Text>
          <View style={[styles.bubbleWrapper, isLeft ? styles.alignLeft : styles.alignRight]}>
            <View style={[styles.bubble, isLeft ? styles.bubbleLeft : styles.bubbleRight]}>
              <Text style={styles.bubbleText}>{text}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  leftAlign: { alignItems: 'flex-start' },
  rightAlign: { alignItems: 'flex-end' },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowRight: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
  },

  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
  },

  textColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  textLeft: { alignItems: 'flex-start' },
  textRight: { alignItems: 'flex-end' },

  nickname: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  nickLeft: { textAlign: 'left' },
  nickRight: { textAlign: 'right' },

  bubbleWrapper: {
    width: '100%',
    marginTop: 4,
  },
  alignLeft: { alignItems: 'flex-start' },
  alignRight: { alignItems: 'flex-end' },

  bubble: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: '75%',
  },
  bubbleLeft: {
    backgroundColor: '#3A3A3A',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    backgroundColor: '#2A2A2A',
    alignSelf: 'flex-end',
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
