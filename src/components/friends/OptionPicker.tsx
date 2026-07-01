import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, radius} from '../../theme/colors';

type Option<T extends string | number> = {
  value: T;
  label: string;
  activeGradient?: string[];
  activeBg?: string;
};

type OptionPickerProps<T extends string | number> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  compact?: boolean;
};

export function OptionPicker<T extends string | number>({
  options,
  value,
  onChange,
  compact = false,
}: OptionPickerProps<T>): React.JSX.Element {
  return (
    <View style={styles.row}>
      {options.map(option => {
        const active = option.value === value;
        const inner = (
          <View style={[styles.btnInner, compact && styles.btnInnerCompact]}>
            <Text style={[styles.label, active && styles.labelActive]}>
              {option.label}
            </Text>
          </View>
        );

        return (
          <Pressable
            key={String(option.value)}
            onPress={() => onChange(option.value)}
            style={styles.btnWrap}>
            {active && option.activeGradient ? (
              <LinearGradient
                colors={option.activeGradient}
                style={[styles.btn, compact && styles.btnCompact]}>
                {inner}
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.btn,
                  compact && styles.btnCompact,
                  active && option.activeBg
                    ? {backgroundColor: option.activeBg}
                    : styles.btnIdle,
                ]}>
                {inner}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  btnWrap: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  btn: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCompact: {
    minHeight: 44,
  },
  btnIdle: {
    backgroundColor: colors.cardBgStart,
  },
  btnInner: {
    paddingVertical: 13,
  },
  btnInnerCompact: {
    paddingVertical: 12,
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  labelActive: {
    color: colors.text,
  },
});
