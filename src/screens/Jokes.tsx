import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DeleteModal} from '../components/jokes/DeleteModal';
import {JokeCard} from '../components/jokes/JokeCard';
import {JokeTab, TabSwitcher} from '../components/jokes/TabSwitcher';
import {useJokesContext} from '../context/JokesContext';
import {Joke} from '../types/joke';
import {colors, spacing} from '../theme/colors';

type JokesScreenProps = {
  onAddJoke: () => void;
};

export function JokesScreen({onAddJoke}: JokesScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<JokeTab>('all');
  const [pendingDelete, setPendingDelete] = useState<Joke | null>(null);
  const {ready, allJokes, savedJokes, toggleSaved, deleteJoke, isSaved} =
    useJokesContext();

  const jokes = tab === 'all' ? allJokes : savedJokes;

  const shareJoke = useCallback(async (joke: Joke) => {
    await Share.share({
      message: `${joke.character} (${joke.tag}): "${joke.text}"`,
    });
  }, []);

  const confirmDelete = useCallback(() => {
    if (pendingDelete) {
      deleteJoke(pendingDelete.id);
      setPendingDelete(null);
    }
  }, [deleteJoke, pendingDelete]);

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Joke Stack</Text>
        <Text style={styles.subtitle}>
          Pick a character, catch a punchline, save the best ones
        </Text>
        <TabSwitcher active={tab} onChange={setTab} />
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
        <Text style={styles.emptyIcon}>🔖</Text>
        <Text style={styles.emptyText}>No saved laughs yet</Text>
      </View>
    );
  }, [ready]);

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
        data={jokes}
        keyExtractor={item => item.id}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={tab === 'saved' ? empty : null}
        contentContainerStyle={[
          styles.list,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <JokeCard
            joke={item}
            saved={isSaved(item.id)}
            onToggleSave={() => toggleSaved(item.id)}
            onShare={() => shareJoke(item)}
            onDelete={() => setPendingDelete(item)}
          />
        )}
      />

      <Pressable
        onPress={onAddJoke}
        style={[styles.fab, {bottom: insets.bottom + 2}]}
        accessibilityLabel="Add joke">
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <DeleteModal
        visible={pendingDelete !== null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
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
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  header: {
    gap: 16,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19.5,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 64,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    lineHeight: 72,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22.5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.fabBg,
    borderWidth: 1,
    borderColor: colors.tabBarBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
});
