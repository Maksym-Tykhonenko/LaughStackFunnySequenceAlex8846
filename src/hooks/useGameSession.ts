import {useCallback, useMemo, useState} from 'react';
import {FRIEND_PHRASES} from '../content/friendPhrases';
import {
  GameConfig,
  GamePhase,
  PartyMember,
  GameScores,
} from '../types/game';

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function useGameSession(config: GameConfig) {
  const {members, rounds, turnSeconds} = config;

  const phraseDeck = useMemo(
    () => shuffle(FRIEND_PHRASES.map(p => p.text)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const totalTurns = rounds * members.length;

  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('perform');
  const [scores, setScores] = useState<GameScores>(() =>
    Object.fromEntries(members.map(m => [m.id, 0])),
  );
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const round = Math.floor(turnIndex / members.length) + 1;
  const performerIndex = turnIndex % members.length;
  const performer = members[performerIndex];
  const phrase = phraseDeck[turnIndex % phraseDeck.length];
  const voters = members.filter(m => m.id !== performer.id);

  const setRating = useCallback((voterId: string, stars: number) => {
    setRatings(current => ({...current, [voterId]: stars}));
  }, []);

  const goToVote = useCallback(() => {
    const initial: Record<string, number> = {};
    voters.forEach(v => {
      initial[v.id] = 0;
    });
    setRatings(initial);
    setPhase('vote');
  }, [voters]);

  const confirmVote = useCallback(() => {
    const turnScore = voters.reduce(
      (sum, voter) => sum + (ratings[voter.id] ?? 0),
      0,
    );
    setScores(current => ({
      ...current,
      [performer.id]: (current[performer.id] ?? 0) + turnScore,
    }));

    const nextTurn = turnIndex + 1;
    if (nextTurn >= totalTurns) {
      setPhase('results');
      return;
    }

    setTurnIndex(nextTurn);
    setPhase('perform');
  }, [performer.id, ratings, totalTurns, turnIndex, voters]);

  const allRated = voters.every(v => (ratings[v.id] ?? 0) > 0);

  const rankedMembers = useMemo(() => {
    return [...members].sort(
      (a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0),
    );
  }, [members, scores]);

  return {
    round,
    rounds,
    turnSeconds,
    phase,
    performer,
    phrase,
    voters,
    ratings,
    scores,
    allRated,
    rankedMembers,
    setRating,
    goToVote,
    confirmVote,
  };
}
