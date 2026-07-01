import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

type PauseModalProps = {
  visible: boolean;
  onResume: () => void;
  onExit: () => void;
};

export function PauseModal({
  visible,
  onResume,
  onExit,
}: PauseModalProps): React.JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}>
      <Pressable style={styles.overlay} onPress={onResume}>
        <Pressable style={styles.dialog} onPress={() => undefined}>
          <Text style={styles.title}>Challenge Paused</Text>
          <Text style={styles.message}>
            Take a breath. The punchline can wait
          </Text>
          <View style={styles.actions}>
            <Pressable onPress={onExit} style={styles.exitBtn}>
              <Text style={styles.exitLabel}>Exit</Text>
            </Pressable>
            <Pressable onPress={onResume} style={styles.resumeBtn}>
              <Text style={styles.resumeLabel}>Resume</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  dialog: {
    width: '100%',
    maxWidth: 361,
    backgroundColor: colors.modalBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingTop: 19,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  exitBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: 'rgba(255,107,157,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,107,157,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitLabel: {
    color: colors.deleteRed,
    fontSize: 16,
    fontWeight: '600',
  },
  resumeBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.saveGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
