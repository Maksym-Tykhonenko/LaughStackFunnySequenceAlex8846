export type CardColorId =
  | 'teal'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'orange';

export type Joke = {
  id: string;
  tag: string;
  character: string;
  text: string;
  color: CardColorId;
  isCustom?: boolean;
};

export type JokeDraft = {
  character: string;
  tag: string;
  text: string;
  color: CardColorId;
};
