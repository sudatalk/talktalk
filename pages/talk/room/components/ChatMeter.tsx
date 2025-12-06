import { View, Text, StyleSheet, Dimensions } from "react-native";

type Props = {
  leftTeam: string;
  rightTeam: string;
  leftCount: number;
  rightCount: number;
};

export default function ChatMeter({ leftTeam, rightTeam, leftCount, rightCount }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const progressBarWidth = screenWidth * 0.5;

  const leftRatio = (leftCount / (leftCount + rightCount)) * 2;
  const rightRatio = (rightCount / (leftCount + rightCount)) * 2;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.sideBox}>
          <Text style={styles.meterLabel}>{leftTeam}</Text>
        </View>

        <View style={[styles.progressBarWrapper, { width: progressBarWidth }]}>
          <View style={{ ...styles.barBg, justifyContent: "flex-end" }}>
            <View style={[styles.barWhite, { flex: leftRatio, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} />
          </View>
          <View style={{ ...styles.barBg, justifyContent: "flex-start" }}>
            <View style={[styles.barGray, { flex: rightRatio, borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} />
          </View>
        </View>

        <View style={styles.sideBox}>
          <Text style={styles.meterLabelRight}>{rightTeam}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.sideBox}>
          <Text style={styles.meterCount}>{leftCount}명</Text>
        </View>
        <View style={{ width: progressBarWidth }} />
        <View style={styles.sideBox}>
          <Text style={styles.meterCountRight}>{rightCount}명</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },

  barBg: {
    flex: 0.5,
    height: "100%",
    borderRadius: 8,

    flexDirection: "row",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  sideBox: {
    width: "25%",
    alignItems: "center",
  },

  meterLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  meterLabelRight: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  progressBarWrapper: {
    flex: 1,
    height: 12,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    backgroundColor: "#1a1a1a",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
  },
  barWhite: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  barGray: {
    height: "100%",
    backgroundColor: "#808080",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 6,
  },
  meterCount: {
    color: "#9A9A9A",
    fontSize: 12,
    textAlign: "center",
  },
  meterCountRight: {
    color: "#9A9A9A",
    fontSize: 12,
    textAlign: "center",
  },
});
