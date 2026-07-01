import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

type RecallProgressBarProps = {
  label: string;
  current: number;
  total: number;
};

export function RecallProgressBar({
  label,
  current,
  total,
}: RecallProgressBarProps): React.JSX.Element {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.labels}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.fraction}>
          {current} / {total}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, {width: `${progress * 100}%`}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    paddingHorizontal: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    fontWeight: '600',
  },
  fraction: {
    color: colors.accentStart,
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.accentStart,
  },
});
