import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MemePreview} from '../components/memes/MemePreview';
import {PhotoSlotCard} from '../components/memes/PhotoSlotCard';
import {MemeLayout, SavedMeme} from '../types/meme';
import {
  colors,
  gradient,
  memePhotoGradients,
  radius,
  spacing,
} from '../theme/colors';

const LAYOUTS: {count: MemeLayout; icon: string; label: string}[] = [
  {count: 1, icon: '⬜', label: '1 Photo'},
  {count: 2, icon: '⬛⬛', label: '2 Photos'},
  {count: 4, icon: '▪▪▪▪', label: '4 Photos'},
];

type LayoutDraft = {
  photos: (string | null)[];
  captions: string[];
};

type SavedByLayout = Partial<Record<MemeLayout, SavedMeme>>;
type DraftsByLayout = Partial<Record<MemeLayout, LayoutDraft>>;

function emptyPhotos(count: number): (string | null)[] {
  return Array.from({length: count}, () => null);
}

function emptyCaptions(count: number): string[] {
  return Array.from({length: count}, () => '');
}

function normalizeDraft(layout: MemeLayout, draft?: LayoutDraft): LayoutDraft {
  const photos = emptyPhotos(layout);
  const captions = emptyCaptions(layout);
  if (!draft) {
    return {photos, captions};
  }
  draft.photos.forEach((uri, i) => {
    if (i < layout) {
      photos[i] = uri;
    }
  });
  draft.captions.forEach((text, i) => {
    if (i < layout) {
      captions[i] = text;
    }
  });
  return {photos, captions};
}

function snapshotMeme(
  layout: MemeLayout,
  photos: (string | null)[],
  captions: string[],
): SavedMeme {
  return {
    layout,
    photos: photos.slice(0, layout),
    captions: captions.slice(0, layout),
  };
}

export function MemesScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [layout, setLayout] = useState<MemeLayout>(1);
  const [savedByLayout, setSavedByLayout] = useState<SavedByLayout>({});
  const [draftsByLayout, setDraftsByLayout] = useState<DraftsByLayout>({
    1: {photos: emptyPhotos(1), captions: emptyCaptions(1)},
  });
  const [composingLayouts, setComposingLayouts] = useState<MemeLayout[]>([1]);
  const [photos, setPhotos] = useState<(string | null)[]>(() => emptyPhotos(1));
  const [captions, setCaptions] = useState<string[]>(() => emptyCaptions(1));

  const isComposing = composingLayouts.includes(layout);
  const isSavedView = savedByLayout[layout] !== undefined && !isComposing;

  const display = isSavedView
    ? savedByLayout[layout]!
    : {layout, photos, captions};

  const changeLayout = useCallback(
    (next: MemeLayout) => {
      if (next === layout) {
        return;
      }

      if (!isSavedView) {
        setDraftsByLayout(prev => ({
          ...prev,
          [layout]: {
            photos: photos.slice(0, layout),
            captions: captions.slice(0, layout),
          },
        }));
      }

      setLayout(next);

      const saved = savedByLayout[next];
      const composing = composingLayouts.includes(next);

      if (saved && !composing) {
        return;
      }

      const draft = normalizeDraft(next, draftsByLayout[next]);
      setPhotos(draft.photos);
      setCaptions(draft.captions);

      if (!composing) {
        setComposingLayouts(prev => [...prev, next]);
      }
    },
    [
      composingLayouts,
      captions,
      draftsByLayout,
      isSavedView,
      layout,
      photos,
      savedByLayout,
    ],
  );

  const pickPhoto = useCallback(
    (index: number) => {
      if (isSavedView) {
        return;
      }
      launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
        const uri = response.assets?.[0]?.uri;
        if (!uri || response.didCancel) {
          return;
        }
        setPhotos(current => {
          const next = [...current];
          next[index] = uri;
          return next;
        });
      });
    },
    [isSavedView],
  );

  const updateCaption = useCallback(
    (index: number, value: string) => {
      if (isSavedView) {
        return;
      }
      setCaptions(current => {
        const next = [...current];
        next[index] = value;
        return next;
      });
    },
    [isSavedView],
  );

  const startNewMeme = useCallback(() => {
    setSavedByLayout(prev => {
      const next = {...prev};
      delete next[layout];
      return next;
    });
    setComposingLayouts(prev =>
      prev.includes(layout) ? prev : [...prev, layout],
    );
    const empty = {
      photos: emptyPhotos(layout),
      captions: emptyCaptions(layout),
    };
    setPhotos(empty.photos);
    setCaptions(empty.captions);
    setDraftsByLayout(prev => ({...prev, [layout]: empty}));
  }, [layout]);

  const shareMeme = useCallback(async () => {
    const source = display;
    const lines = source.captions
      .map((caption, i) => {
        if (!caption.trim()) {
          return null;
        }
        return `Photo ${i + 1}: ${caption.trim()}`;
      })
      .filter(Boolean);

    await Share.share({
      message: lines.length > 0 ? lines.join('\n') : 'Check out my meme',
    });
  }, [display]);

  const saveMeme = useCallback(() => {
    const hasContent =
      photos.some(Boolean) || captions.some(c => c.trim().length > 0);
    if (!hasContent) {
      Alert.alert('Nothing to save', 'Add a photo or caption first.');
      return;
    }
    const snapshot = snapshotMeme(layout, photos, captions);
    setSavedByLayout(prev => ({...prev, [layout]: snapshot}));
    setComposingLayouts(prev => prev.filter(l => l !== layout));
  }, [captions, layout, photos]);

  const showPreview = useMemo(() => {
    if (isSavedView) {
      return true;
    }
    const hasContent =
      photos.some(Boolean) || captions.some(c => c.trim().length > 0);
    return layout > 1 && hasContent;
  }, [captions, isSavedView, layout, photos]);

  const isEmptyUpload =
    !isSavedView && display.layout === 1 && !display.photos[0];

  const layoutHasSaved = useCallback(
    (count: MemeLayout) =>
      savedByLayout[count] !== undefined && !composingLayouts.includes(count),
    [composingLayouts, savedByLayout],
  );

  const renderPhotos = () => {
    const {layout: activeLayout, photos: activePhotos} = display;

    if (isEmptyUpload) {
      return (
        <Pressable onPress={() => pickPhoto(0)} style={styles.uploadArea}>
          <Text style={styles.uploadIcon}>📷</Text>
          <Text style={styles.uploadLabel}>Tap to add</Text>
        </Pressable>
      );
    }

    if (activeLayout === 1) {
      return (
        <PhotoSlotCard
          index={0}
          uri={activePhotos[0]}
          gradient={memePhotoGradients[0]}
          onPress={() => pickPhoto(0)}
          readOnly={isSavedView}
        />
      );
    }

    if (activeLayout === 2) {
      return (
        <View style={styles.photoRow}>
          {[0, 1].map(index => (
            <PhotoSlotCard
              key={index}
              index={index}
              uri={activePhotos[index]}
              gradient={memePhotoGradients[index]}
              onPress={() => pickPhoto(index)}
              readOnly={isSavedView}
            />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.photoGrid}>
        {[0, 1, 2, 3].map(index => (
          <View key={index} style={styles.photoGridItem}>
            <PhotoSlotCard
              index={index}
              uri={activePhotos[index]}
              gradient={memePhotoGradients[index]}
              onPress={() => pickPhoto(index)}
              compact
              readOnly={isSavedView}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Meme Maker 🖼️</Text>
          <Text style={styles.subtitle}>
            {isSavedView
              ? `Saved · ${layout} photo${layout > 1 ? 's' : ''}`
              : 'Build & share your collage'}
          </Text>
        </View>

        <Section label="Layout">
          <View style={styles.layoutRow}>
            {LAYOUTS.map(item => {
              const active = layout === item.count;
              const saved = layoutHasSaved(item.count);
              return (
                <Pressable
                  key={item.count}
                  onPress={() => changeLayout(item.count)}
                  style={styles.layoutBtnWrap}>
                  {active ? (
                    <LinearGradient
                      colors={gradient.accent}
                      style={styles.layoutBtn}>
                      <View style={styles.layoutBtnInner}>
                        <Text style={styles.layoutIconActive}>{item.icon}</Text>
                        <Text style={styles.layoutLabelActive}>
                          {item.label}
                        </Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={[styles.layoutBtn, styles.layoutBtnIdle]}>
                      <Text style={styles.layoutIcon}>{item.icon}</Text>
                      <Text style={styles.layoutLabel}>{item.label}</Text>
                    </View>
                  )}
                  {saved ? <View style={styles.layoutSavedDot} /> : null}
                </Pressable>
              );
            })}
          </View>
        </Section>

        <Section label="Photos">{renderPhotos()}</Section>

        <Section label="Captions">
          {display.captions.slice(0, display.layout).map((caption, index) =>
            isSavedView ? (
              <View
                key={`caption-${index}`}
                style={[styles.captionInput, styles.captionInputFilled]}>
                <Text style={styles.captionSaved}>
                  {caption.trim() || `Photo ${index + 1}`}
                </Text>
              </View>
            ) : (
              <TextInput
                key={`caption-${index}`}
                value={caption}
                onChangeText={value => updateCaption(index, value)}
                placeholder={`Caption for photo ${index + 1}...`}
                placeholderTextColor={colors.placeholder}
                style={[
                  styles.captionInput,
                  caption.trim().length > 0 && styles.captionInputFilled,
                ]}
              />
            ),
          )}
        </Section>

        {showPreview ? (
          <MemePreview
            layout={display.layout}
            photos={display.photos}
            captions={display.captions}
          />
        ) : null}

        <View style={styles.actions}>
          {!isSavedView ? (
            <Pressable onPress={saveMeme} style={styles.actionWrap}>
              <LinearGradient colors={gradient.accent} style={styles.actionBtn}>
                <View style={styles.actionBtnInner}>
                  <Text style={styles.actionLabel}>Save 📸</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ) : null}
          <Pressable
            onPress={shareMeme}
            style={[styles.actionWrap, isSavedView && styles.actionGrow]}>
            <LinearGradient colors={gradient.share} style={styles.actionBtn}>
              <View style={styles.actionBtnInner}>
                <Text style={styles.actionLabel}>Share 🚀</Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={startNewMeme}
            style={[
              styles.actionWrap,
              styles.actionNew,
              isSavedView && styles.actionGrow,
            ]}>
            <View style={styles.actionBtnInner}>
              <Text style={styles.actionLabel}>New 🔄</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  header: {
    gap: 4,
    paddingBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    color: colors.labelMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  layoutRow: {
    flexDirection: 'row',
    gap: 8,
  },
  layoutBtnWrap: {
    flex: 1,
    borderRadius: radius.pill,
    overflow: 'hidden',
    position: 'relative',
  },
  layoutSavedDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentStart,
  },
  layoutBtn: {
    height: 52,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  layoutBtnInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  layoutBtnIdle: {
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  layoutIcon: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  layoutIconActive: {
    fontSize: 14,
    color: colors.text,
  },
  layoutLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
  },
  layoutLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  uploadArea: {
    minHeight: 100,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 24,
  },
  uploadIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  uploadLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '700',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoGridItem: {
    width: '48%',
  },
  captionInput: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 11,
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  captionInputFilled: {
    borderColor: 'rgba(0,212,170,0.33)',
  },
  captionSaved: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionWrap: {
    flex: 1,
    borderRadius: radius.button,
    overflow: 'hidden',
  },
  actionGrow: {
    flex: 1,
  },
  actionBtn: {
    minHeight: 52,
    borderRadius: radius.button,
  },
  actionNew: {
    backgroundColor: '#FF4757',
  },
  actionBtnInner: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  actionLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
