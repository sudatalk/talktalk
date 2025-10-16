import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Team } from '@/types/chat';

type Props = {
  visible: boolean;
  selectedTeam: Team;
  onSelect: (team: Exclude<Team, null>) => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function Popup({
  visible,
  selectedTeam,
  onSelect,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.centerWrap} pointerEvents="box-none">
        <View style={styles.panel}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>팀 바꾸기</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.teamsRow}>
            <TouchableOpacity
              style={[
                styles.teamBtn,
                selectedTeam === Team.LEFT ? styles.teamBtnSelected : null,
              ]}
              onPress={() => onSelect(Team.LEFT)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.teamBtnText,
                  selectedTeam === Team.LEFT ? styles.teamBtnTextSelected : null,
                ]}
              >
                팀 A
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.teamBtn,
                selectedTeam === Team.RIGHT ? styles.teamBtnSelected : null,
              ]}
              onPress={() => onSelect(Team.RIGHT)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.teamBtnText,
                  selectedTeam === Team.RIGHT ? styles.teamBtnTextSelected : null,
                ]}
              >
                팀 B
              </Text>
            </TouchableOpacity>
          </View>

          {/* Confirm */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
              activeOpacity={0.9}
            >
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  centerWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  panel: {
    width: '92%',
    backgroundColor: '#000',
    borderRadius: 18,
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

  teamsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  teamBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamBtnSelected: {
    backgroundColor: '#808080',
  },
  teamBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
  },
  teamBtnTextSelected: {
    color: '#000000',
  },

  footerRow: {
    marginTop: 14,
    alignItems: 'flex-end',
  },
  confirmBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  confirmText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },
});
