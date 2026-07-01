export type MemeLayout = 1 | 2 | 4;

export type SavedMeme = {
  layout: MemeLayout;
  photos: (string | null)[];
  captions: string[];
};
