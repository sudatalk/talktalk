import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  Platform,
  TextInputContentSizeChangeEventData,
} from 'react-native';

type Props = {
  onPlusPress: () => void;
  onSend: (text: string) => void;
};

const FONT_SIZE = 16;
// 플랫폼별 폰트 메트릭 차이 보정: 안드가 살짝 더 큼
const LINE_HEIGHT = Platform.select({ ios: 20, android: 22 })!;

const MAX_INPUT_LINES = 3;
const MAX_TEXT_LINES = 10;
const MAX_INPUT_LENGTH = 300;
const V_PADDING = 10;
const MIN_LINES = 1;

export default function ChatInput({ onPlusPress, onSend }: Props) {
  const [text, setText] = useState("");
  const [lineCount, setLineCount] = useState(MIN_LINES);

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const h = e.nativeEvent.contentSize.height;
    const approx = Math.round(h / LINE_HEIGHT) || 1;
    setLineCount(clamp(approx, MIN_LINES, MAX_INPUT_LINES));
  };

  const handleChangeText = (value: string) => {
    const lines = value.split('\n');
    if (lines.length > MAX_TEXT_LINES) {
      setText(lines.slice(0, MAX_TEXT_LINES).join('\n'));
    } else {
      setText(value);
    }
  };

  const innerHeight = LINE_HEIGHT * lineCount;
  const inputBarHeight = innerHeight + V_PADDING * 2;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
    setLineCount(MIN_LINES);
  };

  return (
    <View style={[styles.inputBar, { height: inputBarHeight }]}>
      <TouchableOpacity style={styles.plusBtn} onPress={onPlusPress}>
        <Text style={styles.plusText}>＋</Text>
      </TouchableOpacity>

      <View style={styles.inputWrap}>
        {text.length === 0 && (
          <View pointerEvents="none" style={styles.placeholderWrap}>
            <Text style={styles.placeholderText}>메시지를 입력하세요</Text>
          </View>
        )}

        <TextInput
          multiline
          submitBehavior="newline"
          maxLength={MAX_INPUT_LENGTH}
          style={[
            styles.input,
            { height: innerHeight },
            Platform.OS === "android" ? { includeFontPadding: false as any } : null,
          ]}
          value={text}
          onChangeText={handleChangeText}
          onContentSizeChange={handleContentSizeChange}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
        <Text style={styles.sendText}>전송</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#1a1a1a",
    marginBottom: 10,
    marginTop: 10,
  },

  plusBtn: {
    width: 50,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  inputWrap: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    position: 'relative',
    paddingVertical: V_PADDING,
  },
  placeholderWrap: {
    position: 'absolute',
    left: 12, right: 12,
    top: 0, bottom: 0,
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#8A8A8A',
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
  },

  input: {
    color: '#fff',
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlignVertical: 'top',
  },
  sendBtn: {
    width: 65,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
