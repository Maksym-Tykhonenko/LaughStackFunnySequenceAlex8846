export type PartyMember = {
  id: string;
  name: string;
  colorIndex: number;
};

export type GameConfig = {
  members: PartyMember[];
  rounds: number;
  turnSeconds: number;
};

export type GamePhase = 'perform' | 'vote' | 'results';

export type GameScores = Record<string, number>;
