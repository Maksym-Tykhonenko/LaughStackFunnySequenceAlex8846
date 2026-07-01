export type StoryDifficulty = 'Easy' | 'Medium' | 'Hard';

export type Story = {
  id: string;
  title: string;
  emoji: string;
  difficulty: StoryDifficulty;
  setup: string;
  events: string[];
  ending: string;
};
