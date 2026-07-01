import React, {useCallback, useState} from 'react';
import {useGameSession} from '../hooks/useGameSession';
import {PauseModal} from '../components/friends/PauseModal';
import {GameConfig} from '../types/game';
import {GamePerform} from './game/GamePerform';
import {GameResults} from './game/GameResults';
import {GameVote} from './game/GameVote';
import Orientation from 'react-native-orientation-locker';
import {useFocusEffect} from '@react-navigation/native';

type GameSessionProps = {
  config: GameConfig;
  onExit: () => void;
  onNewGame: () => void;
};

export function GameSession({
  config,
  onExit,
  onNewGame,
}: GameSessionProps): React.JSX.Element {
  const [paused, setPaused] = useState(false);
  const session = useGameSession(config);

  return (
    <>
      {session.phase === 'perform' ? (
        <GamePerform
          round={session.round}
          totalRounds={session.rounds}
          performer={session.performer}
          phrase={session.phrase}
          turnSeconds={session.turnSeconds}
          onPause={() => setPaused(true)}
          onDone={session.goToVote}
        />
      ) : null}

      {session.phase === 'vote' ? (
        <GameVote
          round={session.round}
          totalRounds={session.rounds}
          performer={session.performer}
          phrase={session.phrase}
          voters={session.voters}
          ratings={session.ratings}
          allRated={session.allRated}
          onPause={() => setPaused(true)}
          onRate={session.setRating}
          onConfirm={session.confirmVote}
        />
      ) : null}

      {session.phase === 'results' ? (
        <GameResults
          rankedMembers={session.rankedMembers}
          scores={session.scores}
          onHome={onExit}
          onNewGame={onNewGame}
        />
      ) : null}

      <PauseModal
        visible={paused}
        onResume={() => setPaused(false)}
        onExit={onExit}
      />
    </>
  );
}
