import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StoryDifficulty} from '../../types/story';

const STYLES: Record<
  StoryDifficulty,
  {bg: string; text: string}
> = {
  Easy: {bg: 'rgba(0,196,78,0.2)', text: '#00C44E'},
  Medium: {bg: 'rgba(251,191,36,0.2)', text: '#FBBF24'},
  Hard: {bg: 'rgba(255,107,157,0.2)', text: '#FF6B9D'},
};

type DifficultyBadgeProps = {
  difficulty: StoryDifficulty;
};

export function DifficultyBadge({
  difficulty,
}: DifficultyBadgeProps): React.JSX.Element {
  const palette = STYLES[difficulty];
  return (
    <View style={[styles.badge, {backgroundColor: palette.bg}]}>
      <Text style={[styles.label, {color: palette.text}]}>{difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
