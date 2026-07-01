export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function shuffledNotEqual<T>(items: T[], equals: (a: T[], b: T[]) => boolean): T[] {
  if (items.length < 2) {
    return [...items];
  }
  let result = shuffle(items);
  let attempts = 0;
  while (equals(result, items) && attempts < 12) {
    result = shuffle(items);
    attempts += 1;
  }
  return result;
}
