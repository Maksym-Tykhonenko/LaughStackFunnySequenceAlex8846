import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../../theme/colors';

type StatCardProps = {
  value?: string | number;
  label: string;
  valueColor?: string;
  children?: React.ReactNode;
};

export function StatCard({
  value,
  label,
  valueColor = colors.accentStart,
  children,
}: StatCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      {children ?? (
        <Text style={[styles.value, {color: valueColor}]}>{value}</Text>
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 26,
  },
  label: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
