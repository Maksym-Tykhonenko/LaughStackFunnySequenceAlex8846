import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

const COMPLETED_KEY = '@sequence/completed';

async function readCompleted(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(COMPLETED_KEY);
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

export function useCompletedStories() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ids = await readCompleted();
      if (mounted) {
        setCompletedIds(ids);
        setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const markComplete = useCallback(async (storyId: string) => {
    setCompletedIds(current => {
      if (current.includes(storyId)) {
        return current;
      }
      const next = [...current, storyId];
      AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (storyId: string) => completedIds.includes(storyId),
    [completedIds],
  );

  return {ready, completedIds, markComplete, isComplete};
}
