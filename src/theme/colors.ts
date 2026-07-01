import {CardColorId} from '../types/joke';

export const colors = {
  bg: '#030807',
  text: '#F8F8FF',
  muted: '#8888BB',
  accentStart: '#00D4AA',
  accentEnd: '#38BDF8',
  outline: 'rgba(255,255,255,0.1)',
  ghost: 'rgba(255,255,255,0.08)',
  dot: 'rgba(255,255,255,0.2)',
  tabBg: '#061C33',
  tabActive: '#00849F',
  tabBarBg: '#091C2D',
  tabBarBorder: '#1F4367',
  tabInactive: '#1F4367',
  tabJokesActive: '#D4A017',
  cardBgStart: '#0D1C30',
  cardBgEnd: '#102236',
  inputBg: '#102236',
  inputBorder: 'rgba(255,255,255,0.07)',
  labelMuted: 'rgba(255,255,255,0.6)',
  placeholder: '#757575',
  saveGreen: '#00C44E',
  deleteRed: '#FF6B9D',
  modalBg: '#0A1427',
  overlay: 'rgba(0,0,0,0.7)',
  fabBg: '#1F4367',
};

export const cardColors: Record<
  CardColorId,
  {main: string; bg: string; border: string}
> = {
  teal: {
    main: '#00D4AA',
    bg: 'rgba(0,212,170,0.13)',
    border: 'rgba(0,212,170,0.33)',
  },
  purple: {
    main: '#A855F7',
    bg: 'rgba(168,85,247,0.13)',
    border: 'rgba(168,85,247,0.33)',
  },
  red: {
    main: '#FF4757',
    bg: 'rgba(255,71,87,0.13)',
    border: 'rgba(255,71,87,0.33)',
  },
  yellow: {
    main: '#FBBF24',
    bg: 'rgba(251,191,36,0.13)',
    border: 'rgba(251,191,36,0.33)',
  },
  blue: {
    main: '#4DA6FF',
    bg: 'rgba(77,166,255,0.13)',
    border: 'rgba(77,166,255,0.33)',
  },
  orange: {
    main: '#FB923C',
    bg: 'rgba(251,146,60,0.13)',
    border: 'rgba(251,146,60,0.33)',
  },
};

export const gradient = {
  accent: [colors.accentStart, colors.accentEnd],
  share: ['#1A8FD1', '#4DA6FF'],
  glow: ['#0D3D6B', colors.bg, colors.bg],
};

export const memePhotoGradients: string[][] = [
  ['#1A8FD1', '#00D4AA'],
  ['#A855F7', '#F472B6'],
  ['#FBBF24', '#FF4757'],
  ['#4DA6FF', '#38BDF8'],
];

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  art: 14,
  button: 16,
  card: 20,
  pill: 14,
  fab: 16,
};

export const fontSize = {
  title: 28,
  body: 15,
  button: 16,
};
