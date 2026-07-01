import {useCallback, useEffect, useRef, useState} from 'react';

export const GRID_COLS = 3;
export const GRID_ROWS = 4;
export const GRID_SIZE = GRID_COLS * GRID_ROWS;
const PREVIEW_STEP_MS = 650;
const PAUSE_BETWEEN_MS = 280;

export type RecallPhase = 'preview' | 'input';

function randomSequence(length: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < length; i += 1) {
    let next = Math.floor(Math.random() * GRID_SIZE);
    if (i > 0 && next === result[i - 1]) {
      next = (next + 1) % GRID_SIZE;
    }
    result.push(next);
  }
  return result;
}

export function sequenceLengthForLevel(level: number): number {
  return Math.min(2 + level, GRID_SIZE);
}

export function usePatternRecall() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [phase, setPhase] = useState<RecallPhase>('preview');
  const [sequence, setSequence] = useState<number[]>(() =>
    randomSequence(sequenceLengthForLevel(1)),
  );
  const [previewStep, setPreviewStep] = useState(0);
  const [inputStep, setInputStep] = useState(0);
  const [litDot, setLitDot] = useState<number | null>(null);
  const [selectedDot, setSelectedDot] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dotCount = sequence.length;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const endGame = useCallback(
    (finalScore: number) => {
      clearTimers();
      setScore(finalScore);
      setIsGameOver(true);
      setLitDot(null);
      setSelectedDot(null);
    },
    [clearTimers],
  );

  const startPreview = useCallback(
    (nextSequence: number[]) => {
      clearTimers();
      setSequence(nextSequence);
      setPhase('preview');
      setPreviewStep(0);
      setInputStep(0);
      setLitDot(null);
      setSelectedDot(null);

      nextSequence.forEach((dot, index) => {
        const showAt = index * (PREVIEW_STEP_MS + PAUSE_BETWEEN_MS);
        const hideAt = showAt + PREVIEW_STEP_MS;

        timersRef.current.push(
          setTimeout(() => {
            setPreviewStep(index + 1);
            setLitDot(dot);
          }, showAt),
        );

        timersRef.current.push(
          setTimeout(() => {
            setLitDot(current => (current === dot ? null : current));
          }, hideAt),
        );
      });

      const totalPreview =
        nextSequence.length * (PREVIEW_STEP_MS + PAUSE_BETWEEN_MS);

      timersRef.current.push(
        setTimeout(() => {
          setLitDot(null);
          setPreviewStep(0);
          setPhase('input');
        }, totalPreview),
      );
    },
    [clearTimers],
  );

  const startLevel = useCallback(
    (nextLevel: number) => {
      const length = sequenceLengthForLevel(nextLevel);
      startPreview(randomSequence(length));
    },
    [startPreview],
  );

  const resetGame = useCallback(() => {
    clearTimers();
    setLevel(1);
    setLives(3);
    setIsGameOver(false);
    setScore(0);
    startLevel(1);
  }, [clearTimers, startLevel]);

  useEffect(() => {
    startLevel(1);
    return clearTimers;
  }, [clearTimers, startLevel]);

  const handleDotPress = useCallback(
    (dotIndex: number) => {
      if (phase !== 'input' || isGameOver) {
        return;
      }

      setSelectedDot(dotIndex);
      const expected = sequence[inputStep];

      if (dotIndex !== expected) {
        const nextLives = lives - 1;
        setLives(nextLives);
        timersRef.current.push(
          setTimeout(() => setSelectedDot(null), 350),
        );

        if (nextLives <= 0) {
          endGame(Math.max(0, level - 1));
          return;
        }

        timersRef.current.push(
          setTimeout(() => {
            setSelectedDot(null);
            setInputStep(0);
            startPreview(sequence);
          }, 500),
        );
        return;
      }

      const nextStep = inputStep + 1;
      setInputStep(nextStep);

      if (nextStep >= sequence.length) {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        timersRef.current.push(
          setTimeout(() => {
            setSelectedDot(null);
            startLevel(nextLevel);
          }, 400),
        );
        return;
      }

      timersRef.current.push(
        setTimeout(() => setSelectedDot(null), 200),
      );
    },
    [
      endGame,
      inputStep,
      isGameOver,
      level,
      lives,
      phase,
      sequence,
      startPreview,
    ],
  );

  const previewProgress = phase === 'preview' ? previewStep : inputStep;

  return {
    level,
    lives,
    phase,
    dotCount,
    litDot,
    selectedDot,
    isGameOver,
    score,
    previewProgress,
    handleDotPress,
    resetGame,
  };
}
