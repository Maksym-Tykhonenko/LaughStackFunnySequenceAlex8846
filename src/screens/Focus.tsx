import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecallBestLevel} from '../hooks/useRecallBestLevel';
import {colors, gradient, radius, spacing} from '../theme/colors';

const HOW_TO_PLAY = [
  {
    icon: '👀',
    title: 'Watch the Pattern',
    body: 'Dots light up one by one — memorise the sequence',
  },
  {
    icon: '👆',
    title: 'Tap It Back',
    body: 'Tap each dot in the exact same order shown',
  },
  {
    icon: '📈',
    title: 'Level Up',
    body: 'Each correct round adds one more dot to the sequence',
  },
  {
    icon: '❤️',
    title: 'Three Strikes',
    body: 'Three wrong taps and the challenge ends',
  },
];

type FocusScreenProps = {
  onStart: () => void;
};

export function FocusScreen({onStart}: FocusScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const {ready, bestLevel} = useRecallBestLevel();

  if (!ready) {
    return (
      <ImageBackground
        source={require('../assets/homebackground.png')}
        style={styles.root}
        resizeMode="cover">
        <View style={styles.loading}>
          <ActivityIndicator color={colors.accentStart} size="large" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/homebackground.png')}
      style={styles.root}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.l,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Focus 🎯</Text>
          <Text style={styles.subtitle}>Pattern recall challenge</Text>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🧠</Text>
          <Text style={styles.heroTitle}>Recall Challenge</Text>
          <Text style={styles.heroBody}>
            Watch the dot pattern flash across the grid, then tap them back in
            the exact sequence. Each level adds one more dot. Three mistakes
            and it's over!
          </Text>
          {bestLevel > 0 ? (
            <View style={styles.bestBadge}>
              <Text style={styles.bestText}>
                🏆 Best Sequence: Level {bestLevel}
              </Text>
            </View>
          ) : null}
          <Pressable onPress={onStart} style={styles.startWrap}>
            <LinearGradient colors={gradient.accent} style={styles.startBtn}>
              <View style={styles.startInner}>
                <Text style={styles.startLabel}>Start Recall Challenge 🎯</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>How to Play</Text>
        {HOW_TO_PLAY.map(item => (
          <View key={item.title} style={styles.howRow}>
            <View style={styles.howIcon}>
              <Text style={styles.howIconText}>{item.icon}</Text>
            </View>
            <View style={styles.howCopy}>
              <Text style={styles.howTitle}>{item.title}</Text>
              <Text style={styles.howBody}>{item.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    gap: 4,
    marginBottom: 16,
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
  hero: {
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.card,
    padding: 20,
    gap: 10,
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 40,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  heroBody: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    lineHeight: 21,
  },
  bestBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,212,170,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,212,170,0.3)',
  },
  bestText: {
    color: colors.accentStart,
    fontSize: 12,
    fontWeight: '700',
  },
  startWrap: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: 4,
  },
  startBtn: {
    borderRadius: radius.button,
  },
  startInner: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  startLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  sectionLabel: {
    color: colors.labelMuted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  howRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  howIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.cardBgStart,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howIconText: {
    fontSize: 18,
  },
  howCopy: {
    flex: 1,
    gap: 2,
  },
  howTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  howBody: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
});
