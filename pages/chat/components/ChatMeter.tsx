import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function ChatMeter() {
  const screenWidth = Dimensions.get('window').width;
  const progressBarWidth = screenWidth * 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.sideBox}>
          <Text style={styles.meterLabel}>찍먹찍먹찍먹찍먹</Text>
        </View>

        <View style={[styles.progressBarWrapper, { width: progressBarWidth }]}>
          <View style={styles.progressBar}>
            <View style={[styles.barWhite, { width: '55%' }]} />
            <View style={[styles.barGray, { width: '45%' }]} />
          </View>
        </View>

        <View style={styles.sideBox}>
          <Text style={styles.meterLabelRight}>부먹</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.sideBox}>
          <Text style={styles.meterCount}>5명</Text>
        </View>
        <View style={{ width: progressBarWidth }} />
        <View style={styles.sideBox}>
          <Text style={styles.meterCountRight}>5명</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  sideBox: {
    width: '25%',
    alignItems: 'center',
  },

  meterLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  meterLabelRight: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },

  progressBarWrapper: {
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
  },
  barWhite: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  barGray: {
    height: '100%',
    backgroundColor: '#808080',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  meterCount: {
    color: '#9A9A9A',
    fontSize: 12,
    textAlign: 'center',
  },
  meterCountRight: {
    color: '#9A9A9A',
    fontSize: 12,
    textAlign: 'center',
  },
});
