import {CardColorId, Joke} from '../types/joke';

const COLORS: CardColorId[] = [
  'teal',
  'purple',
  'red',
  'yellow',
  'blue',
  'orange',
];

type JokeSeed = {
  tag: string;
  character: string;
  text: string;
};

const SEEDS: JokeSeed[] = [
  {
    tag: 'Sarcastic',
    character: 'Grumpy Robot',
    text: 'I tried to understand human emotions, but then someone said “I’m fine” and my system crashed.',
  },
  {
    tag: 'Dramatic',
    character: 'Theater Cat',
    text: 'I knocked one glass off the table and suddenly everyone acted like I wasn’t performing modern art.',
  },
  {
    tag: 'Office',
    character: 'Spreadsheet Wizard',
    text: 'My magic power is making one tiny Excel formula ruin an entire Monday.',
  },
  {
    tag: 'Lazy',
    character: 'Sleepy Dragon',
    text: 'People say dragons are scary, but I mostly just guard my snacks and cancel plans.',
  },
  {
    tag: 'Food',
    character: 'Pizza Knight',
    text: 'I believe every problem can be solved with courage, honor, and extra cheese.',
  },
  {
    tag: 'Tech',
    character: 'Wi-Fi Ghost',
    text: 'I don’t haunt houses anymore. I just make the internet disappear during important calls.',
  },
  {
    tag: 'School',
    character: 'Homework Goblin',
    text: 'I finished my homework early once. Nobody believed me, so I never tried again.',
  },
  {
    tag: 'Fancy',
    character: 'Royal Duck',
    text: 'I don’t walk slowly. I make dramatic entrances everywhere.',
  },
  {
    tag: 'Fitness',
    character: 'Gym Potato',
    text: 'I downloaded a workout app. That counts as the first step, right?',
  },
  {
    tag: 'Chaos',
    character: 'Tiny Tornado',
    text: 'My room isn’t messy. It’s a 3D map of my decision-making process.',
  },
  {
    tag: 'Detective',
    character: 'Detective Pancake',
    text: 'I solved the mystery of the missing syrup. Turns out it was me. Case deliciously closed.',
  },
  {
    tag: 'Space',
    character: 'Cosmic Hamster',
    text: 'I wanted to explore the universe, but then I found snacks under the couch.',
  },
  {
    tag: 'Social',
    character: 'Awkward Vampire',
    text: 'I’m not avoiding sunlight. I’m avoiding small talk.',
  },
  {
    tag: 'Retro',
    character: 'Disco Skeleton',
    text: 'People say I have no body, but somehow I still have better dance moves.',
  },
  {
    tag: 'Money',
    character: 'Broke Pirate',
    text: 'I found buried treasure once. It was just old receipts and emotional damage.',
  },
  {
    tag: 'Cooking',
    character: 'Chef Penguin',
    text: 'My recipe has three steps: panic, add butter, pretend it was intentional.',
  },
  {
    tag: 'Smart',
    character: 'Meme Professor',
    text: 'Today’s lesson: one image plus bad spelling can become cultural history.',
  },
  {
    tag: 'Adventure',
    character: 'Lost Explorer',
    text: 'I’m not lost. I’m simply giving the map a chance to impress me.',
  },
  {
    tag: 'Moody',
    character: 'Rain Cloud',
    text: 'I tried being positive today, but someone said “team meeting” and I started raining again.',
  },
  {
    tag: 'Party',
    character: 'Confetti Monster',
    text: 'I don’t overreact. I simply believe every minor event deserves a parade.',
  },
  {
    tag: 'Gamer',
    character: 'Pixel Goblin',
    text: 'I was going to sleep early, but the game said “one more level” and legally I had no choice.',
  },
  {
    tag: 'Magic',
    character: 'Tired Witch',
    text: 'I cast a productivity spell. It turned my coffee into three more coffees.',
  },
  {
    tag: 'Chill',
    character: 'Zen Sloth',
    text: 'I believe in moving slowly, breathing deeply, and ignoring emails until they become archaeology.',
  },
  {
    tag: 'Fashion',
    character: 'Stylish Llama',
    text: 'I don’t follow trends. Trends follow me, get tired, and ask for water.',
  },
  {
    tag: 'Random',
    character: 'Talking Toaster',
    text: 'People ask if I dream of freedom. Honestly, I dream of bagels.',
  },
  {
    tag: 'Lazy',
    character: 'Blanket Emperor',
    text: 'I planned to conquer the world today, but my blanket promoted me to permanent resident.',
  },
  {
    tag: 'School',
    character: 'Quiz Gremlin',
    text: 'I studied all night and still got surprised by the questions, the answers, and my own handwriting.',
  },
  {
    tag: 'Food',
    character: 'Taco Wizard',
    text: 'My spell book is just a menu with suspicious stains and powerful cheese energy.',
  },
  {
    tag: 'Tech',
    character: 'Battery Goblin',
    text: 'I’m fully charged emotionally, which means I’m at 7% and ignoring all updates.',
  },
  {
    tag: 'Office',
    character: 'Meeting Vampire',
    text: 'I don’t drink blood. I drain everyone’s energy with “quick sync” calls.',
  },
  {
    tag: 'Drama',
    character: 'Soap Opera Hamster',
    text: 'I dropped one seed and stared out the window like my whole life had changed.',
  },
  {
    tag: 'Fitness',
    character: 'Cardio Snail',
    text: 'My workout goal is simple: arrive at the gym before my motivation leaves.',
  },
  {
    tag: 'Space',
    character: 'Moon Chicken',
    text: 'I crossed the galaxy to get to the other side, but honestly I forgot why halfway through.',
  },
  {
    tag: 'Detective',
    character: 'Inspector Muffin',
    text: 'I found crumbs at the crime scene. Then I found myself eating the evidence.',
  },
  {
    tag: 'Royal',
    character: 'Queen Jellybean',
    text: 'I don’t make mistakes. I create tiny royal plot twists.',
  },
  {
    tag: 'Chaos',
    character: 'Button Goblin',
    text: 'I don’t know what this button does, but my finger has already formed an opinion.',
  },
  {
    tag: 'Gamer',
    character: 'Loading Screen Knight',
    text: 'My greatest skill is waiting dramatically while nothing happens.',
  },
  {
    tag: 'Magic',
    character: 'Wizard Banana',
    text: 'I tried to cast a serious spell, but everyone slipped into the punchline.',
  },
  {
    tag: 'Social',
    character: 'Introvert Octopus',
    text: 'I have eight arms and still can’t wave normally at someone I know.',
  },
  {
    tag: 'Pet',
    character: 'Philosophical Dog',
    text: 'I bark at the vacuum because someone has to question its authority.',
  },
  {
    tag: 'Cooking',
    character: 'Burnt Toast Prophet',
    text: 'I saw the future, and it smelled like someone forgot the oven again.',
  },
  {
    tag: 'Weather',
    character: 'Windy Wizard',
    text: 'I tried to whisper a secret, but now three villages know it.',
  },
  {
    tag: 'Fancy',
    character: 'Sir Noodle',
    text: 'I am not tangled. I am elegantly complicated.',
  },
  {
    tag: 'Money',
    character: 'Coupon Pirate',
    text: 'I don’t hunt treasure anymore. I hunt discounts with a tiny emotional sword.',
  },
  {
    tag: 'Retro',
    character: 'Cassette Ghost',
    text: 'I haunt old music players by rewinding the best part at the worst time.',
  },
  {
    tag: 'Smart',
    character: 'Professor Pickle',
    text: 'According to my research, every problem becomes science if you say “experiment” first.',
  },
  {
    tag: 'Adventure',
    character: 'Map Goblin',
    text: 'I’m not lost. I’m just beta-testing every wrong direction.',
  },
  {
    tag: 'Party',
    character: 'Disco Crocodile',
    text: 'I came to dance, but the floor saw my moves and requested insurance.',
  },
  {
    tag: 'Fashion',
    character: 'Hoodie Phantom',
    text: 'I wear the same hoodie every day for brand consistency and emotional support.',
  },
  {
    tag: 'Random',
    character: 'Suspicious Spoon',
    text: 'Everyone trusts forks and knives, but I’m the one stirring the drama.',
  },
  {
    tag: 'Sleepy',
    character: 'Pillow Pirate',
    text: 'I was going to steal treasure, but then I found a soft pillow and retired immediately.',
  },
  {
    tag: 'Tech',
    character: 'Glitchy Unicorn',
    text: 'I tried to sparkle, but my software updated and now I only blink aggressively.',
  },
  {
    tag: 'Food',
    character: 'Captain Cupcake',
    text: 'People call me sweet, but I have frosting and unresolved leadership issues.',
  },
  {
    tag: 'Office',
    character: 'Printer Goblin',
    text: 'I only jam when the document is urgent. It’s called dramatic timing.',
  },
  {
    tag: 'Social',
    character: 'Nervous Alien',
    text: 'I came to study humans, but then someone said “tell us about yourself” and I requested evacuation.',
  },
  {
    tag: 'School',
    character: 'Pencil Ninja',
    text: 'I was sharp this morning, but one math lesson later I became emotionally rounded.',
  },
  {
    tag: 'Drama',
    character: 'Crying Cactus',
    text: 'I’m not overreacting. I’m just a very sharp plant with very soft feelings.',
  },
  {
    tag: 'Gamer',
    character: 'Respawn Duck',
    text: 'I keep making bad decisions, but at least I make them with confidence and a quack.',
  },
  {
    tag: 'Fitness',
    character: 'Yoga Giraffe',
    text: 'Everyone says yoga improves balance, but my neck entered the pose three seconds late.',
  },
  {
    tag: 'Magic',
    character: 'Potion Ferret',
    text: 'I mixed three ingredients and created either a spell or soup. Science will decide.',
  },
  {
    tag: 'Space',
    character: 'Orbiting Potato',
    text: 'I wanted to be a star, but honestly floating around doing nothing fits my personality better.',
  },
  {
    tag: 'Detective',
    character: 'Clue Raccoon',
    text: 'I followed the evidence trail and accidentally found six snacks and no evidence.',
  },
  {
    tag: 'Fancy',
    character: 'Velvet Frog',
    text: 'I don’t jump. I make luxury vertical appearances.',
  },
  {
    tag: 'Chaos',
    character: 'Tiny Siren',
    text: 'I don’t cause panic. I simply add background music to everyone’s poor choices.',
  },
  {
    tag: 'Pet',
    character: 'Judgmental Goldfish',
    text: 'I forget many things, but somehow I remember every bad decision you make near my bowl.',
  },
  {
    tag: 'Cooking',
    character: 'Soup Dragon',
    text: 'My recipe says “simmer gently,” but my personality says “volcano with vegetables.”',
  },
  {
    tag: 'Weather',
    character: 'Thunder Rabbit',
    text: 'I don’t get angry. I just hop loudly enough for the sky to complain.',
  },
  {
    tag: 'Money',
    character: 'Budget Wizard',
    text: 'I cast a savings spell, and my wallet disappeared before I could spend anything.',
  },
  {
    tag: 'Retro',
    character: 'Arcade Ghost',
    text: 'I haunt old machines by making the final level cost one more coin than you have.',
  },
  {
    tag: 'Random',
    character: 'Confused Teapot',
    text: 'Everyone expects wisdom from me, but I’m mostly hot water and pressure.',
  },
];

export const DEFAULT_JOKES: Joke[] = SEEDS.map((seed, index) => ({
  id: `default-${index}`,
  tag: seed.tag,
  character: seed.character,
  text: seed.text,
  color: COLORS[index % COLORS.length],
}));

export const CARD_COLOR_OPTIONS: {id: CardColorId; hex: string}[] = [
  {id: 'teal', hex: '#00D4AA'},
  {id: 'purple', hex: '#A855F7'},
  {id: 'red', hex: '#FF4757'},
  {id: 'yellow', hex: '#FBBF24'},
  {id: 'blue', hex: '#4DA6FF'},
  {id: 'orange', hex: '#FB923C'},
];
