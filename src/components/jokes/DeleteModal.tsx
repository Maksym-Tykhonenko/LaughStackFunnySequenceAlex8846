import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

type DeleteModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteModal({
  visible,
  onCancel,
  onConfirm,
}: DeleteModalProps): React.JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.dialog} onPress={() => undefined}>
          <Text style={styles.title}>Delete this joke?</Text>
          <Text style={styles.message}>
            This punchline will leave your stack forever
          </Text>
          <View style={styles.actions}>
            <Pressable onPress={onCancel} style={styles.cancelBtn}>
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={styles.deleteBtn}>
              <Text style={styles.deleteLabel}>Delete</Text>
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
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.ghost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  deleteBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: 'rgba(255,107,157,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,107,157,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteLabel: {
    color: colors.deleteRed,
    fontSize: 16,
    fontWeight: '500',
  },
});
