import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SequenceTab,
  SequenceTabSwitcher,
} from '../components/sequence/SequenceTabSwitcher';
import {StoryListCard} from '../components/sequence/StoryListCard';
import {STORIES} from '../content/stories';
import {useCompletedStoriesContext} from '../context/CompletedStoriesContext';
import {Story} from '../types/story';
import {colors, spacing} from '../theme/colors';

type SequenceScreenProps = {
  onOpenStory: (storyId: string) => void;
};

export function SequenceScreen({
  onOpenStory,
}: SequenceScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<SequenceTab>('cards');
  const {ready, completedIds, isComplete} = useCompletedStoriesContext();

  const stories = useMemo(() => {
    if (tab === 'cards') {
      return STORIES.filter(story => !isComplete(story.id));
    }
    return STORIES.filter(story => isComplete(story.id));
  }, [completedIds, isComplete, tab]);

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Story Order</Text>
        <Text style={styles.subtitle}>
          Put the events in the right sequence and unlock the ending
        </Text>
        <SequenceTabSwitcher active={tab} onChange={setTab} />
      </View>
    ),
    [tab],
  );

  const empty = useMemo(() => {
    if (!ready) {
      return null;
    }
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>{tab === 'cards' ? '🎉' : '📖'}</Text>
        <Text style={styles.emptyText}>
          {tab === 'cards'
            ? 'All stories completed!'
            : 'No completed stories yet'}
        </Text>
      </View>
    );
  }, [ready, tab]);

  if (!ready) {
    return (
      <ImageBackground
        source={require('../assets/homebackground.png')}
        style={styles.root}
        resizeMode="cover">
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accentStart} size="large" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <FlatList
        data={stories}
        keyExtractor={(item: Story) => item.id}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={empty}
        renderItem={({item}) => (
          <StoryListCard story={item} onPress={() => onOpenStory(item.id)} />
        )}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 16,
  },
  header: {
    gap: 8,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
});
