import React, {useEffect} from 'react';
import {usePatternRecall} from '../hooks/usePatternRecall';
import {useRecallBestLevel} from '../hooks/useRecallBestLevel';
import {PatternRound} from './PatternRound';
import {RecallGameOver} from './RecallGameOver';

type RecallSessionProps = {
  onExit: () => void;
};

export function RecallSession({onExit}: RecallSessionProps): React.JSX.Element {
  const recall = usePatternRecall();
  const {bestLevel, updateBest} = useRecallBestLevel();

  useEffect(() => {
    if (recall.isGameOver) {
      updateBest(recall.score);
    }
  }, [recall.isGameOver, recall.score, updateBest]);

  if (recall.isGameOver) {
    return (
      <RecallGameOver
        score={recall.score}
        bestLevel={Math.max(bestLevel, recall.score)}
        onTryAgain={recall.resetGame}
        onMenu={onExit}
      />
    );
  }

  return <PatternRound recall={recall} onBack={onExit} />;
}
