import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {DEFAULT_JOKES} from '../content/jokes';
import {Joke, JokeDraft} from '../types/joke';

const SAVED_KEY = '@jokes/saved';
const CUSTOM_KEY = '@jokes/custom';
const DELETED_KEY = '@jokes/deleted';

async function readIds(key: string): Promise<string[]> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeIds(key: string, ids: string[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(ids));
}

async function readCustom(): Promise<Joke[]> {
  const raw = await AsyncStorage.getItem(CUSTOM_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as Joke[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useJokes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [customJokes, setCustomJokes] = useState<Joke[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [saved, deleted, custom] = await Promise.all([
        readIds(SAVED_KEY),
        readIds(DELETED_KEY),
        readCustom(),
      ]);

      if (mounted) {
        setSavedIds(saved);
        setDeletedIds(deleted);
        setCustomJokes(custom);
        setReady(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const allJokes = useMemo(() => {
    const merged = [...DEFAULT_JOKES, ...customJokes];
    return merged.filter(joke => !deletedIds.includes(joke.id));
  }, [customJokes, deletedIds]);

  const savedJokes = useMemo(
    () => allJokes.filter(joke => savedIds.includes(joke.id)),
    [allJokes, savedIds],
  );

  const toggleSaved = useCallback(async (id: string) => {
    setSavedIds(current => {
      const next = current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id];
      writeIds(SAVED_KEY, next);
      return next;
    });
  }, []);

  const deleteJoke = useCallback(async (id: string) => {
    setDeletedIds(current => {
      const next = [...current, id];
      writeIds(DELETED_KEY, next);
      return next;
    });
    setSavedIds(current => {
      if (!current.includes(id)) {
        return current;
      }
      const next = current.filter(item => item !== id);
      writeIds(SAVED_KEY, next);
      return next;
    });
    setCustomJokes(current => {
      if (!current.some(joke => joke.id === id)) {
        return current;
      }
      const next = current.filter(joke => joke.id !== id);
      AsyncStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addJoke = useCallback(async (draft: JokeDraft) => {
    const joke: Joke = {
      id: `custom-${Date.now()}`,
      tag: draft.tag.trim(),
      character: draft.character.trim(),
      text: draft.text.trim(),
      color: draft.color,
      isCustom: true,
    };

    setCustomJokes(current => {
      const next = [joke, ...current];
      AsyncStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
      return next;
    });

    setSavedIds(current => {
      if (current.includes(joke.id)) {
        return current;
      }
      const next = [...current, joke.id];
      writeIds(SAVED_KEY, next);
      return next;
    });

    return joke;
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  return {
    ready,
    allJokes,
    savedJokes,
    toggleSaved,
    deleteJoke,
    addJoke,
    isSaved,
  };
}
