import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type LivesDisplayProps = {
  lives: number;
  maxLives?: number;
};

export function LivesDisplay({
  lives,
  maxLives = 3,
}: LivesDisplayProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      {Array.from({length: maxLives}, (_, i) => (
        <Text
          key={i}
          style={[styles.heart, i >= lives && styles.heartEmpty]}>
          ♥
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 2,
    height: 26,
    alignItems: 'center',
  },
  heart: {
    fontSize: 16,
    color: '#FF4757',
  },
  heartEmpty: {
    color: 'rgba(255,71,87,0.25)',
  },
});
