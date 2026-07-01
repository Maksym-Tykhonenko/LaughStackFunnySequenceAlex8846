import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

type EventRowProps = {
  index: number;
  text: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  checked?: boolean;
  correct?: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function EventRow({
  index,
  text,
  canMoveUp,
  canMoveDown,
  checked = false,
  correct,
  onMoveUp,
  onMoveDown,
}: EventRowProps): React.JSX.Element {
  const borderColor = checked
    ? correct
      ? '#00C44E'
      : '#FF4757'
    : 'rgba(77,166,255,0.35)';
  const numberColor = checked
    ? correct
      ? '#00C44E'
      : '#FF4757'
    : '#4DA6FF';

  return (
    <View style={[styles.row, {borderColor}]}>
      <Text style={[styles.index, {color: numberColor}]}>{index + 1}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.arrows}>
        <Pressable
          onPress={onMoveUp}
          disabled={!canMoveUp}
          style={[styles.arrowBtn, !canMoveUp && styles.arrowDisabled]}>
          <Text style={styles.arrow}>▲</Text>
        </Pressable>
        <Pressable
          onPress={onMoveDown}
          disabled={!canMoveDown}
          style={[styles.arrowBtn, !canMoveDown && styles.arrowDisabled]}>
          <Text style={styles.arrow}>▼</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  index: {
    width: 20,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  arrows: {
    gap: 4,
  },
  arrowBtn: {
    width: 28,
    height: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowDisabled: {
    opacity: 0.3,
  },
  arrow: {
    color: colors.text,
    fontSize: 10,
    lineHeight: 12,
  },
});
