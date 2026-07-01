import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Story} from '../../types/story';
import {colors, radius} from '../../theme/colors';
import {DifficultyBadge} from './DifficultyBadge';

type StoryListCardProps = {
  story: Story;
  onPress: () => void;
};

export function StoryListCard({
  story,
  onPress,
}: StoryListCardProps): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{story.emoji}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={2}>
          {story.title}
        </Text>
        <View style={styles.meta}>
          <DifficultyBadge difficulty={story.difficulty} />
          <Text style={styles.events}>
            📄 {story.events.length} events to order
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.card,
    padding: 14,
    marginBottom: 10,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(77,166,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  copy: {
    flex: 1,
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  meta: {
    gap: 6,
  },
  events: {
    color: '#4DA6FF',
    fontSize: 12,
    fontWeight: '600',
  },
});
