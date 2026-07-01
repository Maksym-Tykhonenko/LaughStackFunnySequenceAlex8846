import React, {useCallback, useMemo, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {EventRow} from '../components/sequence/EventRow';
import {getStoryById} from '../content/stories';
import {Story} from '../types/story';
import {shuffledNotEqual} from '../utils/shuffle';
import {colors, radius, spacing} from '../theme/colors';

const CHECK_GRADIENT = ['#22C55E', '#16A34A'];

type PuzzlePhase = 'play' | 'checked' | 'success';

type StoryPuzzleProps = {
  storyId: string;
  onBack: () => void;
  onComplete: (storyId: string) => void;
};

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

export function StoryPuzzle({
  storyId,
  onBack,
  onComplete,
}: StoryPuzzleProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const story = getStoryById(storyId);

  const [phase, setPhase] = useState<PuzzlePhase>('play');
  const [order, setOrder] = useState<string[]>(() =>
    story ? shuffledNotEqual(story.events, arraysEqual) : [],
  );
  const [results, setResults] = useState<boolean[] | null>(null);

  const resetPuzzle = useCallback((target: Story) => {
    setOrder(shuffledNotEqual(target.events, arraysEqual));
    setPhase('play');
    setResults(null);
  }, []);

  const moveEvent = useCallback((index: number, direction: -1 | 1) => {
    setOrder(current => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }, []);

  const checkOrder = useCallback(() => {
    if (!story) {
      return;
    }
    const checked = order.map((event, index) => event === story.events[index]);
    setResults(checked);
    if (checked.every(Boolean)) {
      setPhase('success');
    } else {
      setPhase('checked');
    }
  }, [order, story]);

  const tryAgain = useCallback(() => {
    if (story) {
      resetPuzzle(story);
    }
  }, [resetPuzzle, story]);

  const finish = useCallback(() => {
    onComplete(storyId);
    onBack();
  }, [onBack, onComplete, storyId]);

  const footerLabel = useMemo(() => {
    if (phase === 'success') {
      return 'Next';
    }
    if (phase === 'checked') {
      return 'Try Again';
    }
    return 'Check My Order';
  }, [phase]);

  const footerAction = useMemo(() => {
    if (phase === 'success') {
      return finish;
    }
    if (phase === 'checked') {
      return tryAgain;
    }
    return checkOrder;
  }, [checkOrder, finish, phase, tryAgain]);

  const footerStyle = useMemo(() => styles.footerBtnBlue, []);

  if (!story) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Story not found</Text>
        <Pressable onPress={onBack}>
          <Text style={styles.missingLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <View style={[styles.topBar, {paddingTop: insets.top + 10}]}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {story.title}
        </Text>
        <View style={styles.titleIcon}>
          <Text style={styles.titleEmoji}>{story.emoji}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {paddingBottom: insets.bottom + spacing.xl},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.setupCard}>
          <Text style={styles.setupLabel}>Setup:</Text>
          <Text style={styles.setupText}>{story.setup}</Text>
        </View>

        {phase !== 'success' ? (
          <View style={styles.hintBar}>
            <Text style={styles.hintText}>
              👆 Use the arrows to reorder events, then submit.
            </Text>
          </View>
        ) : null}

        {order.map((event, index) => (
          <EventRow
            key={`${event}-${index}`}
            index={index}
            text={event}
            canMoveUp={phase === 'play' && index > 0}
            canMoveDown={phase === 'play' && index < order.length - 1}
            checked={phase !== 'play' && results !== null}
            correct={results?.[index]}
            onMoveUp={() => moveEvent(index, -1)}
            onMoveDown={() => moveEvent(index, 1)}
          />
        ))}

        {phase === 'play' ? (
          <Pressable onPress={checkOrder} style={styles.footerBtnWrap}>
            <LinearGradient
              colors={CHECK_GRADIENT}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.footerBtn}>
              <View style={styles.footerBtnInner}>
                <Text style={styles.footerLabel}>Check My Order</Text>
              </View>
            </LinearGradient>
          </Pressable>
        ) : null}

        {phase === 'success' ? (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>
              Perfect order! Here comes the punchline
            </Text>
            <Text style={styles.successBody}>{story.ending}</Text>
          </View>
        ) : null}

        {phase !== 'play' ? (
          <Pressable
            onPress={footerAction}
            style={[styles.footerBtnWrap, styles.footerBtnWrapMuted]}>
            <View style={[styles.footerBtn, footerStyle]}>
              <View style={styles.footerBtnInner}>
                <Text style={styles.footerLabel}>{footerLabel}</Text>
              </View>
            </View>
          </Pressable>
        ) : null}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    gap: 12,
  },
  missingText: {
    color: colors.text,
    fontSize: 16,
  },
  missingLink: {
    color: colors.accentStart,
    fontSize: 14,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(6,13,24,0.95)',
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#0D1C30',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 26,
    marginTop: -2,
  },
  topTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  titleIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleEmoji: {
    fontSize: 18,
  },
  scroll: {
    padding: 16,
    paddingBottom: 24,
  },
  setupCard: {
    borderWidth: 1,
    borderColor: '#FBBF24',
    borderRadius: radius.card,
    backgroundColor: 'rgba(251,191,36,0.08)',
    padding: 16,
    gap: 8,
    marginBottom: 12,
  },
  setupLabel: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '800',
  },
  setupText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 21,
  },
  hintBar: {
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  hintText: {
    color: 'rgba(136,136,187,0.9)',
    fontSize: 13,
    lineHeight: 18,
  },
  successCard: {
    borderWidth: 1,
    borderColor: '#00C44E',
    borderRadius: radius.card,
    backgroundColor: 'rgba(0,196,78,0.1)',
    padding: 18,
    gap: 10,
    marginTop: 4,
  },
  successTitle: {
    color: '#00C44E',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
  },
  successBody: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 21,
  },
  footerBtnWrap: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: 12,
    shadowColor: '#22C55E',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  footerBtn: {
    borderRadius: radius.button,
  },
  footerBtnInner: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBtnWrapMuted: {
    shadowOpacity: 0,
    elevation: 0,
  },
  footerBtnBlue: {
    backgroundColor: '#1F4367',
  },
  footerLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
