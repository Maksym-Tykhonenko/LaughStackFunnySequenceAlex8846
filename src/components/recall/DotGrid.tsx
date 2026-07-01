import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {GRID_COLS, GRID_ROWS, GRID_SIZE} from '../../hooks/usePatternRecall';
import {colors} from '../../theme/colors';

const DOT_SIZE = 52;
const GAP = 14;
const GRID_WIDTH = DOT_SIZE * GRID_COLS + GAP * (GRID_COLS - 1);

type DotGridProps = {
  litDot: number | null;
  selectedDot: number | null;
  interactive: boolean;
  onPressDot: (index: number) => void;
};

function DotCell({
  index,
  litDot,
  selectedDot,
  interactive,
  onPressDot,
}: {
  index: number;
  litDot: number | null;
  selectedDot: number | null;
  interactive: boolean;
  onPressDot: (index: number) => void;
}): React.JSX.Element {
  const isLit = litDot === index;
  const isSelected = selectedDot === index;
  const active = isLit || isSelected;

  return (
    <Pressable
      disabled={!interactive}
      onPress={() => onPressDot(index)}
      style={[
        styles.dot,
        active && styles.dotActive,
        isSelected && !isLit && styles.dotSelected,
      ]}
    />
  );
}

export function DotGrid({
  litDot,
  selectedDot,
  interactive,
  onPressDot,
}: DotGridProps): React.JSX.Element {
  return (
    <View style={styles.grid}>
      {Array.from({length: GRID_ROWS}, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({length: GRID_COLS}, (_, col) => {
            const index = row * GRID_COLS + col;
            if (index >= GRID_SIZE) {
              return null;
            }
            return (
              <DotCell
                key={index}
                index={index}
                litDot={litDot}
                selectedDot={selectedDot}
                interactive={interactive}
                onPressDot={onPressDot}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: GRID_WIDTH,
    alignSelf: 'center',
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(13,28,48,0.9)',
    borderWidth: 2,
    borderColor: 'rgba(77,166,255,0.35)',
    overflow: 'hidden',
  },
  dotActive: {
    backgroundColor: colors.accentStart,
    borderColor: colors.accentStart,
    shadowColor: colors.accentStart,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 4,
  },
  dotSelected: {
    borderColor: '#FBBF24',
    shadowColor: '#FBBF24',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
