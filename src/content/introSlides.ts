import type {ImageSourcePropType} from 'react-native';
import {onboardingArt} from '../assets';

export type IntroSlide = {
  title: string;
  body: string;
  art: ImageSourcePropType;
};

export const introSlides: IntroSlide[] = [
  {
    title: 'Stack Up the Laughs',
    body:
      'Discover jokes from funny characters, save your favorite punchlines, and share quick laughs with friends anytime',
    art: onboardingArt.jokes,
  },
  {
    title: 'Turn Photos into Memes',
    body:
      'Upload one photo or build a small collage, add captions, save your creation, and send it to your friends',
    art: onboardingArt.memes,
  },
  {
    title: 'Play the Phrase Challenge',
    body:
      'Get a funny phrase, create a joke before time runs out, and let your friends rate your comedy skills',
    art: onboardingArt.play,
  },
  {
    title: 'Unlock Funny Story Endings',
    body:
      'Put mixed-up events in the correct order and reveal unexpected endings after every completed story',
    art: onboardingArt.random,
  },
  {
    title: 'Follow the Pattern',
    body:
      'Watch the dots, repeat the sequence, keep your focus sharp, and try to beat your best score',
    art: onboardingArt.win,
  },
];
