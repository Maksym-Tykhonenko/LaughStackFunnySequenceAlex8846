import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, gradient, spacing} from '../theme/colors';

type StepDotsProps = {
  total: number;
  active: number;
};

export function StepDots({total, active}: StepDotsProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      {Array.from({length: total}, (_, index) => {
        const isActive = index === active;

        if (isActive) {
          return (
            <LinearGradient
              key={index}
              colors={gradient.accent}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.active}
            />
          );
        }

        return <View key={index} style={styles.dot} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s,
    minHeight: spacing.s,
    marginTop: 10,
  },
  dot: {
    width: spacing.s,
    height: spacing.s,
    borderRadius: spacing.s,
    backgroundColor: colors.dot,
  },
  active: {
    width: 24,
    height: spacing.s,
    borderRadius: spacing.s,
  },
});
