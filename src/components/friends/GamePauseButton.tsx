import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../../theme/colors';

type GamePauseButtonProps = {
  onPress: () => void;
};

export function GamePauseButton({
  onPress,
}: GamePauseButtonProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.btn} hitSlop={8}>
      <Text style={styles.icon}>⏸</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: '#0D1C30',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: colors.text,
    fontSize: 14,
    marginTop: -1,
  },
});
