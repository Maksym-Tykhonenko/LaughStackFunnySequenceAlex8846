import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../theme/colors';

type StarRatingProps = {
  value: number;
  onChange: (stars: number) => void;
};

export function StarRating({
  value,
  onChange,
}: StarRatingProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(star => {
        const active = star <= value;
        return (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            style={[styles.starBtn, active && styles.starBtnActive]}>
            <Text style={[styles.star, active && styles.starActive]}>★</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  starBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starBtnActive: {
    backgroundColor: 'rgba(251,191,36,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.4)',
  },
  star: {
    fontSize: 18,
    color: 'rgba(251,191,36,0.45)',
  },
  starActive: {
    color: '#FBBF24',
  },
});
