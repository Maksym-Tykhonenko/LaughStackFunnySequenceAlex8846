import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

const BEST_LEVEL_KEY = '@recall/best-level';

export function useRecallBestLevel() {
  const [bestLevel, setBestLevel] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const raw = await AsyncStorage.getItem(BEST_LEVEL_KEY);
      const parsed = raw ? Number.parseInt(raw, 10) : 0;
      if (mounted) {
        setBestLevel(Number.isFinite(parsed) ? parsed : 0);
        setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const updateBest = useCallback(async (level: number) => {
    setBestLevel(current => {
      if (level <= current) {
        return current;
      }
      AsyncStorage.setItem(BEST_LEVEL_KEY, String(level));
      return level;
    });
  }, []);

  return {ready, bestLevel, updateBest};
}
