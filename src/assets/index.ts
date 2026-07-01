import type {ImageSourcePropType} from 'react-native';

export const tabIcons: Record<
  'jokes' | 'memes' | 'friends' | 'sequence' | 'game',
  ImageSourcePropType
> = {
  jokes: require('./jokes.png'),
  memes: require('./memes.png'),
  friends: require('./friends.png'),
  sequence: require('./sequence.png'),
  game: require('./game.png'),
};

export const onboardingArt = {
  jokes: require('./onboarding/art-1.png') as ImageSourcePropType,
  memes: require('./onboarding/art-2.png') as ImageSourcePropType,
  play: require('./onboarding/play.png') as ImageSourcePropType,
  random: require('./onboarding/random.png') as ImageSourcePropType,
  win: require('./onboarding/win.png') as ImageSourcePropType,
};
